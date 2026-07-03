import QtQuick
import Quickshell
import Quickshell.Io
import qs.Commons
import qs.Services.UI

// Background service: holds all wallpaper state and download logic.
Item {
    id: root

    property var pluginApi  // injected by PluginService

    // Config reads — functions so Main.qml always has fresh values at action time
    function tags()          { return pluginApi?.pluginSettings?.tags          ?? "" }
    function sfw()           { return pluginApi?.pluginSettings?.sfw           ?? true }
    function sketchy()       { return pluginApi?.pluginSettings?.sketchy       ?? false }
    function nsfw()          { return pluginApi?.pluginSettings?.nsfw          ?? false }
    function general()       { return pluginApi?.pluginSettings?.general       ?? true }
    function anime()         { return pluginApi?.pluginSettings?.anime         ?? true }
    function people()        { return pluginApi?.pluginSettings?.people        ?? true }
    function apikey()        { return pluginApi?.pluginSettings?.apikey        ?? "" }
    function localOnly()     { return pluginApi?.pluginSettings?.localOnly     ?? false }
    function displayTimeMs() { return pluginApi?.pluginSettings?.displayTimeMs ?? 300000 }
    function coverMode()     { return pluginApi?.pluginSettings?.coverMode     ?? false }
    function blacklist()     { return pluginApi?.pluginSettings?.blacklist      ?? [] }

    function setConfig(key, value) {
        if (!pluginApi) return
        var s = Object.assign({}, pluginApi.pluginSettings)
        s[key] = value
        pluginApi.pluginSettings = s
        pluginApi.saveSettings()
    }

    // --- Runtime state (read by Panel.qml via pluginApi.mainInstance) ---
    property var    currentWallpaper: null   // { path, purity, id: string|null }
    property var    nextWallpaperCached: null
    property bool   isDownloading: false
    property real   timerProgress: 0
    property bool   timerPaused: false
    property var    currentImageTags: []
    property string fetchStatus: "idle"      // idle | ok | no-results | offline | api-error
    property bool   isSaved: false
    property int    currentIndex: 0
    property int    currentTotal: 0
    property string lastDebugUrl: ""
    property string lastDebugResponse: ""

    // --- Pagination / viewed tracking ---
    property var    _apiQueue: []
    property int    _apiPage: 1
    property string _apiSeed: ""
    property int    _apiConsumedCount: 0
    property var    _viewedIds: []
    property int    _localTotal: 0
    property bool   _busy: false
    property real   _timerStartMs: 0
    property real   _pausedElapsedMs: 0
    property bool   _panicActive: false
    property var    _prepanicWallpaper: null
    property var    _savedTransitionType: null

    Timer {
        id: restoreTransitionTimer
        interval: 600
        repeat: false
        onTriggered: {
            if (root._savedTransitionType !== null) {
                Settings.data.wallpaper.transitionType = root._savedTransitionType
                root._savedTransitionType = null
            }
        }
    }

    readonly property string tmpDir:       "/tmp/noctalia-wallpapers"
    readonly property string wallpaperBase: Settings.preprocessPath("~/Wallpapers")

    // --- Init ---
    Component.onCompleted: {
        _run(["mkdir", "-p", tmpDir], null)
        _run(["mkdir", "-p", wallpaperBase + "/sfw"],     null)
        _run(["mkdir", "-p", wallpaperBase + "/sketchy"], null)
        _run(["mkdir", "-p", wallpaperBase + "/nsfw"],    null)
        Qt.callLater(_random)
    }

    // --- Process helper ---
    function _run(cmd, cb) {
        var src = "import QtQuick\nimport Quickshell.Io\nProcess {\n    command: "
                + JSON.stringify(cmd)
                + "\n    running: true\n    stdout: StdioCollector {}\n    stderr: StdioCollector {}\n}"
        var p = Qt.createQmlObject(src, root, "proc")
        if (!p) { if (cb) cb(-1, "", ""); return }
        p.exited.connect(function(code) {
            if (cb) cb(code, p.stdout.text, p.stderr.text)
            p.destroy()
        })
    }

    // --- Timer ---
    Timer {
        id: rotationTimer
        interval: 300000
        repeat: false
        running: false
        onTriggered: root._random()
    }

    Timer {
        id: progressTimer
        interval: 1000
        repeat: true
        running: !root.timerPaused && rotationTimer.running
        onTriggered: {
            var elapsed = Date.now() - root._timerStartMs
            root.timerProgress = Math.min(1.0, elapsed / root.displayTimeMs())
        }
    }

    function _startTimer() {
        _timerStartMs = Date.now()
        _pausedElapsedMs = 0
        timerProgress = 0
        timerPaused = false
        rotationTimer.interval = Math.max(5000, displayTimeMs())
        rotationTimer.restart()
    }

    function toggleTimer() {
        if (timerPaused) {
            _timerStartMs = Date.now() - _pausedElapsedMs
            rotationTimer.interval = Math.max(1000, displayTimeMs() - _pausedElapsedMs)
            rotationTimer.restart()
            timerPaused = false
        } else {
            _pausedElapsedMs = Date.now() - _timerStartMs
            rotationTimer.stop()
            timerPaused = true
        }
    }

    // --- Local files ---
    function _loadLocalFiles(purity, cb) {
        var dir = wallpaperBase + "/" + purity
        var cmd = ["find", "-L", dir, "-maxdepth", "1", "-type", "f", "(",
                   "-iname", "*.jpg", "-o", "-iname", "*.jpeg",
                   "-o", "-iname", "*.png", "-o", "-iname", "*.webp",
                   "-o", "-iname", "*.gif", "-o", "-iname", "*.bmp",
                   "-o", "-iname", "*.avif", ")"]
        _run(cmd, function(code, stdout) {
            var files = []
            if (code === 0 && stdout.trim()) {
                var lines = stdout.trim().split("\n")
                for (var i = 0; i < lines.length; i++) {
                    var f = lines[i].trim()
                    if (f) files.push(f)
                }
            }
            cb(files)
        })
    }

    function _randomLocal(cb) {
        var purities = []
        if (sfw())     purities.push("sfw")
        if (sketchy()) purities.push("sketchy")
        if (nsfw())    purities.push("nsfw")
        if (purities.length === 0) { cb(null); return }

        var all = []
        var remaining = purities.length
        function collect(purity, files) {
            for (var i = 0; i < files.length; i++)
                all.push({ path: files[i], purity: purity, id: null })
            if (--remaining > 0) return
            _localTotal = all.length
            if (all.length === 0) { cb(null); return }
            var bl = blacklist()
            var pool = all.filter(function(w) {
                return _viewedIds.indexOf(w.path) < 0 && bl.indexOf(w.path) < 0
            })
            if (pool.length === 0) { _viewedIds = []; pool = all }
            cb(pool[Math.floor(Math.random() * pool.length)])
        }
        for (var i = 0; i < purities.length; i++)
            (function(p) { _loadLocalFiles(p, function(f) { collect(p, f) }) })(purities[i])
    }

    // --- Wallhaven API pagination ---
    function _resetApiPagination() {
        var chars = "abcdefghijklmnopqrstuvwxyz0123456789"
        var seed = ""
        for (var i = 0; i < 6; i++) seed += chars[Math.floor(Math.random() * chars.length)]
        _apiSeed = seed
        _apiPage = 1
        _apiQueue = []
        _apiConsumedCount = 0
    }

    function _fetchWallhaven(cb) {
        if (_apiQueue.length > 0) { _apiConsumedCount++; cb(_apiQueue.shift()); return }

        var purity = (sfw() ? "1" : "0") + (sketchy() ? "1" : "0") + (nsfw() ? "1" : "0")
        var cats   = (general() ? "1" : "0") + (anime() ? "1" : "0") + (people() ? "1" : "0")
        if (purity === "000" || cats === "000") { cb(null); return }
        if (!_apiSeed) _resetApiPagination()

        var url = "https://wallhaven.cc/api/v1/search?sorting=random&seed=" + _apiSeed
                + "&page=" + _apiPage + "&purity=" + purity + "&categories=" + cats
        if (tags()) url += "&q=" + encodeURIComponent(tags())
        if (apikey()) url += "&apikey=" + encodeURIComponent(apikey())

        lastDebugUrl = url
        lastDebugResponse = ""

        _run(["curl", "-s", "--max-time", "15", url], function(code, stdout) {
            lastDebugResponse = stdout
            if (code !== 0) { fetchStatus = "offline"; cb(null); return }
            try {
                var json = JSON.parse(stdout)
                if (!Array.isArray(json?.data)) { fetchStatus = "api-error"; cb(null); return }
                currentTotal = json.meta?.total ?? 0
                if (json.data.length === 0) {
                    _resetApiPagination(); fetchStatus = "no-results"; cb(null); return
                }
                fetchStatus = "ok"
                _apiPage++
                var bl = blacklist()
                _apiQueue = json.data
                    .filter(function(item) { return bl.indexOf(String(item.id)) < 0 })
                    .map(function(item) { return { url: item.path, purity: item.purity, id: String(item.id) } })
                _apiConsumedCount++
                cb(_apiQueue.shift())
            } catch(e) { fetchStatus = "api-error"; cb(null) }
        })
    }

    function _downloadFile(url, id, cb) {
        var ext = (url.split(".").pop() || "jpg").split("?")[0] || "jpg"
        var dest = tmpDir + "/" + id + "." + ext
        _run(["test", "-f", dest], function(code) {
            if (code === 0) { cb(dest); return }
            _run(["curl", "-sf", "-L", "--max-time", "30", "-o", dest, url], function(dlCode) {
                cb(dlCode === 0 ? dest : null)
            })
        })
    }

    function _fetchTagsForId(id, cb) {
        var url = "https://wallhaven.cc/api/v1/w/" + id
        if (apikey()) url += "?apikey=" + encodeURIComponent(apikey())
        _run(["curl", "-s", "--max-time", "10", url], function(code, stdout) {
            try { cb(JSON.parse(stdout)?.data?.tags ?? []) } catch(e) { cb([]) }
        })
    }

    // --- Apply wallpaper ---
    function _applyWallpaper(info) {
        currentWallpaper = info
        currentImageTags = []
        isDownloading = false
        if (info.id) {
            currentIndex = _apiConsumedCount
        } else {
            _viewedIds.push(info.path)
            currentIndex = _viewedIds.length
            currentTotal = _localTotal
        }
        Settings.data.wallpaper.fillMode = coverMode() ? "crop" : "fit"
        WallpaperService.changeWallpaper(info.path, undefined)
        _checkIsSaved()
        _startTimer()
        if (info.id) _fetchTagsForId(info.id, function(t) { currentImageTags = t })
    }

    function _checkIsSaved() {
        var cur = currentWallpaper
        if (!cur) { isSaved = false; return }
        var fname = cur.path.split("/").pop()
        if (!fname) { isSaved = false; return }
        _run(["test", "-f", wallpaperBase + "/" + cur.purity + "/" + fname], function(code) {
            isSaved = (code === 0)
        })
    }

    // --- Public: next random wallpaper ---
    function _random() {
        if (_busy) return
        _busy = true

        function done(info) {
            _busy = false
            if (info) _applyWallpaper(info)
        }

        if (localOnly() || !(sfw() || sketchy() || nsfw())) {
            _randomLocal(done); return
        }
        if (nextWallpaperCached) {
            var next = nextWallpaperCached
            nextWallpaperCached = null
            done(next); return
        }
        isDownloading = true
        _fetchWallhaven(function(meta) {
            if (!meta) {
                isDownloading = false
                _busy = false
                _randomLocal(function(local) { _busy = true; done(local) })
                return
            }
            _downloadFile(meta.url, meta.id, function(path) {
                if (!path) { isDownloading = false; _busy = false; return }
                done({ path: path, purity: meta.purity, id: meta.id })
            })
        })
    }

    function random() { _random() }

    // --- Public: panic (boss-key toggle) ---
    function panic() {
        if (_panicActive) {
            // Restore pre-panic wallpaper without transition
            if (_prepanicWallpaper) {
                WallpaperService.changeWallpaper(_prepanicWallpaper.path, undefined)
                currentWallpaper = _prepanicWallpaper
            }
            _prepanicWallpaper = null
            _panicActive = false
            _startTimer()
            // Restore transition after Background's debounce (333ms) + buffer
            restoreTransitionTimer.restart()
        } else {
            // Apply a random local SFW wallpaper instantly, no timer, no transition
            _prepanicWallpaper = currentWallpaper
            _panicActive = true
            rotationTimer.stop()
            _savedTransitionType = Settings.data.wallpaper.transitionType
            Settings.data.wallpaper.transitionType = ["none"]
            _loadLocalFiles("sfw", function(files) {
                if (files.length === 0) return
                var bl = blacklist()
                var pool = files.filter(function(f) { return bl.indexOf(f) < 0 })
                if (pool.length === 0) pool = files
                var chosen = pool[Math.floor(Math.random() * pool.length)]
                WallpaperService.changeWallpaper(chosen, undefined)
            })
        }
    }

    IpcHandler {
        target: "wallhaven"
        function next() { root.random() }
        function panic() { root.panic() }
    }

    // --- Public: save / delete / blacklist ---
    function saveCurrentWallpaper() {
        var cur = currentWallpaper
        if (!cur) return
        var fname = cur.path.split("/").pop()
        if (!fname) return
        var dest = wallpaperBase + "/" + cur.purity
        _run(["sh", "-c", "mkdir -p '" + dest.replace(/'/g, "'\\''") + "' && cp '" + cur.path.replace(/'/g, "'\\''") + "' '" + dest.replace(/'/g, "'\\''") + "/" + fname.replace(/'/g, "'\\''") + "'"],
             function(code) { if (code === 0) isSaved = true })
    }

    function deleteCurrentWallpaper() {
        var cur = currentWallpaper
        if (!cur) return
        var fname = cur.path.split("/").pop()
        if (!fname) return
        _run(["rm", "-f", wallpaperBase + "/" + cur.purity + "/" + fname],
             function(code) { if (code === 0) isSaved = false })
    }

    function blacklistCurrent() {
        var cur = currentWallpaper
        if (!cur) return
        var key = cur.id !== null ? cur.id : cur.path
        var bl = blacklist().slice()
        if (bl.indexOf(key) < 0) { bl.push(key); setConfig("blacklist", bl) }
        _random()
    }

    // Called by Panel when user changes a search-affecting setting
    function onSettingsChange() {
        _viewedIds = []
        _apiQueue = []
        _apiPage = 1
        _apiSeed = ""
        _apiConsumedCount = 0
        nextWallpaperCached = null
        currentIndex = 0
        currentTotal = 0
        fetchStatus = "idle"
    }

    function setDisplayTimeMinutes(min) {
        setConfig("displayTimeMs", Math.max(1, min) * 60000)
        _startTimer()
    }
    function getDisplayTimeMinutes() { return Math.round(displayTimeMs() / 60000) }
}

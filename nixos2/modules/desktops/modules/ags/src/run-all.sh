#!/usr/bin/env bash

SRC_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

function compileTypeScript() {
  echo 'Compiling TypeScript'

  nix run nixpkgs#esbuild -- \
    $SRC_DIR/config.ts \
    --bundle \
    --outfile=$SRC_DIR/../.config/config.js \
    --platform=node \
    --format=esm \
    --packages=external
}

function compileSass() {
  echo 'Compiling SASS'
  sassc $SRC_DIR/styles/styles.scss $SRC_DIR/../.config/styles.css
}

function runAgs() {
  pkill ags
  ags -c $SRC_DIR/../.config/config.js --inspector &
}

compileTypeScript
compileSass
runAgs

inotifywait --quiet --monitor --event create,modify,delete --recursive $SRC_DIR | while read DIRECTORY EVENT FILE; do
  file_extension=${FILE##*.}
  case $file_extension in
  ts)
    compileTypeScript
    runAgs
    ;;
  scss)
    compileSass
    ags --run-js 'App.resetCss(); App.applyCss(`${App.configDir}/styles.css`); return "Styles Reloaded.";' #&>/dev/null
    ;;
  esac
done

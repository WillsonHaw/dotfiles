import windows from './windows/index.js';
import { tmpDir } from './constants.js';

const css = `${tmpDir}/styles.css`;

console.log('ne?');

App.config({
  css,
  // style: css,
  // stackTraceOnError: true,
  windows,
  onWindowToggled: function (windowName, visible) {
    print(`${windowName} is ${visible}`);
  },
});

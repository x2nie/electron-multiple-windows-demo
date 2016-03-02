# [Electron](https://github.com/atom/electron) Multiple Windows Demo

> An example [electron](https://github.com/atom/electron) app showing how to manage multiple windows.

[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[travis-image]: https://img.shields.io/travis/ngoldman/electron-multiple-windows-demo.svg?style=flat-square
[travis-url]: https://travis-ci.org/ngoldman/electron-multiple-windows-demo
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://standardjs.com/

![](screenshot.png)

Useful things this demo app demonstrates:

- An application menu with a `File -> New Window ⌘N` command for creating new windows
- A module for managing windows in [`main/windows.js`](main/windows.js) (list, create, destroy)
- A basic IPC example in [`main/windows.js`](main/windows.js) and [`renderer/index.js`](renderer/index.js)

## Try It Out

```
git clone git@github.com:ngoldman/electron-multiple-windows-demo.git
cd electron-multiple-windows-demo
npm install
npm start
```

## Thanks

This demo is built on top of [`electron-quick-start`](https://github.com/atom/electron-quick-start).

## License

[CC0 1.0 Universal](LICENSE.md)

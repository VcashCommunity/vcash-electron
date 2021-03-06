# Vcash Electron GUI
[![Chat](https://badges.gitter.im/openvcash/vcash-electron.svg)](https://gitter.im/openvcash/vcash-electron?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![TravisCI](https://img.shields.io/travis/openvcash/vcash-electron/master.svg)](https://travis-ci.org/openvcash/vcash-electron)
[![Release](https://img.shields.io/github/release/openvcash/vcash-electron.svg)](https://github.com/openvcash/vcash-electron/releases)
[![AUR](https://img.shields.io/aur/version/vcash-electron.svg)](https://aur.archlinux.org/packages/vcash-electron/)
[![Prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Standard](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Multi-platform and multi-node GUI for [Vcash](https://vcash.info/). You can find
the latest release [here](https://github.com/openvcash/vcash-electron/releases).

![Screenshots](https://i.imgur.com/jZbIspi.gif)

**Disclaimer:** I (@whphhg) am the creator of this GUI, but not of Vcash itself.
I've been learning about Bitcoin for a short period of time when I found this
coin with a mixed PoW and PoS consensus that had the ability to spend the coins
a few seconds after receiving them. However, there was no GUI for Linux, so
I've started to learn about Node.js and created my first GUI using Express.js
and Socket.io. Since then I've learned about Electron, React, Redux, MobX and
created this GUI, with the goal of making it as simple, clean and intuitive as
I could.

During this time the creator of the coin @john-connor left and deleted the
website, forums and git repository. Shortly after, @xCoreDev decided to keep
the community together and provided a website snapshot and forum hosting along
with c++ improvements, and another person handled the BitcoinTalk and Twitter
account.

I've decided to add this disclaimer because I'm not a c++ programmer and am
unable to verify how the coin works on my own to give you a definite conclusion,
even though I've created a RPC based GUI for it.

## Table of Contents
- [Install from source](#install-from-source)
- [Build and package for Linux, macOS and Windows](#build-and-package-for-linux-macos-and-windows)
- [Contributing](#contributing)
- [License](#license)

--------------------------------------------------------------------------------

## Install from source
Make sure you have installed `git` and the latest version of
[Node.js](https://nodejs.org/en/download/current/), then clone this repository,
move to the cloned directory and install Node.js dependencies.

    git clone https://github.com/openvcash/vcash-electron.git
    cd vcash-electron/
    npm install

After the installation is completed, transform the source code using
`npm run babel` or `npm run babel-watch` to keep auto-transforming on any
changes to the files in the `src/` directory.

    npm run babel (transform once)
    npm run babel-watch (auto-transform on changes to src/)

You can now run the GUI using `npm start`, or if you want to use development
tools, using `npm run dev` or using `npm run dev-win` on Windows.

    npm start
    npm run dev (Linux and macOS)
    npm run dev-win (Windows)

## Build and package for Linux, macOS and Windows
[Download](https://vcash.info/) the latest daemon for your platform
to the `build/bin/` directory and rename it to `vcashd-ia32` or `vcashd-x64`,
depending on the arch. The `build/bin/` directory gets bundled with the GUI
when you run any of the `npm run build-*` scripts and is checked on startup by
[daemon.js](https://github.com/openvcash/vcash-electron/blob/master/src/stores/daemon.js)
which launches the daemon if it matches the correct platform and arch.

Packages are created according to the
[.buildrc](https://github.com/openvcash/vcash-electron/blob/master/.buildrc)
config and highlighted `scripts` options in
[package.json](https://github.com/openvcash/vcash-electron/blob/master/package.json#L13-L17),
about which you can read more
[here](https://www.electron.build/configuration/configuration).

Run the commands below to install npm dependencies, remove extraneous npm
packages and transform the source code to `lib/` directory using Babel.

    npm install && npm prune && npm run babel

You can now create and save packages into the `dist/` directory by running the
scripts (for your platform) from the table below.

Script         | Description
-------------- | ---------------------------------------------------------------
build-linux    | Create 64-bit .deb and .zip packages
build-macos    | Create a 64-bit .dmg package
build-win-nsis | Create a Windows NSIS installer for both architectures
build-win-ia32 | Create a 32-bit Windows portable executable
build-win-x64  | Create a 64-bit Windows portable executable

    npm run <script>

**Note:** `build-win-nsis` script requires both `vcashd-ia32.exe` and
`vcashd-x64.exe` in the `build/bin/` directory.

## Contributing
Thank you for taking the time to help and improve the GUI! Please read the
[contributing guide](https://github.com/openvcash/vcash-electron/blob/master/.github/CONTRIBUTING.md).

## License
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

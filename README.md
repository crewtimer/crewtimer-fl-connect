# CrewTimer FinishLynx Connect

CrewTimer FinishLynx Connect is built using Electron, and specificlly
the [Electron React Boilerplate Project](https://electron-react-boilerplate.js.org/docs/installation/).

See the [VSCode plugins suggested here](https://electron-react-boilerplate.js.org/docs/editor-configuration).

## Build Environment

### Macos

Install brew from [brew.sh](https://brew.sh)

```bash
brew install nvm
brew install nasm
brew install yasm
brew install pkg-config
brew install cmake

nvm install 18
nvm use 18

npm i -g node-gyp@latest
npm i -g yarn
npm i -g ts-node
```

## Building from scratch


```bash
node --version # ensure you are using node 18
# Clone the repo
git clone git@github.com:crewtimer/crewtimer-fl-connect.git
# Build
cd crewtimer-fl-connect
yarn install
# Run
yarn start

```

To create a notarized macos build, create a .env file with the following contents.  **Do not commit this file to the repo**

```txt
APPLE_ID=glenne@engel.org
APPLE_APP_SPECIFIC_PASSWORD=xxxx-xxxx-xxxx-xxxx
TEAM_ID=P<snip>4
```

If the build fails with a node-gyp error, be sure node-gyp is installed globally.

If the run fails with 'cannot locate sqlite', remove the src/node_modules symbolic link and `yarn install` again.

## Debugging

Starting from VSCode seems broke. Try this command line

`yarn "start:main" "--inspect=5858" "--remote-debugging-port=9223"`

Open dev window with releases code:

`yarn cross-env DEBUG_PROD=true yarn package`

See also [the Electron React Boilerplate page](https://electron-react-boilerplate.js.org/docs/packaging).

## File Locations

### Windows

* CrewTimer.db No longer correct: C:\\Users\\glenne\\AppData\\Local\\Programs\\crewtimer-fl-connector\\CrewTimer.db
* Images and assets C:\\Users\\glenne\\AppData\\Local\\Programs\\crewtimer-fl-connector\\resources\assets
* config.json C:\\Users\\glenne\\AppData\Roaming\\CrewTimer FinishLynx Connector\\config.json

### MacOS

* CrewTimer.db '/Users/glenne/Library/Application Support/Electron/CrewTimer.db'

## Debugging with Parallels and MacOS

FL connects via TCP/IP to the CrewTimer FL Connect app. When running with parallels the
scoreboard must be provided with the IP address where CrewTimer FL Connect is running.

1. Find the macOS IP Address for the Parallels container. Issue `ifconfig` and look for the IP address associated with the vnic1 interface. E.g. 10.37.129.2. This will be used within FinishLynx.
2. Run FinishLynx within Parallels and configure a scoreboard with the IP address found in the prior step.
3. Run CrewTimer FL Connect on macOS: `yarn start`

## Using Manual Start on FL

1. Go to File|Options|General and set the Hardware Type = None.
2. Set Camera Settings -> Input -> Wired Sensor = Open if not using a start sensor.
3. Go to LapTime options and click New.
4. Restart FL

## Releasing new versions

1. Edit [release/app/package.json](release/app/package.json) and src/renderer/Nav.tsx and adjust version info
2. Execute `yarn macbuild && yarn winbuild`
3. Look in release/ for the exe file
4. Copy the exe to the 'CrewTimer Installers' google drive folder.
5. Make a copy of the installer and rename it without a version: `CrewTimerConnect Setup.exe`.

## Tips

* Blank screen at startup? Check to make sure packagse were added top level package.json
* [Speedsoft Time Sync](https://www.speed-soft.de/software/time_sync/index.php)
* [Use Meinberg NTP](https://www.meinbergglobal.com/english/sw/ntp.htm)

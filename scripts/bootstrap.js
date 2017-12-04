// @flow
/* eslint no-console: off */
const fs = require('fs')
const os = require('os')

const getAppName = () => {
  const args = process.argv.slice(2)

  if (args.length === 1) {
    return args[0]
  }

  const splittedDirs = __dirname.split('/')
  const appDirName = splittedDirs[splittedDirs.length - 2]
  return appDirName
}

const deleteFolderRecursive = path => {
  let files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach(file => {
      const curPath = `${path}/${file}`
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

const adjustAppJson = appName => {
  const appjson = require('../app.json')

  const newAppJson = { ...appjson, expo: { ...appjson.expo, slug: appName, name: appName } }

  const content = JSON.stringify(newAppJson, null, 2)

  try {
    fs.writeFileSync('app.json', content + os.EOL, 'utf8')
    console.log('app.json file was saved!')
  } catch (err) {
    console.log(err)
  }
}

const adjustPackageJson = appName => {
  const packagejson = require('../package.json')

  const { bootstrap, ...newScripts } = packagejson.scripts
  const newAppJson = { ...packagejson, name: appName, scripts: newScripts }

  const content = JSON.stringify(newAppJson, null, 2)

  try {
    fs.writeFileSync('package.json', content + os.EOL, 'utf8')
    console.log('package.json file was saved!')
  } catch (err) {
    console.log(err)
  }
}

const appName = getAppName()

adjustAppJson(appName)
adjustPackageJson(appName)

deleteFolderRecursive('.git')
deleteFolderRecursive('scripts')

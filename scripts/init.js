// @flow
/* eslint no-console: off */
const appjson = require('../app.json')
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
  console.log(path)
  let files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach(file => {
      const curPath = `${path}/${file}`
      if (fs.lstatSync(curPath).isDirectory()) {
        console.log(curPath)
        deleteFolderRecursive(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

const appName = getAppName()

const newAppJson = { ...appjson, expo: { ...appjson.expo, slug: appName, name: appName } }

const content = JSON.stringify(newAppJson, null, 2)
console.log(content)

fs.writeFile('app.json', content + os.EOL, 'utf8', err => {
  if (err) {
    console.log(err)
    return
  }

  console.log('The file was saved!')

  deleteFolderRecursive('.git')
  deleteFolderRecursive('scripts')
})

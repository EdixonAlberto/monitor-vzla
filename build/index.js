const fs = require('fs').promises
const { resolve } = require('path')
const childProcess = require('child_process')

const ENV = process.env

async function build() {
  try {
    // Delete directory /dist and build cache file
    await fs.rm(resolve('dist'), { recursive: true, force: true })
    await fs.rm(resolve('tsconfig.tsbuildinfo'), { force: true })
    console.log('CLEANUP -> Ok')

    // Build project dynamically
    await new Promise((resolve, reject) => {
      const pkgName = ENV.PACKAGE_NAME
      if (!pkgName) reject(new Error('Environment variable "PACKAGE_NAME" no found'))

      childProcess.exec(`yarn ${pkgName} build`, (error, out, errorMsg) => {
        if (error) reject(new Error(errorMsg))
        else {
          console.log(`BUILD -> Ok, Command executed: "${out.replace('\n', ',')}"`)
          resolve(null)
        }
      })
    })
  } catch (error) {
    console.error(`ERROR-BUILD -> ${error.message}`)
    throw null
  }
}

build()

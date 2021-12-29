const { constants } = require('fs')
const { mkdir, readdir, lstat, copyFile } = require('fs/promises')
const { join, resolve } = require('path')

const copyFiles = async (input, output) => {
  const names = await readdir(input)

  names.map(async (name) => {
    const stats = await lstat(join(input, name))

    if (!stats) return

    if (stats.isDirectory()) {
      await mkdir(resolve(output, name), { recursive: true })
      await copyFiles(resolve(input, name), resolve(output, name))
    } else {
      await copyFile(
        join(input, name),
        join(output, name),
        constants.COPYFILE_FICLONE
      )
    }
  })
}

mkdir(resolve('dist', 'client', 'build'), { recursive: true }).then(() => {
  copyFiles(
    resolve('client', 'build'),
    resolve('dist', 'client', 'build')
  ).then(() => console.log('Copy completed'))
})

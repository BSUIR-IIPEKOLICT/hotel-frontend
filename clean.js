const { resolve } = require('path')
const { readdir, rm } = require('fs/promises')
;(async () => {
  const files = await readdir(resolve())

  if (files.includes('dist')) {
    await rm(resolve('dist'), { recursive: true })
  }
})()

import { resolve } from 'path'

export default function (req, res) {
  res.sendFile(resolve('client', 'build', 'index.html'))
}

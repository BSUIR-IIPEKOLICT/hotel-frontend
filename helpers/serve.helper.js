import { resolve } from 'path'

export default function serveHelper(req, res) {
  res.sendFile(resolve('client', 'build', 'index.html'))
}

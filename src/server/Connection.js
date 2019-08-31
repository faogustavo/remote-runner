import { getAllVersions, getVersion, runnerForLang } from '../utils/RunnerUtils'

const VERSIONS = 'getVersions'
const VERSION = 'getVersion'
const LANG = 'lang'
const RUN = 'run'
const CODE = 'code'

export default class Connection {
  // constructor(socket: WebSocket) {
  constructor(socket) {
    this.socket = socket
    this.socket.on('message', this._onMessage)
  }

  _onMessage = (message) => {
    let data;
    try {
      data = JSON.parse(message)
    } catch (e) {
      return console.warn(e)
    }
    switch (data.action) {
      case VERSION:
        this._getVersion(data[LANG])
        break
      case VERSIONS:
        this._getVersions()
        break
      case RUN:
        this._run(data[LANG], data[CODE])
    }
  }

  _send = (message) => {
    this.socket.send(JSON.stringify(message))
  }

  _resolveAndSend = (promise, sendError = false) => {
    promise
      .then(this._send)
      .catch(sendError ? this._send : console.warn)
  }

  _getVersion = (lang) => this._resolveAndSend(getVersion(lang), true)

  _getVersions = () => this._resolveAndSend(getAllVersions())

  _run = (lang, code) => this._resolveAndSend(runnerForLang(lang).run(code), true)
}
import Terminal from "../utils/Terminal"
import * as FileManager from "../utils/FileManager"

export default class GenericRunner {
    constructor(command, file) {
        this.command = command
        this.file = file
    }

    run = (code) => FileManager.runOnTempDir(this._run(code))

    version = (terminal) =>  terminal.execute(this.command, [ '-v' ])

    _run = (code) => (dir) => {
        const terminal = new Terminal(dir);
        return FileManager.writeFile(dir, this.file, code)
            .then(() => terminal.execute(this.command, [ this.file ]))
    }
}
import Terminal from "../utils/Terminal"
import * as FileManager from "../utils/FileManager"

const COMMAND_NAME = 'gcc'
const FILE_NAME = 'code.c'
const OUTPUT_FILE_NAME = 'Code'

export default class CRunner {
    identificationName = 'c'

    run = (code) => FileManager.runOnTempDir(this._run(code))

    version = (terminal) =>  terminal.execute(COMMAND_NAME, [ '-v' ])

    _run = (code) => (dir) => {
        const terminal = new Terminal(dir);
        return FileManager.writeFile(dir, FILE_NAME, code)
            .then(() => terminal.execute(COMMAND_NAME, [ FILE_NAME, '-o', OUTPUT_FILE_NAME ], true))
            .then(() => terminal.execute(`./${OUTPUT_FILE_NAME}`))
    }
}
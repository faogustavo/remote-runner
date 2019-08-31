import Terminal from "../utils/Terminal"
import * as FileManager from "../utils/FileManager"

const COMPILE_COMMAND = 'kotlinc'
const EXECUTE_COMMAND = 'java'
const FILE_NAME = 'code.kt'
const OUTPUT_FILE_NAME = 'code.jar'

export default class KotlinRunner {
    run = (code) => FileManager.runOnTempDir(this._run(code))

    _run = (code) => (dir) => {
        const terminal = new Terminal(dir);
        return FileManager.writeFile(dir, FILE_NAME, code)
            .then(() => terminal.execute(COMPILE_COMMAND, [ FILE_NAME, '-include-runtime', '-d', OUTPUT_FILE_NAME ], true))
            .then(() => terminal.execute(EXECUTE_COMMAND, [ '-jar', OUTPUT_FILE_NAME ]))
    }
}
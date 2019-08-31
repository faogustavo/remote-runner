import Terminal from "../utils/Terminal"
import * as FileManager from "../utils/FileManager"

const COMPILE_COMMAND = 'javac'
const EXECUTE_COMMAND = 'java'
const FILE_NAME = 'code.java'

export default class JavaRunner {
    run = (code) => FileManager.runOnTempDir(this._run(code))

    _run = (code) => (dir) => {
        const terminal = new Terminal(dir);
        return FileManager.writeFile(dir, FILE_NAME, code)
            .then(() => terminal.execute(COMPILE_COMMAND, [ FILE_NAME ], true))
            .then(() => FileManager.filesFromDir(dir))
            .then((files) => {
                const file = files.find((item) => item.includes('.class'))
                if (file) {
                    return terminal.execute(EXECUTE_COMMAND, [ file.replace('.class', '') ])
                } else {
                    return Promise.reject({ error: 'Compilation failed' })
                }
            })
    }
}
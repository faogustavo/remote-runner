import Terminal from "../utils/Terminal"
import * as FileManager from "../utils/FileManager"

const FILE_NAME = "code.js"

export default class NodeRunner {

    run = (code) => FileManager.runOnTempDir(this.__run(code))

    __run = (code) => (dir) => {
        const terminal = new Terminal(dir);
        return FileManager.writeFile(dir, FILE_NAME, code)
            .then(() => terminal.execute("node", [ FILE_NAME ]))
    }
}
import { exec } from 'child_process'

export default class Terminal {
    constructor(dir = '.') {
        this.dir = dir
    }

    execute(command, args = [], rejectOnError = false) {
        return new Promise((resolve, reject) => {
            exec(`cd ${this.dir}; ${command} ${args.join(' ')}`, (_, stdout, stderr) => {
                (rejectOnError && stderr ? reject : resolve)(this._buildReturn(stdout, stderr))
            })
        })
    }

    _buildReturn = (stdout, stderr) => ({
        output: stdout || '', 
        error: stderr || '', 
    })
}
import { exec } from 'child_process'

export default class Terminal {
    constructor(dir) {
        this.dir = dir
    }

    execute(command, args = []) {
        return new Promise((resolve) => {
            exec(`cd ${this.dir}; ${command} ${args.join(' ')}`, (exception, stdout, stderr) => {
                resolve(this._buildReturn(exception, stdout, stderr))
            })
        })
    }

    _buildReturn = (exception, stdout, stderr) => ({
        stdout: stdout || '', 
        stderr: stderr || '', 
        exception: exception || '',
    })
}
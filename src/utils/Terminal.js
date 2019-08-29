import { exec } from 'child_process'

export default class Terminal {
    constructor(dir) {
        this.dir = dir
    }

    execute(command, args = []) {
        return new Promise((resolve, reject) => {
            exec(`cd ${this.dir}; ${command} ${args.join(' ')}`, (exception, stdout, stderr) => {
                if (exception) {
                    reject(exception)
                } else {
                    resolve({ stdout, stderr })
                }
            })
        })
    }
}
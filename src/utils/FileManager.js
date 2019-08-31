import os, { type } from 'os'
import fs from 'fs'
import path from 'path'
import uuid from 'uuid'

const getTempDir = () => os.tmpdir()

export const makeRuntimeTempDir = () => {
    const dir = path.join(getTempDir(), uuid.v4())
    fs.mkdirSync(dir)
    return dir
}

export const deleteDir = (dir) => { 
    const items = fs.readdirSync(dir)
    items.forEach((item) => {
        const itemPath = path.join(dir, item)
        if (fs.lstatSync(itemPath).isDirectory()) {
            deleteDir(itemPath)
        } else {
            fs.unlinkSync(itemPath)
        }
    })
    fs.rmdirSync(dir) 
}

export const writeFile = (dir, name, content) => new Promise((resolve, reject) => {
    fs.writeFile(path.join(dir, name), content, (exception) => {
        if (exception) {
            reject(exception)
        } else {
            resolve()
        }
    })
})

export const filesFromDir = (dir) => new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
        if (err) return resolve([])
        else return resolve(files)
    })
})

export const runOnTempDir = (block) => new Promise((resolve, reject) => {
    if (block) {
        if (typeof block === "function") {
            const dir = makeRuntimeTempDir()
            block(dir)
                .then((result) => {
                    deleteDir(dir)
                    return Promise.resolve(result)
                })
                .then(resolve)
                .catch((e) => {
                    deleteDir(dir)
                    reject(e)
                })
        } else {
            // Some invalid block
            reject({ error: "Callback (block) must be a function that returns a promise!" })
        }
    } else {
        reject({ error: "You must provide a callback (block)" })
    }
})
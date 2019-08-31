import process from 'process'
import NodeRunner from './runners/NodeRunner'
import PythonRunner from './runners/PythonRunner'
import RubyRunner from './runners/RubyRunner'
import PhpRunner from './runners/PhpRunner'
import CRunner from './runners/CRunner'
import JavaRunner from './runners/JavaRunner'
import KotlinRunner from './runners/KotlinRunner'
import Terminal from './utils/Terminal';

const runNode = () => {
    const runner = new NodeRunner()
    runner.run('console.log("Hello from NodeJS")')
        .then(console.log)
        .catch(console.warn)
}

const runPython = () => {
    const runner = new PythonRunner()
    runner.run('print("Hello from Python")')
        .then(console.log)
        .catch(console.warn)
}

const runRuby = () => {
    const runner = new RubyRunner()
    runner.run('puts "Hello from Ruby"')
        .then(console.log)
        .catch(console.warn)
}

const runPhp = () => {
    const runner = new PhpRunner()
    runner.run('<?php echo("Hello from PHP");')
        .then(console.log)
        .catch(console.warn)
}

const runC = () => {
    const runner = new CRunner()
    const code = `
#include <stdio.h>
int main() {
    printf("Hello from C");
}
    `
    runner.run(code)
        .then(console.log)
        .catch(console.warn)
}

const runJava = () => {
    const runner = new JavaRunner()
    const code = `
class Code {
    public static void main(String[] args) {
        System.out.print("Hello from Java");
    }
}
    `
    runner.run(code)
        .then(console.log)
        .catch(console.warn)
}

const runKotlin = () => {
    const runner = new KotlinRunner()
    const code = `
fun main() {
    print("Hello from Kotlin")
}
    `
    runner.run(code)
        .then(console.log)
        .catch(console.warn)
}

const version = (lang) => {
    const terminal = new Terminal()
    const versionForLang = () => {
        switch (lang) {
            case 'node': return new NodeRunner().version(terminal)
            case 'python': return new PythonRunner().version(terminal)
            case 'ruby': return new RubyRunner().version(terminal)
            case 'php': return new PhpRunner().version(terminal)
            case 'c': return new CRunner().version(terminal)
            case 'java': return new JavaRunner().version(terminal)
            case 'kotlin': return new KotlinRunner().version(terminal)
            default: return Promise.reject("You must provide a lag to check the version")
        }
    }

    versionForLang()
        .then(console.log)
        .catch(console.warn)
}

const versions = () => {
    const terminal = new Terminal()

    const versionPromise = (runner) => new Promise((resolve) => {
        const buildResult = (output) => ({ 
            [runner.identificationName]: output
        })

        runner.version(terminal)
            .then(({ output, error }) => resolve(buildResult(output || error)))
            .catch(() => resolve(buildResult(false)))
    })

    const versions = [
        new NodeRunner(),
        new PythonRunner(),
        new RubyRunner(),
        new PhpRunner(),
        new CRunner(),
        new JavaRunner(),
        new KotlinRunner(),
    ].map(versionPromise)

    Promise.all(versions)
        .then((results) => results.reduce(
            (acc, current) => ({ ...acc, ...current }), 
            {}
        ))
        .then(console.log)
        .catch(console.warn)
}

const app = () => {
    switch (process.argv[2]) {
        case 'node': return runNode()
        case 'python': return runPython()
        case 'ruby': return runRuby()
        case 'php': return runPhp()
        case 'c': return runC()
        case 'java': return runJava()
        case 'kotlin': return runKotlin()
        case 'version': return version(process.argv[3])
        default: return versions()
    }
}

app()
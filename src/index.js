import process from 'process'
import NodeRunner from './runners/NodeRunner'
import PythonRunner from './runners/PythonRunner'
import RubyRunner from './runners/RubyRunner'
import PhpRunner from './runners/PhpRunner'
import CRunner from './runners/CRunner'
import JavaRunner from './runners/JavaRunner'
import KotlinRunner from './runners/KotlinRunner'

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

const app = () => {
    switch (process.argv[2]) {
        case 'node': return runNode()
        case 'python': return runPython()
        case 'ruby': return runRuby()
        case 'php': return runPhp()
        case 'c': return runC()
        case 'java': return runJava()
        case 'kotlin': return runKotlin()
        default: return console.log("Provide an argument with the language")
    }
}

app()
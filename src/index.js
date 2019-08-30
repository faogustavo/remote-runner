import process from 'process'
import NodeRunner from './runners/NodeRunner'
import PythonRunner from './runners/PythonRunner'
import RubyRunner from './runners/RubyRunner'
import PhpRunner from './runners/PhpRunner'

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

const app = () => {
    switch (process.argv[2]) {
        case 'node': return runNode()
        case 'python': return runPython()
        case 'ruby': return runRuby()
        case 'php': return runPhp()
        default: return console.log("Provide an argument with the language")
    }
}

app()
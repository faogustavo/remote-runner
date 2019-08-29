import NodeRunner from './runners/NodeRunner'

const runner = new NodeRunner()
runner.run('console.log("Hello from NodeJS")')
    .then(console.log)
    .catch(console.warn)
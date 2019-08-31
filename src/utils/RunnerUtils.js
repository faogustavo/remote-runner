import NodeRunner from '../runners/NodeRunner'
import PythonRunner from '../runners/PythonRunner'
import RubyRunner from '../runners/RubyRunner'
import PhpRunner from '../runners/PhpRunner'
import CRunner from '../runners/CRunner'
import JavaRunner from '../runners/JavaRunner'
import KotlinRunner from '../runners/KotlinRunner'
import Terminal from './Terminal';

const versionPromise = (terminal, runner, alwaysResolve = true) => new Promise((resolve, reject) => {
  const buildResult = (output) => ({
    [runner.identificationName]: output
  })

  if (runner) {
    runner.version(terminal)
      .then(({ output, error }) => resolve(buildResult(output || error)))
      .catch(() => {
        if (alwaysResolve) {
          resolve(buildResult(false))
        } else {
          reject({ message: "Language is not supported" })
        }
      })
  } else {
    reject({ message: "Language is not supported" })
  }
})

export const runnerForLang = (lang) => {
  switch (lang) {
    case 'node': return new NodeRunner()
    case 'python': return new PythonRunner()
    case 'ruby': return new RubyRunner()
    case 'php': return new PhpRunner()
    case 'c': return new CRunner()
    case 'java': return new JavaRunner()
    case 'kotlin': return new KotlinRunner()
    default: return null
  }
}

export const getVersion = (lang) => {
  const terminal = new Terminal()
  return versionPromise(terminal, runnerForLang(lang))
}

export const getAllVersions = () => {
  const terminal = new Terminal()

  const versions = [
    new NodeRunner(),
    new PythonRunner(),
    new RubyRunner(),
    new PhpRunner(),
    new CRunner(),
    new JavaRunner(),
    new KotlinRunner(),
  ].map(versionPromise.bind(terminal))

  return Promise.all(versions)
    .then((results) => results.reduce(
      (acc, current) => ({ ...acc, ...current }),
      {}
    ))
}
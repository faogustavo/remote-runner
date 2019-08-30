import GenericRunner from './GenericRunner'

const COMMAND_NAME = 'node'
const FILE_NAME = 'code.js'

export default class NodeRunner extends GenericRunner {
    constructor() {
        super(COMMAND_NAME, FILE_NAME)
    }
}
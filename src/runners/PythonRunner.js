import GenericRunner from './GenericRunner'

const COMMAND_NAME = "python"
const FILE_NAME = "code.py"

export default class PythonRunner extends GenericRunner {
    identificationName = 'python'

    constructor() {
        super(COMMAND_NAME, FILE_NAME)
    }

    version = (terminal) =>  terminal.execute(this.command, [ '--version' ])
}
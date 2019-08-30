import GenericRunner from './GenericRunner'

const COMMAND_NAME = "python"
const FILE_NAME = "code.py"

export default class PythonRunner extends GenericRunner {
    constructor() {
        super(COMMAND_NAME, FILE_NAME)
    }
}
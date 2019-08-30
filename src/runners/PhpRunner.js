import GenericRunner from './GenericRunner'

const COMMAND_NAME = "php"
const FILE_NAME = "code.php"

export default class PhpRunner extends GenericRunner {
    constructor() {
        super(COMMAND_NAME, FILE_NAME)
    }
}
import GenericRunner from './GenericRunner'

const COMMAND_NAME = "ruby"
const FILE_NAME = "code.rb"

export default class RubyRunner extends GenericRunner {
    constructor() {
        super(COMMAND_NAME, FILE_NAME)
    }
}
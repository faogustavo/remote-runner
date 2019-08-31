import GenericRunner from './GenericRunner'

const COMMAND_NAME = "ruby"
const FILE_NAME = "code.rb"

export default class RubyRunner extends GenericRunner {
    identificationName = 'ruby'

    constructor() {
        super(COMMAND_NAME, FILE_NAME)
    }
}
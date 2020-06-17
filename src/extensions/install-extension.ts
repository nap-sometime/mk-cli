import { GluegunToolbox } from 'gluegun'
import { IInstallCommandInputs } from '../types'

module.exports = async (toolbox: GluegunToolbox) => {
  toolbox.install = (inputs: IInstallCommandInputs) => {
    const { print } = toolbox

    print.info('In processing from an extension!')
    print.debug(inputs)
  }
}

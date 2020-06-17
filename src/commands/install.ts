import { GluegunCommand } from 'gluegun'
import { IInstallInputValues } from '../types'

const command: GluegunCommand = {
  name: 'install',
  run: async toolbox => {
    const { print, installInputs } = toolbox

    const inputs: IInstallInputValues = await installInputs()

    print.debug(inputs)
  }
}

module.exports = command

import { GluegunCommand } from 'gluegun'
import { IInstallInputValues } from '../types'

const command: GluegunCommand = {
  name: 'install',
  run: async toolbox => {
    const { print, installInputs, generatePackageJson } = toolbox

    const inputs: IInstallInputValues = await installInputs()

    await generatePackageJson(inputs)

    print.debug(inputs)
  }
}

module.exports = command

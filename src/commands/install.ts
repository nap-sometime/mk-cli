const path = require('path')

import { prompt, GluegunCommand } from 'gluegun'
import { IInstallCommandInputs } from '../types'

const command: GluegunCommand = {
  name: 'install',
  run: async toolbox => {
    const { filesystem, install } = toolbox

    const inputs: IInstallCommandInputs = await prompt.ask([
      {
        type: 'input',
        name: 'app_name',
        message: 'Project name',
        default: path.basename(filesystem.path())
      },
      {
        type: 'input',
        name: 'app_version',
        message: 'Version',
        default: '1.0.0'
      },
      {
        type: 'input',
        name: 'app_description',
        message: 'Description'
      }
    ])

    install(inputs)
  }
}

module.exports = command

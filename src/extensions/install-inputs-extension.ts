const path = require('path')

import { prompt, GluegunToolbox } from 'gluegun'
import { IInstallInputValues } from '../types'

module.exports = async (toolbox: GluegunToolbox) => {
  toolbox.installInputs = async () => {
    const { filesystem } = toolbox

    const inputs: IInstallInputValues = await prompt.ask([
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
      },
      {
        type: 'input',
        name: 'app_author',
        message: 'Author',
        default: 'agent one co., ltd.'
      }
    ])

    return inputs
  }
}

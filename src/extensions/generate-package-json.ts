import { GluegunToolbox } from 'gluegun'
import { IInstallInputValues } from '../types'

module.exports = async (toolbox: GluegunToolbox) => {
  toolbox.generatePackageJson = async (inputs: IInstallInputValues) => {
    const { print, template, filesystem } = toolbox

    await template.generate({
      template: 'package-json.ts.ejs',
      target: `${filesystem.path()}/${inputs.app_name}/package.json`,
      props: inputs
    })

    print.info(`Generated file at ${inputs.app_name}/package.json`)
  }
}

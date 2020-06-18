import { GluegunCommand } from 'gluegun'
import { IInstallInputValues } from '../types'

const command: GluegunCommand = {
	name: 'install',
	run: async toolbox => {
		const { print, filesystem, system } = toolbox
		const { installInputs, generatePackageJson } = toolbox

		const inputs: IInstallInputValues = await installInputs()

		const rootDir = `${filesystem.path()}/${inputs.app_name}`

		await generatePackageJson(rootDir, inputs)

		print.info('installing...')
		print.info(await system.run('yarn install --cwd ' + inputs.app_name))
	}
}

module.exports = command

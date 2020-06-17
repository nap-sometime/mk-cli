import { GluegunCommand } from 'gluegun'
import { IInstallInputValues } from '../types'

const command: GluegunCommand = {
	name: 'install',
	run: async toolbox => {
		const {
			print,
			filesystem,
			installInputs,
			generatePackageJson,
			generateAppVue
		} = toolbox

		const inputs: IInstallInputValues = await installInputs()

		const rootDir = `${filesystem.path()}/${inputs.app_name}`

		await generatePackageJson(rootDir, inputs)
		await generateAppVue(rootDir)

		print.debug(inputs)
	}
}

module.exports = command

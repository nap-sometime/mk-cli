import { GluegunCommand } from 'gluegun'
import { IInstallingInputs } from '../types'

const command: GluegunCommand = {
	name: 'install',
	run: async toolbox => {
		const { parameters, filesystem, print, system } = toolbox
		const {
			getInstallingInputs,
			generatePackageJson,
			generateReadme,
			generateStaticFiles,
			generateVueConfig
		} = toolbox

		const firstParameter = parameters.first

		const rootDir = firstParameter
			? `${filesystem.path()}/${firstParameter}`
			: filesystem.path()

		const inputs: IInstallingInputs = await getInstallingInputs(
			firstParameter
		)

		await generatePackageJson(rootDir, inputs)
		await generateReadme(rootDir, inputs)
		await generateStaticFiles(rootDir)
		await generateVueConfig(rootDir, inputs)

		print.info('installing...')
		print.info(
			await system.run('yarn install --cwd ' + inputs.app_name, {
				trim: true
			})
		)
	}
}

module.exports = command

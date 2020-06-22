import { GluegunCommand } from 'gluegun'
import { IInstallingInputs } from '../types'

const command: GluegunCommand = {
	name: 'install',
	run: async toolbox => {
		const {
			parameters,
			filesystem,
			system: { which, spawn }
		} = toolbox
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

		const yarnPath = which('yarn')

		return spawn(`cd ${rootDir} && ${yarnPath} install`, {
			shell: true,
			stdio: 'inherit',
			stderr: 'inherit'
		})
	}
}

module.exports = command

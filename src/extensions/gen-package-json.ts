import { GluegunToolbox } from 'gluegun'
import { IInstallingInputs } from '../types'

module.exports = async (toolbox: GluegunToolbox) => {
	toolbox.generatePackageJson = async (
		rootDir: string,
		inputs: IInstallingInputs
	) => {
		const { template } = toolbox

		await template.generate({
			template: 'package-json.ts.ejs',
			target: `${rootDir}/package.json`,
			props: inputs
		})
	}
}

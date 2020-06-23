import { GluegunToolbox } from 'gluegun'
import { IInstallDetails } from '../types'

module.exports = async (toolbox: GluegunToolbox) => {
	toolbox.generateInstallationFiles = async (
		cmdStrPath: string,
		details: IInstallDetails
	) => {
		const { template } = toolbox

		await template.generate({
			template: 'package.json.ejs',
			target: `${cmdStrPath}/package.json`,
			props: details
		})
	}
}

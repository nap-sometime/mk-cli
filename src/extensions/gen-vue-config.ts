import { GluegunToolbox } from 'gluegun'
import { IInstallDetails } from '../types'

module.exports = async (toolbox: GluegunToolbox) => {
	toolbox.generateVueConfig = async (
		rootDir: string,
		inputs: IInstallDetails
	) => {
		const { template } = toolbox

		await template.generate({
			template: 'vue-config.ts.ejs',
			target: `${rootDir}/vue.config.js`,
			props: {
				...inputs,
				want_https: inputs.wantHttps
			}
		})
	}
}

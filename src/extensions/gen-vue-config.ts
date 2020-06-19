import { GluegunToolbox } from 'gluegun'
import { IInstallingInputs } from '../types'

module.exports = async (toolbox: GluegunToolbox) => {
	toolbox.generateVueConfig = async (
		rootDir: string,
		inputs: IInstallingInputs
	) => {
		const { template } = toolbox

		await template.generate({
			template: 'vue-config.ts.ejs',
			target: `${rootDir}/vue.config.js`,
			props: {
				...inputs,
				want_https: inputs.yesno
			}
		})
	}
}

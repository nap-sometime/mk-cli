import { GluegunToolbox } from 'gluegun'

module.exports = async (toolbox: GluegunToolbox) => {
	toolbox.generateAppVue = async (rootDir: string) => {
		const { template } = toolbox

		await template.generate({
			template: 'app-vue.ts.ejs',
			target: `${rootDir}/src/app.vue`
		})
	}
}

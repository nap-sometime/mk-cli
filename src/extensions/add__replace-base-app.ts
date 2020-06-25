import { GluegunToolbox } from 'gluegun'

module.exports = async (toolbox: GluegunToolbox) => {
	toolbox.add_replaceBaseApp = async (
		appName: string,
		templateName: string = 'mk-base/mk-app-vue'
	) => {
		const { filesystem } = toolbox

		filesystem.copy(templateName, appName, {
			overwrite: true
		})

		filesystem.remove('mk-base')
	}
}

import { GluegunToolbox } from 'gluegun'

module.exports = async (toolbox: GluegunToolbox) => {
	toolbox.cloneBaseApp = async (baseAppUrl: string) => {
		const { system } = toolbox

		await system.spawn(`git clone ${baseAppUrl} base_app`, {
			shell: true,
			stdio: 'inherit',
			stderr: 'inherit'
		})
	}
}

import { GluegunToolbox } from 'gluegun'

module.exports = async (toolbox: GluegunToolbox) => {
	toolbox.add_cloneBaseApp = async (baseAppUrl: string) => {
		const { system } = toolbox

		await system.spawn(`git clone ${baseAppUrl} mk-base`, {
			shell: true,
			stdio: 'inherit',
			stderr: 'inherit'
		})
	}
}

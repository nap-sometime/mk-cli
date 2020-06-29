import { GluegunToolbox } from 'gluegun'

module.exports = async (toolbox: GluegunToolbox) => {
	toolbox.add_installPackage = async (cmdStrPath: string) => {
		const { system } = toolbox

		const yarnPath = system.which('yarn')

		return system.spawn(`cd ${cmdStrPath} && ${yarnPath} install`, {
			shell: true,
			stdio: 'inherit',
			stderr: 'inherit'
		})
	}
}

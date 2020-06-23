import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
	name: 'install',
	run: async toolbox => {
		const { parameters, filesystem, strings } = toolbox

		const {
			promptInstallDetails,
			generateInstallationFiles,
			installationPackage
		} = toolbox

		const firstParam = parameters.first

		const cmdStrPath = strings.isBlank(firstParam)
			? filesystem.path()
			: `${filesystem.path()}/${firstParam}`

		const details = await promptInstallDetails(firstParam)

		await generateInstallationFiles(cmdStrPath, details)

		await installationPackage(cmdStrPath)
	}
}

module.exports = command

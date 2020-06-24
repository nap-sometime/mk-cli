import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
	name: 'install',
	run: async toolbox => {
		const { parameters, filesystem, strings } = toolbox

		const {
			cloneBaseApp,
			promptInstallDetails,
			generateInstallationFiles,
			installationPackage
		} = toolbox

		const baseAppUrl = process.env.BASE_APP_URL

		if (strings.isBlank(baseAppUrl)) {
			throw new Error('BASE_APP_URL is not found.')
		}

		await cloneBaseApp(baseAppUrl)

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

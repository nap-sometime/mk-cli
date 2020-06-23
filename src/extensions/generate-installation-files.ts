import { GluegunToolbox } from 'gluegun'
import { IInstallDetails } from '../types'

module.exports = async (toolbox: GluegunToolbox) => {
	toolbox.generateInstallationFiles = async (
		cmdStrPath: string,
		details: IInstallDetails
	) => {
		const { template } = toolbox

		const files = ['package.json.ejs', 'README.md.ejs', 'vue.config.js.ejs']

		const filesCopy = files.reduce((acc, file) => {
			const target = `${cmdStrPath}/${file.replace('.ejs', '')}`

			const generate = template.generate({
				template: file,
				target,
				props: details
			})

			return acc.concat([generate])
		}, [])

		await Promise.all(filesCopy)
	}
}

import { GluegunToolbox } from 'gluegun'
import { IInstallDetails } from '../types'

module.exports = async (toolbox: GluegunToolbox) => {
	toolbox.generateInstallationFiles = async (
		cmdStrPath: string,
		details: IInstallDetails
	) => {
		const { template } = toolbox

		const files = [
			'package.json.ejs',
			'README.md.ejs',
			'vue.config.js.ejs',
			'.editorconfig.ejs',
			'.eslintignore.ejs',
			'.eslintrc.js.ejs',
			'.gitignore.ejs',
			'.prettierrc.json.ejs',
			'.tool-versions.ejs',
			'babel.config.js.ejs',
			'LICENSE.ejs',
			'tsconfig.json.ejs',
			'vue-shim.d.ts.ejs'
		]

		const removeComma = (str?: string) =>
			str ? str.replace("'", '').replace("' ", '') : str

		const filesCopy = files.reduce((acc, file) => {
			const target = `${cmdStrPath}/${file.replace('.ejs', '')}`

			const generate = template.generate({
				template: file,
				target,
				props: {
					...details,
					httpsCertPath: removeComma(details.httpsCertPath),
					httpsKeyPath: removeComma(details.httpsKeyPath),
					year: new Date().getFullYear()
				}
			})

			return acc.concat([generate])
		}, [])

		await Promise.all(filesCopy)
	}
}

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
			'vue-shim.d.ts.ejs',
			'public/favicon.ico.ejs',
			'public/index.html.ejs',
			'src/App.vue.ejs',
			'src/main.ts.ejs',
			'src/set_public_path.ts.ejs',
			'src/utils/get_env/index.ts.ejs'
		]

		if (details.vueModules.includes('vue-router')) {
			files.push('src/router.ts.ejs')
		}

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

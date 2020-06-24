import { GluegunToolbox } from 'gluegun'
import { IInstallDetails } from '../types'

module.exports = async (toolbox: GluegunToolbox) => {
	toolbox.generateInstallationFiles = async (
		cmdStrPath: string,
		details: IInstallDetails
	) => {
		const { filesystem, template } = toolbox

		filesystem.copy('mk-base/mk-app-vue', details.appName, {
			overwrite: true
		})

		filesystem.remove('mk-base')

		const files = [
			'package.json.ejs',
			'README.md.ejs',
			'vue.config.js.ejs',
			'src/App.vue.ejs',
			'src/main.ts.ejs',
			'src/set_public_path.ts.ejs'
		]

		if (details.vueModules.includes('vue-router')) {
			files.push('src/router.ts.ejs')
		} else {
			filesystem.remove(`${cmdStrPath}/src/router.ts`)
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

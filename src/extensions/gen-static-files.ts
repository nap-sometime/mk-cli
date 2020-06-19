import { GluegunToolbox } from 'gluegun'

module.exports = async (toolbox: GluegunToolbox) => {
	toolbox.generateStaticFiles = async (rootDir: string) => {
		const { template } = toolbox

		await template.generate({
			template: 'babel-config-js.ts.ejs',
			target: `${rootDir}/babel.config.js`
		})

		await template.generate({
			template: 'editorconfig.ts.ejs',
			target: `${rootDir}/.editorconfig`
		})

		await template.generate({
			template: 'eslintignore.ts.ejs',
			target: `${rootDir}/.eslintignore`
		})

		await template.generate({
			template: 'eslintrc-js.ts.ejs',
			target: `${rootDir}/.eslintrc.js`
		})

		await template.generate({
			template: 'gitignore.ts.ejs',
			target: `${rootDir}/.gitignore`
		})

		await template.generate({
			template: 'prettierrc-json.ts.ejs',
			target: `${rootDir}/.prettierrc.json`
		})

		await template.generate({
			template: 'tool-versions.ts.ejs',
			target: `${rootDir}/.tool-versions`
		})

		await template.generate({
			template: 'tsconfig-json.ts.ejs',
			target: `${rootDir}/tsconfig.json`
		})

		await template.generate({
			template: 'vue-shim.ts.ejs',
			target: `${rootDir}/vue-shim.d.ts`
		})

		await template.generate({
			template: 'vue-config.ts.ejs',
			target: `${rootDir}/vue.config.js`
		})
	}
}

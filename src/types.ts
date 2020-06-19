export interface IInstallingInputs {
	app_name: string
	app_version: string
	app_description: string
	app_author: string
	vue_modules: string[]
	yesno: boolean
	https_cert_dir?: string
	https_key_dir?: string
}

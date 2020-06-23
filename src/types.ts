export interface IInstallDetails {
	appName: string
	appVersion: string
	appDescription: string
	appAuthor: string
	vueModules: string[]
	wantHttps: boolean
	httpsCertPath?: string
	httpsKeyPath?: string
}

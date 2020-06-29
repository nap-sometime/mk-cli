export interface ICreateNewProjectDetails {
	appName: string
	appVersion: string
	appDescription: string
	appAuthor: string
	vueModules: string[]
	wantHttps: boolean
	httpsCertPath?: string
	httpsKeyPath?: string
	template?: string
}

import { system, filesystem } from 'gluegun'

const src = filesystem.path(__dirname, '..')

const cli = async cmd =>
	system.run('node ' + filesystem.path(src, 'bin', 'mk-cli') + ` ${cmd}`)

test('outputs add', async () => {
	await cli('add -y foo')

	// should return "file" if path is a file exist.
	expect(filesystem.exists('foo/package.json')).toBe('file')
	expect(filesystem.exists('foo/vue.config.js')).toBe('file')
	expect(filesystem.exists('foo/src/App.vue')).toBe('file')
	expect(filesystem.exists('foo/src/main.ts')).toBe('file')
	expect(filesystem.exists('foo/src/set_public_path.ts')).toBe('file')

	const packageJson = filesystem.read('foo/package.json')

	expect(packageJson).toContain(`"name": "foo"`)
}, 30000)

afterAll(() => {
	// cleanup after test done
	filesystem.remove('foo')
})

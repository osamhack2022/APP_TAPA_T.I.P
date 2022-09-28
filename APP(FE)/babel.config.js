const tsconfig = require('./tsconfig.json')
const rawAlias = tsconfig.compilerOptions.paths
const alias = Object.entries(rawAlias).reduce(
	(acc, [key, value]) => ({
		...acc,
		[key.replace('/*', '')]: value.map(v => v.replace('/*', '')),
	}),
	{},
)

module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./'],
					extensions: [
						'.ios.js',
						'.android.js',
						'.js',
						'.cjs',
						'.ts',
						'.tsx',
						'.json',
					],
					alias,
				},
			],
			'react-native-reanimated/plugin',
		],
	}
}

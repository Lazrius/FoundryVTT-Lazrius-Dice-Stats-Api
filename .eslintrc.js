module.exports = {
	"env": {
		"es6": true,
		"node": true,
	},
	"parser": "@typescript-eslint/parser",
	"extends": [
		"plugin:@typescript-eslint/recommended",
		"plugin:import/typescript",
	],
	"plugins": ["@typescript-eslint"],

	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module",
	},

	"rules": {
		"max-len": ["warn", { "code": 130 }],
		"comma-dangle": ["error", "always-multiline"],
		"@typescript-eslint/semi": ["error"],
		"object-curly-spacing": ["error", "always"],
		"indent": ["error", "tab", { "SwitchCase": 1 }],
	},
};

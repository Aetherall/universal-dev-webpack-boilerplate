const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const clientEntry = path.join(__dirname, '../../init/client/index.js');
const serverEntry = path.join(__dirname, '../../init/server/index.js');

const externals = fs
	.readdirSync(path.resolve(__dirname, '../../../node_modules'))
	.filter(x => !/\.bin/.test(x))
	.reduce((externals, mod) => {
		externals[mod] = `commonjs ${mod}`;
		return externals;
	}, {});

const client = {
	name: 'client',
	target: 'web',
	devtool: 'eval-source-map',
	entry: [clientEntry],
	output: {
		path: path.join(__dirname, '../dist'),
		filename: 'client.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
};

const server = {
	name: 'server',
	target: 'node',
	devtool: 'eval-source-map',
	entry: [serverEntry],
	output: {
		path: path.join(__dirname, '../dist'),
		filename: 'server.js',
		publicPath: '/',
		libraryTarget: 'commonjs2',
	},
	externals,
	module: {
		rules: [
			{
				test: /.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
};

module.exports = [client, server];

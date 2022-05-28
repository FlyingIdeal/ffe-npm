const path = require('path')

module.exports = {
	mode: 'production',
	entry: './src/index.js', // 入口
	// externals: ['lodash'], // 解决[代码3]
	output: {
		path: path.resolve(__dirname, 'dist'), // 出口地址
		filename: 'library.js', // 打包之后的名字, 最后给别人使用的文件
		library: 'library', // 解决[代码2], 直接使用js语法
		libraryTarget: 'umd' // 解决[代码1], 不同业务环境引入问题。u=Universal通用的意思
	} 
}



/*

[代码1]

import library from 'library' // ES6

const library = require('library') // commonjs语法

require(['library'], function() { // AMD

})

*/


/**

[代码2]

<script src="library.js"></script>
library.add()

*/


/**

[代码3]

externals: 解决重复打包第三方组件库问题

例如：生成的dist/library会打包lodash； 实际开发项目时也引用了，就会造成体积过大问题。

*/


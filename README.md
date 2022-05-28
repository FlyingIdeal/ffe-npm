1. webpack.config.js 文档解读

```

[代码1]

import library from 'library' // ES6

const library = require('library') // commonjs语法

require(['library'], function() { // AMD

})




[代码2]

<script src="library.js"></script>
library.add()




[代码3]

externals: 解决重复打包第三方组件库问题

例如：生成的dist/library会打包lodash； 实际开发项目时也引用了，就会造成体积过大问题。


```


2. package.json文件解读

```

1. 开发者使用你的组件，要有入口文件

"main": "./dist/library.js" // 入口文件

```

```
发布npm

npm login
useName: flyideal
psw: W0-
Email: 963161475@qq.com
npm publish
```

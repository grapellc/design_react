'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const vars = require('@grape-design/css/vars');



Object.keys(vars).forEach(k => {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: () => vars[k]
	});
});

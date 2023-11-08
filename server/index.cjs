require('ignore-styles');

require("@babel/core").transformSync("code", {
    presets: ["@babel/preset-react"],
});

require('@babel/register')({
    ignore: [/\/(build|node_modules)\//],
    presets: ['@babel/preset-env', '@babel/preset-react']
});

import('./server.js');
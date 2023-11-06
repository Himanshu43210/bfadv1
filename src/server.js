// server.js
require('@babel/register')({
    ignore: [/(node_module)/],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['babel-plugin-transform-es2015-modules-commonjs']
  });
  
  const express = require('express');
  const ReactDOMServer = require('react-dom/server');
  const React = require('react');
  const Helmet = require('react-helmet').Helmet;
  
  const MyComponent = require('./MyComponent').default; // Adjust path as needed
  
  const app = express();
  
  app.use(express.static('public')); // Serve static files
  
  app.get('*', (req, res) => {
    const reactApp = ReactDOMServer.renderToString(React.createElement(MyComponent));
    const helmetData = Helmet.renderStatic();
  
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          ${helmetData.title.toString()}
        </head>
        <body>
          <div id="root">${reactApp}</div>
          <script src="/bundle.js"></script> <!-- Adjust the script source as needed -->
        </body>
      </html>
    `);
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
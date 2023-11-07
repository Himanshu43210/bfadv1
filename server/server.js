import express from 'express';
import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App.js';

const PORT = 8080;
const app = express();
const router = express.Router();

const serverRenderer = (req, res, next) => {
    fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while reading index.html');
        }
        const html = ReactDOMServer.renderToString(<App />);
        return res.send(
            data.replace(
                '<div id="root"></div>',
                `<div id="root">${html}</div>`
            )
        );
    });
};

router.use('^/$', serverRenderer);
router.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(router);

app.listen(PORT, () => {
    console.log(`Server rendered react app running on port ${PORT} ...`);
});
import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { APP_ROUTES } from "./src/RouteJson.js";

const generateFile = async (destPath, payload) => {
    console.log('----- GENERATE FILE -----', destPath, payload);
    // await fs.mkdir(destPath, { recursive: true }).catch((error) => console.error);
    fs.writeFile(destPath, payload)
        .then(() => {
            console.log('+++ SUCCESS generateFile : destPath +++', destPath);
        })
        .catch((error) => {
            console.log('+++ FAILED generateFile : error +++', error);
        });
};


const generateOtherFiles = () => {
    // copy/replace public foldergenerateOtherFiles
    // other files from root & src folder
    // redux, utils, components(except Pages)
    const cmdCb = (error, stdout, stderr) => {
        console.log('>>> exec ===', error, stdout, stderr);
    };
    const cmd = exec('sudo apt update', cmdCb);
    cmd.on("close", (code) => {
        console.log('=== command ===',);
    });
};


const screenGenerator = (page, key) => {
    // generate page component files
    const importSecData = `
        import React from "react";
        import {Card} from "react-bootstrap";
        import RenderComponent from "../customComponents/ComponentRenderer.jsx";
    `;
    const screenFunc = `
        export default function ${key}({jsonToRender}) {
            return (
                <Card className={jsonToRender.pageClass}>
                    <RenderComponent jsonToRender={jsonToRender} />
                </Card>
            );
        }
    `;
    const screenPayload = importSecData + screenFunc;
    console.log('+++++ SCREEN PAYLOAD +++++', screenPayload);
    generateFile(page, screenPayload);
};


export const routeGenerator = () => {
    const args = process.argv;
    console.log("****** args ******", args[2]);
    // read appRoutes from ScreenJson.js
    const appRoutes = APP_ROUTES;

    const staticImports = `
        import React from "react";\n
        import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
        import { ABOUTUS_SCREEN, ACCOUNT_TABS_SCREEN, BLOG_SCREEN, CARD_DETAILS_SCREEN, HOME_SCREEN, SEARCH_RESULT, AD_MASTER_TABLE, APPROVAL_PROPERTIES, MANAGE_USER, STATS_LIST, VIEW_LISTING } from "./ScreenJson.js";
    `;
    const appFunc = `
        function App() {
            return (
                <Router>
                    <div className="App">
                        <Routes>
                            {ROUTES}
                        </Routes>
                    </div>
                </Router>
            );
        }

        export default App;
    `;

    let importSecData = "";
    let routeSecData = "";

    for (const routeKey of Object.keys(appRoutes)) {
        // append to importSecData
        importSecData += `import ${appRoutes[routeKey].key} from "./components/pages/${appRoutes[routeKey].key}.js"\n`;
        // append to routeSecData
        routeSecData += `<Route path="${routeKey}" element={<${appRoutes[routeKey].key} jsonToRender={${appRoutes[routeKey].pagePayload.key}} />} />\n`;
        // call to generate the page file
        screenGenerator(path.join(args[2], "src", "components", "pages", `${appRoutes[routeKey].key}.js`), appRoutes[routeKey].key);
    }

    // generate the App.js file
    const appPayload = staticImports + importSecData + appFunc.replace("{ROUTES}", routeSecData);
    generateFile(path.join(args[2], "src", "App.js"), appPayload);
};


routeGenerator();

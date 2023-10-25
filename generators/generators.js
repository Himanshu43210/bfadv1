import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { APP_ROUTES } from "../src/RouteJson";

export const routeGenerator = () => {
    const args = process.argv;
    console.log("****** args ******", args[2]);
    // read appRoutes from ScreenJson.js
    const appRoutes = APP_ROUTES;

    const staticImports = `
        import React from "react";\n
        import { BrowserRouter as Router, Routes, Route } from "react-router-dom";\n
        import { ABOUTUS_SCREEN, ACCOUNT_TABS_SCREEN, BLOG_SCREEN, CARD_DETAILS_SCREEN, HOME_SCREEN, SEARCH_RESULT } from "./ScreenJson";\n
        import { AD_MASTER_TABLE, APPROVAL_PROPERTIES, MANAGE_USER, STATS_LIST, VIEW_LISTING } from "./UserJson";
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

    Object.keys(appRoutes).forEach((routeKey) => {
        // append to importSecData
        importSecData += `import ${"NAME"} from "./components/pages/${"NAME"}"`;
        // append to routeSecData
        routeSecData += `<Route path=${routeKey} element={<${appRoutes[routeKey].key} jsonToRender={${appRoutes[routeKey].pageData}} />} />`;
        // call to generate the page file
        screenGenerator(path.join(args[2], "src", "components", "pages", `${appRoutes[routeKey].key}.js`), appRoutes[routeKey].key);
    });

    // generate the App.js file
    const appPayload = staticImports + importSecData + appFunc.replace("{ROUTES}", routeSecData);
    generateFile(path.join(args[2], "src", "components", "pages"), appPayload);
};


const generateFile = async (destPath, payload) => {
    await fs.mkdir(destPath, { recursive: true }).catch((err) => console.err);
    fs.writeFile(destPath, payload)
        .then(() => {
            console.log('+++ generateFile : destPath +++', destPath);
        })
        .catch((errpr) => {
            console.log('+++ generateFile : error +++', errpr);
        });
};


const screenGenerator = (page, key) => {
    // generate page component files
    const importSecData = `
        import React from "react";
        import {Card} from "react-bootstrap";
        import RenderComponent from "../customComponents/ComponentRenderer";
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
    generateFile(page, screenPayload);
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
        console.log('=== command ===', );
    });
};

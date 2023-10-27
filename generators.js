import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { APP_ROUTES, COMPONENTS, SCREEN_MAPPINGS } from "./src/RouteJson.js";
import { CONTAINER } from './src/components/utils/Const.js';

const generateFile = async (destPath, payload) => {
    console.log('----- GENERATE FILE -----', destPath);
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
    // await fs.mkdir(destPath, { recursive: true }).catch((error) => console.error);
    const cmdCb = (error, stdout, stderr) => {
        console.log('>>> exec ===', error, stdout, stderr);
    };
    const cmd = exec('sudo apt update', cmdCb);
    cmd.on("close", (code) => {
        console.log('=== command ===',);
    });
};


const generateComponents = (componentsData) => {
    const result = {
        imports: '',
        components: '',
    };

    componentsData.forEach((component) => {
        if (component.type !== CONTAINER) {
            if (!result.imports.includes(COMPONENTS[component.type].name)) {
                result.imports = result.imports + (
                    COMPONENTS[component.type].import
                        ? `${COMPONENTS[component.type].import}\n`
                        : `import ${COMPONENTS[component.type].name} from "../customComponents/${COMPONENTS[component.type].name}.jsx";\n`
                );
            }
            result.components = result.components + `
                <div className="component_wrapper ${component.className}" key="${component.name}" id="${component.id}">
                    <${COMPONENTS[component.type].name} component={${JSON.stringify(component)}} />
                </div>
            `;
        } else {
            const recRes = generateComponents(component.children);
            result.imports = result.imports + recRes.imports;
            result.components = result.components + `
                <div className="component_wrapper ${component.className}" key="${component.name}" id="${component.id}">
                    ${recRes.components}
                </div>
            `;
        }
    });

    return result;
};


// generate page component files
const screenGenerator = async (page, data) => {
    console.log('------ SCREEN GENERATOR : page ------', page);
    if (data.page) {    // copy the page data from file
        const pageData = await fs.readFile(data.page);
        generateFile(page, pageData);
    } else {    // generate page data from json
        const staticImportsData = `
            import React from "react";
            import {Card} from "react-bootstrap";
        `;
        const screenFunc = `
            export default function ${data.key}() {
                return (
                    <Card className="${SCREEN_MAPPINGS[data.screen].pageClass}">
                        {PAGE_CONTENT}
                    </Card>
                );
            }
        `;
        const { imports, components } = generateComponents(SCREEN_MAPPINGS[data.screen].children);
        const screenPayload = staticImportsData + imports + screenFunc.replace("{PAGE_CONTENT}", components);
        // console.log('+++++ SCREEN PAYLOAD +++++', screenPayload);
        generateFile(page, screenPayload);
    }
};


export const routeGenerator = () => {
    const args = process.argv;
    const appRoutes = APP_ROUTES;
    const staticImports = `
        import React from "react";
        import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
        import { 
            ABOUTUS_SCREEN, 
            ACCOUNT_TABS_SCREEN, 
            BLOG_SCREEN, 
            CARD_DETAILS_SCREEN, 
            HOME_SCREEN, 
            SEARCH_RESULT, 
            AD_MASTER_TABLE, 
            APPROVAL_PROPERTIES, 
            MANAGE_USER, 
            STATS_LIST, 
            VIEW_LISTING 
        } from "./ScreenJson.js";
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
        routeSecData += `<Route path="${routeKey}" element={<${appRoutes[routeKey].key} jsonToRender={${appRoutes[routeKey].screen}} />} />\n`;
        // call to generate the page file
        screenGenerator(path.join(args[2], "src", "components", "pages", `${appRoutes[routeKey].key}.js`), appRoutes[routeKey]);
    }
    const appPayload = staticImports + importSecData + appFunc.replace("{ROUTES}", routeSecData);
    generateFile(path.join(args[2], "src", "App.js"), appPayload);
};


routeGenerator();

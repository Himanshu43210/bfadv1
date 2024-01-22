import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { APP_ROUTES, COMPONENTS, OTHER_PAGES, PAGE_IMPORTS, SCREEN_MAPPINGS } from "./src/RouteJson.js";
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


const generateOtherFiles = async (dest, skip = []) => {
    const filterDir = (src, dest) => {
        console.log('--------- FILTER DIR --------', src);
        const found = skip?.filter(skipItem => src.includes(skipItem));
        if (found && found.length > 0) {
            return false;
        } else {
            return true;
        }
    };
    await fs.cp('./', dest, { recursive: true, filter: filterDir });
};


const generateComponents = (componentsData, prevImports) => {
    const result = {
        imports: '',
        components: '',
    };

    componentsData.forEach((component) => {
        if (component.type === CONTAINER) {
            const recRes = generateComponents(component.children, result.imports);
            result.imports = result.imports + recRes.imports;
            result.components = result.components + `
                <div className="component_wrapper ${component.className}" key="${component.name}" id="${component.id}">
                    ${recRes.components}
                </div>
            `;
        } else {
            if (!result.imports.includes(` ${COMPONENTS[component.type].name} `) && !prevImports?.includes(` ${COMPONENTS[component.type].name} `)) {
                result.imports = result.imports + (
                    COMPONENTS[component.type].import
                        ? `${COMPONENTS[component.type].import}\n`
                        : `import ${COMPONENTS[component.type].name} from "../customComponents/${COMPONENTS[component.type].name}.jsx";\n`
                );
            }
            let otherProps = ``;
            if (COMPONENTS[component.type].props) {
                Object.keys(COMPONENTS[component.type].props).forEach((propKey) => {
                    otherProps += `${propKey}={${COMPONENTS[component.type].props[propKey]}} `;
                });
            }
            result.components = result.components + `
                <div className="component_wrapper ${component.className}" key="${component.name}" id="${component.id}">
                    <${COMPONENTS[component.type].name} component={${JSON.stringify(component)}} ${otherProps} />
                </div>
            `;
        }
    });

    return result;
};


const getCodeFromFile = async (start, filePath, all) => {
    let result = '', append = false;
    const data = await fs.readFile(filePath, "utf8");
    if (all) return data;
    data.toString().split("\n").map(line => {
        if (line.includes(start)) {
            append = true;
        } else if (line.includes("return (")) {
            append = false;
            // close
        } else if (append === true) {
            result += line + '\n';
        }
    });
    return result;
};


// generate page component files
const screenGenerator = async (page, data) => {
    console.log('---------- SCREEN GENERATOR : page ----------', page);
    if (data.page) {
        // copy the page data from file
        const pageData = await fs.readFile(data.page);
        generateFile(page, pageData);
    } else {
        // generate page data from json
        if (SCREEN_MAPPINGS[data.screen]?.data) {
            const staticImportsData = PAGE_IMPORTS.common;
            const pageImportsData = PAGE_IMPORTS[data.screen] || '';
            const screenFunc = `
                export default function ${data.key}() {
                    {PAGE_DATA_FUNC}
                    return (
                        <Card className="${SCREEN_MAPPINGS[data.screen]?.data?.pageClass}">
                            {PAGE_CONTENT}
                        </Card>
                    );
                }
            `;
            const pageDataFunc = await getCodeFromFile("ComponentSelector", './src/components/customComponents/ComponentSelector.jsx');
            let pageDataFunc2 = '';
            if (SCREEN_MAPPINGS[data.screen]?.code) {
                pageDataFunc2 = await getCodeFromFile(SCREEN_MAPPINGS[data.screen]?.startBoundary, SCREEN_MAPPINGS[data.screen]?.code);
            }
            const { imports, components } = generateComponents(SCREEN_MAPPINGS[data.screen]?.data?.children);
            const screenPayload = staticImportsData + pageImportsData + imports + screenFunc.replace("{PAGE_CONTENT}", components).replace("{PAGE_DATA_FUNC}", pageDataFunc + pageDataFunc2);
            generateFile(page, screenPayload);
        } else if (SCREEN_MAPPINGS[data.screen]?.code && SCREEN_MAPPINGS[data.screen]?.all) {
            const screenPayload = await getCodeFromFile('', SCREEN_MAPPINGS[data.screen]?.code, true);
            generateFile(page, screenPayload);
        }
    }
};


export const routeGenerator = () => {
    const args = process.argv;
    const staticImports = `
        import React from "react";
        import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
        import { 
            HOME_SCREEN, 
            SEARCH_RESULT, 
            AD_MASTER_TABLE, 
            APPROVAL_PROPERTIES, 
            MANAGE_USER, 
            STATS_LIST, 
            VIEW_LISTING,
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
    // generate other files but skip the proved files or folders
    generateOtherFiles(process.argv[2], ["node_modules", "/pages/", "generators.js", "sitemap.js", ".git/"])
        .then(() => {
            console.log('========== OTHER FILES GENERATED ==========');
            // install dependencies at the specified location
            exec("npm i --legacy-peer-deps", { cwd: process.argv[2] }, (error, stdout, stderr) => {
                if (error) {
                    console.log(`>>> COMMAND RUN ERROR : ${error.message} <<<`);
                    return;
                }
                if (stderr) {
                    console.log(`>>> STDERR : ${stderr} <<<`);
                    return;
                }
                console.log(`>>> STDOUT : ${stdout} <<<`);
            });
            for (const routeKey of Object.keys(APP_ROUTES)) {
                // append to importSecData
                importSecData += `import ${APP_ROUTES[routeKey].key} from "./components/pages/${APP_ROUTES[routeKey].key}.js"\n`;
                // append to routeSecData
                routeSecData += `<Route path="${routeKey}" element={<${APP_ROUTES[routeKey].key} jsonToRender={${APP_ROUTES[routeKey].screen}} />} />\n`;
                // call to generate the page file
                screenGenerator(path.join(args[2], "src", "components", "pages", `${APP_ROUTES[routeKey].key}.js`), APP_ROUTES[routeKey]);
            }
            for (const pageKey of Object.keys(OTHER_PAGES)) {
                screenGenerator(path.join(args[2], "src", "components", "pages", `${OTHER_PAGES[pageKey].key}.js`), OTHER_PAGES[pageKey]);
            }
            const appPayload = staticImports + importSecData + appFunc.replace("{ROUTES}", routeSecData);
            generateFile(path.join(args[2], "src", "App.js"), appPayload);
        });
};


routeGenerator();

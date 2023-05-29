#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const axios_1 = __importDefault(require("axios"));
const commander_1 = require("commander");
const generate_1 = require("./generate");
const PLUGINS_DIR = "plugins";
const PAYLOADS_DIR = "payloads";
const schemaTypes = [PLUGINS_DIR, PAYLOADS_DIR];
function fetchLocalSchemas(schemaPath) {
    let schemas = [];
    const fullSchemaPath = path.join(schemaPath);
    if (!fs_extra_1.default.existsSync(fullSchemaPath)) {
        console.error(`Error: Directory does not exist: ${fullSchemaPath}`);
        process.exit(1);
    }
    const files = fs_extra_1.default.readdirSync(fullSchemaPath);
    files.forEach((filename) => {
        const filePath = path.join(path.join(schemaPath), filename);
        const schemaContent = fs_extra_1.default.readFileSync(filePath, "utf8");
        const schemaObject = js_yaml_1.default.load(schemaContent);
        schemas.push(schemaObject);
    });
    return schemas;
}
async function fetchWebSchemas(schemaPath) {
    let schemas = [];
    try {
        const response = await axios_1.default.get(schemaPath.toString());
        const schemaContent = response.data;
        const schemaObject = js_yaml_1.default.load(schemaContent);
        schemas.push(schemaObject);
    }
    catch (error) {
        console.error(`Error: Failed to fetch schema from GitHub: ${error.message}`);
        process.exit(1);
    }
    return schemas;
}
function processSchemaFiles(schemas, outputPath) {
    let plugins = [];
    let paylods = [];
    schemas.forEach((schemaObject) => {
        // Process plugins
        if (schemaObject.plugin) {
            plugins = (0, generate_1.generatePluginInstanceObjects)(schemaObject.plugin);
        }
        // Process payloads
        if (schemaObject.payload) {
            paylods = (0, generate_1.generatePluginPayloadObjects)(schemaObject.payload);
        }
        const mergedArray = [...plugins, ...paylods];
        writeDomainObjectsToFile(mergedArray, outputPath);
    });
}
function writeDomainObjectsToFile(domainObjects, outputPath) {
    fs_extra_1.default.ensureDirSync(outputPath);
    if (domainObjects.length > 0) {
        const output = path.join(outputPath, `${toFileName(domainObjects[0].name)}.ts`);
        let code = `${generate_1.CLASS_DECORATORS_IMPORT}`;
        const reversedDomainObjects = domainObjects.slice().reverse();
        reversedDomainObjects.forEach((object) => {
            code = code + object.code + '\n';
        });
        fs_extra_1.default.writeFileSync(output, code, "utf8");
        console.log("Generated class written to", outputPath, "\n");
    }
}
function toFileName(input) {
    const result = input
        .replace(/([a-z])([A-Z])/g, '$1.$2') // Split camel case
        .replace(/([A-Z])([A-Z][a-z])/g, '$1.$2') // Split consecutive uppercase letters
        .replace(/([a-zA-Z])(\d+)/g, '$1.$2') // Insert dot before letters followed by a number
        .replace(/(\d+)([a-zA-Z])/g, '$1.$2') // Insert dot after numbers followed by a letter
        .toLowerCase(); // Convert to lowercase
    return result;
}
async function generate(schemasPath, outputPath, url) {
    try {
        let schemaObject;
        if (url) {
            schemaObject = await fetchWebSchemas(url);
            processSchemaFiles(schemaObject, outputPath);
        }
        else {
            const schemaFiles = fetchLocalSchemas(schemasPath);
            processSchemaFiles(schemaFiles, outputPath);
        }
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
const program = new commander_1.Command();
program
    .command('generate')
    .description('Generate domain objects')
    .option('--schemas <path>', 'Path to schemas')
    .option('--output <path>', 'Output path')
    .option('--url <url>', 'URL to fetch schemas from')
    .action((cmdObj) => {
    const schemas = cmdObj.schemas;
    const output = cmdObj.output;
    const url = cmdObj.url;
    generate(schemas, output, url);
});
program.parse(process.argv);

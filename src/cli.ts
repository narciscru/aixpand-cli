#!/usr/bin/env node

import * as path from "path";
import fs from "fs-extra";
import yaml from "js-yaml";
import axios from "axios";
import { Command } from 'commander';
import { CLASS_DECORATORS_IMPORT, generatePluginInstanceObjects, generatePluginPayloadObjects } from "./generate";

const PLUGINS_DIR = "plugins";
const PAYLOADS_DIR = "payloads";
const schemaTypes = [PLUGINS_DIR, PAYLOADS_DIR];

function fetchLocalSchemas(schemaPath: string) {
  let schemas: any[] = [];
  const fullSchemaPath = path.join(schemaPath);

  if (!fs.existsSync(fullSchemaPath)) {
    console.error(`Error: Directory does not exist: ${fullSchemaPath}`);
    process.exit(1);
  }

  const files = fs.readdirSync(fullSchemaPath);
  files.forEach((filename) => {
    const filePath = path.join(path.join(schemaPath), filename);
    const schemaContent = fs.readFileSync(filePath, "utf8");
    const schemaObject: any = yaml.load(schemaContent);
    schemas.push(schemaObject);
  });

  return schemas;
}

async function fetchWebSchemas(schemaPath: string) {
  let schemas: any[] = [];
  try {
    const response = await axios.get(schemaPath.toString());
    const schemaContent = response.data;
    const schemaObject: any = yaml.load(schemaContent);
    schemas.push(schemaObject);
  } catch (error: any) {
    console.error(`Error: Failed to fetch schema from GitHub: ${error.message}`);
    process.exit(1);
  }

  return schemas;
}

function processSchemaFiles(schemas: any[], outputPath: string) {
  let plugins: any[] = [];
  let paylods: any[] = [];
  schemas.forEach((schemaObject ) => {
    // Process plugins
    if (schemaObject.plugin) {
      plugins = generatePluginInstanceObjects(schemaObject.plugin);
    }

    // Process payloads
    if (schemaObject.payload) {
      paylods = generatePluginPayloadObjects(schemaObject.payload);
    }

    const mergedArray = [...plugins, ...paylods];

    writeDomainObjectsToFile(mergedArray, outputPath);
  });

}

function writeDomainObjectsToFile(domainObjects: any[], outputPath: string) {
  fs.ensureDirSync(outputPath); 

  if(domainObjects.length > 0){
    const output = path.join(outputPath, `${toFileName(domainObjects[0].name)}.ts`);
    let code: string = `${CLASS_DECORATORS_IMPORT}`;

    const reversedDomainObjects = domainObjects.slice().reverse();
    reversedDomainObjects.forEach((object: any) => {
      code = code + object.code + '\n';
    });

    fs.writeFileSync(output, code, "utf8");
    console.log("Generated class written to", outputPath, "\n");
  }
}


function toFileName(input: string): string {
  const result = input
    .replace(/([a-z])([A-Z])/g, '$1.$2') // Split camel case
    .replace(/([A-Z])([A-Z][a-z])/g, '$1.$2') // Split consecutive uppercase letters
    .replace(/([a-zA-Z])(\d+)/g, '$1.$2') // Insert dot before letters followed by a number
    .replace(/(\d+)([a-zA-Z])/g, '$1.$2') // Insert dot after numbers followed by a letter
    .toLowerCase(); // Convert to lowercase

  return result;
}

async function generate(schemasPath: string, outputPath: string, url: string) {
  try {
    let schemaObject;
    if (url) {
      schemaObject = await fetchWebSchemas(url);
      processSchemaFiles(schemaObject, outputPath);
    } else {
      const schemaFiles = fetchLocalSchemas(schemasPath);
      processSchemaFiles(schemaFiles, outputPath);
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

const program = new Command();
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

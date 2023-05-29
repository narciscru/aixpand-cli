import * as yaml from "js-yaml";
import { readFileSync } from "fs";



class SchemaClass {
  name: string;
  code: string;
  signature: string;

  constructor(name: string, code: string, signature: string) {
    this.name = name;
    this.code = code;
    this.signature = signature;
  }
}

const CLASS_PREFIX = 'export class';
const CLASS_PART_DECORATOR = '@Embedable';

const PLUGIN_CLASS_NAME_SUFFIX = 'Plugin';
const PLUGIN_CLASS_NAME_PART_SUFFIX = 'PluginPart';
const PLUGIN_CLASS_DECORATOR = '@PluginInstance';

const PAYLOAD_CLASS_NAME_SUFFIX = 'Payload';
const PAYLOAD_CLASS_NAME_PART_SUFFIX = 'PayloadPart';
const PAYLOAD_CLASS_DECORATOR = '@PluginPayload';
export const CLASS_DECORATORS_IMPORT = `import { PluginInstance, PluginPayload, Embedable, Embedded, Bind } from '@aixpand/client';\n\n`;

export function toClassName(str: string): string {
  if (/^[A-Z][A-Z0-9]*$/.test(str)) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  if (/^[A-Z][a-zA-Z0-9]*$/.test(str)) {
    return str;
  }

  const name = str.toLowerCase().replace(/_(\w)/g, (_, c) => c.toUpperCase());
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function toPropertyName(str: string): string {
  if (!str.includes("_")) {
    const name = str.replace(/[A-Z]/g, (c) => c.toLowerCase());
    return name.charAt(0).toLowerCase() + name.slice(1);
  }

  const name = str.toLowerCase().replace(/_(\w)/g, (_, c) => c.toUpperCase());
  return name.charAt(0).toLowerCase() + name.slice(1);
}

export function parseYamlSchema(schemaPath: string): any {
  const schema = yaml.load(readFileSync(schemaPath, "utf8"));
  return schema;
}

export function generatePluginInstanceObjects(schema: any): SchemaClass[] {
  const signature = Object.keys(schema)[0];
  const classes: SchemaClass[] = [];
  classes.push(
    new SchemaClass(
      `${toClassName(signature)}${PLUGIN_CLASS_NAME_SUFFIX}`, 
      getInstanceConfigFromSchema(schema), 
      signature
    )
  );
  const parts = getPartsFromSchema(schema[signature], signature, PLUGIN_CLASS_NAME_PART_SUFFIX);
  parts.forEach(element => {
    classes.push(element);
  });

  return classes;
}

export function generatePluginPayloadObjects(schema: any): SchemaClass[] {
  const signature = Object.keys(schema)[0];
  const classes: SchemaClass[] = [];
  classes.push(
    new SchemaClass(
      `${toClassName(signature)}${PAYLOAD_CLASS_NAME_SUFFIX}`,
      getPayloadFromSchema(schema), 
      signature
    )
  );
  const parts = getPartsFromSchema(schema[signature], signature, PAYLOAD_CLASS_NAME_PART_SUFFIX);
  parts.forEach(element => {
    classes.push(element);
  });

  return classes;
}

function getInstanceConfigFromSchema(schema: any): string {
  const signature = Object.keys(schema)[0];
  const decorator: string = `${PLUGIN_CLASS_DECORATOR}('${signature}')`;
  const properties = getSchemaObjectProperties(schema[signature], PLUGIN_CLASS_NAME_PART_SUFFIX);
  return `${decorator}\n${CLASS_PREFIX} ${toClassName(signature)}${PLUGIN_CLASS_NAME_SUFFIX} {\n${properties};\n}\n`;

}
function getPayloadFromSchema(schema: any): string {
  const signature = Object.keys(schema)[0];
  const decorator: string = `${PAYLOAD_CLASS_DECORATOR}('${signature}')`;
  const properties = getSchemaObjectProperties(schema[signature], PAYLOAD_CLASS_NAME_PART_SUFFIX);
  return `${decorator}\n${CLASS_PREFIX} ${toClassName(signature)}${PAYLOAD_CLASS_NAME_SUFFIX} {\n${properties};\n}\n`;

}

function getPartsFromSchema(schema: any, signature: string, suffix: string): SchemaClass[] {
  const parts: any[] = [];
  if(schema.properties) {
    Object.keys(schema.properties).forEach(key => {
      if(
        schema.properties[key].type == 'object'
      ){
        const decorator: string = `${CLASS_PART_DECORATOR}(['${signature}'])`;
        const properties = getSchemaObjectProperties(schema.properties[key], suffix);

        parts.push(
          new SchemaClass(
            `${toClassName(key)}${suffix}`, 
            `${decorator}\n${CLASS_PREFIX} ${toClassName(key)}${suffix} {\n${properties};\n}\n`,
            signature
          )
        );
        let subParts = [];
       
        subParts = getPartsFromSchema(schema.properties[key], signature, suffix);
        subParts.forEach(element => {
          parts.push(element);
        });
      }

      if(
        (schema.properties[key].type == 'array' && schema.properties[key].items.type == 'object')
      ){
        const decorator: string = `${CLASS_PART_DECORATOR}(['${signature}'])`;
        const properties = getSchemaObjectProperties(schema.properties[key].items, suffix);

        parts.push(
          new SchemaClass(
            `${toClassName(key)}${suffix}`, 
            `${decorator}\n${CLASS_PREFIX} ${toClassName(key)}${suffix} {\n${properties};\n}\n`,
            signature
          )
        );
        let subParts = [];
        subParts = getPartsFromSchema(schema.properties[key].items, signature, suffix);
       
        subParts.forEach(element => {
          parts.push(element);
        });
      }
    });
  }  
  return parts;
}

function getSchemaObjectProperties(schema: any, suffix: string): string {
  if(schema.properties){
    return Object.entries(schema.properties)
      .map(([key, keySchema]) => getPropertyFromSchema(keySchema, key, suffix))
      .join(`;\n\n`);
  }
  return '';
}

export function getPropertyFromSchema(
  schema: any,
  key: string,
  suffix: string,
  isArray: boolean = false,
  nullable: boolean = false
): string {
  const nullableTrueOption: string = `nullable: true`;
  const isArrayOption: string = `isArray: true`;
  let options = ``;

  if(!isArray && schema.nullable){
    options = `, { ${nullableTrueOption} }`;
  }

  if(isArray && !schema.nullable){
    options = `, { ${isArrayOption} }`;
  }

  if(isArray && schema.nullable){
    options = `, { ${nullableTrueOption}, ${isArrayOption} }`;
  }

  if(isArray && nullable){
    options = `, { ${nullableTrueOption}, ${isArrayOption} }`;
  }

  switch (schema.type) {
    case "object":
      if(schema.nullable){
        options = `, { ${nullableTrueOption} }`;
      }
      return `  @Embedded(${toClassName(key)}${suffix}, '${key}'${options})\n  ${toPropertyName(key)}: ${toClassName(key)}${suffix}`;
    case "array":
      if (schema.items && schema.items.type) {
        return `${getPropertyFromSchema(schema.items, key, suffix, true, schema.nullable)}[]`;
      }
      return `: any[]`;
    case "integer":
    case "number":
      const defaultNumber = schema.default ? ` = ${schema.default}`: ``;
      return `  @Bind('${key}'${options})\n  ${toPropertyName(key)}: number${defaultNumber}`;
    case "string":
      const defaultString = schema.default ? ` = '${schema.default}'`: ``;
      return `  @Bind('${key}'${options})\n  ${toPropertyName(key)}: string${defaultString}`;
    case "boolean":
      const defaultBool = schema.default ? ` = ${schema.default}`: ``;
      return `  @Bind('${key}'${options})\n  ${toPropertyName(key)}: boolean${defaultBool}`;
    default:
      return ``; 
  }
}

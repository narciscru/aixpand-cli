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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropertyFromSchema = exports.getSchemaObjectProperties = exports.generatePluginPayloadObjects = exports.generatePluginInstanceObjects = exports.parseYamlSchema = exports.toClassName = exports.CLASS_DECORATORS_IMPORT = void 0;
const yaml = __importStar(require("js-yaml"));
const fs_1 = require("fs");
class SchemaClass {
    constructor(name, code, signature) {
        this.name = name;
        this.code = code;
        this.signature = signature;
    }
}
const CLASS_PREFIX = "export class";
const CLASS_PART_DECORATOR = "@Embedable";
const PLUGIN_CLASS_NAME_SUFFIX = "Plugin";
const PLUGIN_CLASS_NAME_PART_SUFFIX = "Part";
const PLUGIN_CLASS_DECORATOR = "@PluginInstance";
const PAYLOAD_CLASS_NAME_SUFFIX = "Payload";
const PAYLOAD_CLASS_NAME_PART_SUFFIX = "Part";
const PAYLOAD_CLASS_DECORATOR = "@PluginPayload";
exports.CLASS_DECORATORS_IMPORT = `import { PluginInstance, PluginPayload, Embedable, Embedded, Bind } from '@aixpand/client';\n\n`;
function toClassName(str) {
    if (/^[A-Z][A-Z0-9]*$/.test(str)) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    if (/^[A-Z][a-zA-Z0-9]*$/.test(str)) {
        return str;
    }
    const name = str.toLowerCase().replace(/_(\w)/g, (_, c) => c.toUpperCase());
    return name.charAt(0).toUpperCase() + name.slice(1);
}
exports.toClassName = toClassName;
function toPropertyName(str) {
    if (!str.includes("_")) {
        const name = str.replace(/[A-Z]/g, (c) => c.toLowerCase());
        return name.charAt(0).toLowerCase() + name.slice(1);
    }
    const name = str.toLowerCase().replace(/_(\w)/g, (_, c) => c.toUpperCase());
    return name.charAt(0).toLowerCase() + name.slice(1);
}
function parseYamlSchema(schemaPath) {
    const schema = yaml.load((0, fs_1.readFileSync)(schemaPath, "utf8"));
    return schema;
}
exports.parseYamlSchema = parseYamlSchema;
function generatePluginInstanceObjects(schema) {
    const signature = Object.keys(schema)[0];
    const classes = [];
    classes.push(new SchemaClass(`${toClassName(signature)}${PLUGIN_CLASS_NAME_SUFFIX}`, getInstanceConfigFromSchema(schema), signature));
    const parts = getPartsFromSchema(schema[signature], signature, PLUGIN_CLASS_NAME_PART_SUFFIX);
    parts.forEach((element) => {
        classes.push(element);
    });
    return classes;
}
exports.generatePluginInstanceObjects = generatePluginInstanceObjects;
function generatePluginPayloadObjects(schema) {
    const signature = Object.keys(schema)[0];
    const classes = [];
    classes.push(new SchemaClass(`${toClassName(signature)}${PAYLOAD_CLASS_NAME_SUFFIX}`, getPayloadFromSchema(schema), signature));
    const parts = getPartsFromSchema(schema[signature], signature, PAYLOAD_CLASS_NAME_PART_SUFFIX);
    parts.forEach((element) => {
        classes.push(element);
    });
    return classes;
}
exports.generatePluginPayloadObjects = generatePluginPayloadObjects;
function getInstanceConfigFromSchema(schema) {
    const signature = Object.keys(schema)[0];
    const decorator = `${PLUGIN_CLASS_DECORATOR}('${signature}')`;
    const properties = getSchemaObjectProperties(schema[signature]);
    return `${decorator}\n${CLASS_PREFIX} ${toClassName(signature)}${PLUGIN_CLASS_NAME_SUFFIX} {\n${properties};\n}\n`;
}
function getPayloadFromSchema(schema) {
    const signature = Object.keys(schema)[0];
    const decorator = `${PAYLOAD_CLASS_DECORATOR}('${signature}')`;
    const properties = getSchemaObjectProperties(schema[signature]);
    return `${decorator}\n${CLASS_PREFIX} ${toClassName(signature)}${PAYLOAD_CLASS_NAME_SUFFIX} {\n${properties};\n}\n`;
}
function getPartsFromSchema(schema, signature, suffix) {
    const parts = [];
    if (schema.properties) {
        Object.keys(schema.properties).forEach((key) => {
            if (schema.properties[key].type == "object") {
                const decorator = `${CLASS_PART_DECORATOR}(['${signature}'])`;
                const properties = getSchemaObjectProperties(schema.properties[key]);
                parts.push(new SchemaClass(`${toClassName(key)}${suffix}`, `${decorator}\n${CLASS_PREFIX} ${toClassName(key)}${suffix} {\n${properties};\n}\n`, signature));
                let subParts = [];
                subParts = getPartsFromSchema(schema.properties[key], signature, suffix);
                subParts.forEach((element) => {
                    parts.push(element);
                });
            }
            if (schema.properties[key].type == "array" &&
                schema.properties[key].items.type == "object") {
                const decorator = `${CLASS_PART_DECORATOR}(['${signature}'])`;
                const properties = getSchemaObjectProperties(schema.properties[key].items);
                parts.push(new SchemaClass(`${toClassName(key)}${suffix}`, `${decorator}\n${CLASS_PREFIX} ${toClassName(key)}${suffix} {\n${properties};\n}\n`, signature));
                let subParts = [];
                subParts = getPartsFromSchema(schema.properties[key].items, signature, suffix);
                subParts.forEach((element) => {
                    parts.push(element);
                });
            }
        });
    }
    return parts;
}
// function getSchemaObjectProperties(schema: any, suffix: string): string {
//   if (schema.properties) {
//     return Object.entries(schema.properties)
//       .map(([key, keySchema]) => getPropertyFromSchema(keySchema, key, suffix))
//       .join(`;\n\n`);
//   }
//   return "";
// }
function getSchemaObjectProperties(schema) {
    const properties = Object.entries(schema.properties)
        .map(([key, keySchema]) => parseKeySchema(key, keySchema));
    return buildClassProperties(properties);
    return properties;
}
exports.getSchemaObjectProperties = getSchemaObjectProperties;
function buildClassProperties(metadata) {
    let result = '';
    const formatObject = (obj) => {
        let formatted = '{ ';
        for (const key in obj) {
            if (obj[key] !== undefined) {
                if (Array.isArray(obj[key])) {
                    formatted += `${key}: [${obj[key].map((v) => typeof v === 'string' ? `"${v}"` : v).join(', ')}], `;
                }
                else if (typeof obj[key] === 'string') {
                    formatted += `${key}: "${obj[key]}", `;
                }
                else {
                    formatted += `${key}: ${obj[key]}, `;
                }
            }
        }
        formatted = formatted.slice(0, -2); // remove the last comma and space
        formatted += ' }';
        return formatted;
    };
    for (const item of metadata) {
        let annotation = '';
        if (item.annotation) {
            const params = item.annotation.decoratorParameters.map((param, index) => {
                if (typeof param === 'object') {
                    return formatObject(param);
                }
                // for Embedded decorator, use the first parameter without quotes
                if (item.annotation.decoratorName === 'Embedded' && index === 0) {
                    return param;
                }
                return `"${param}"`;
            }).join(', ');
            annotation = `@${item.annotation.decoratorName}(${params})\n    `;
        }
        result += `${annotation}${item.name}: ${item.type};\n`;
    }
    return result;
}
function getPropertyFromSchema(schema, key, suffix, isArray = false, nullable = false) {
    const nullableTrueOption = `nullable: true`;
    const isArrayOption = `isArray: true`;
    let options = ``;
    if (!isArray && schema.nullable) {
        options = `, { ${nullableTrueOption} }`;
    }
    if (isArray && !schema.nullable) {
        options = `, { ${isArrayOption} }`;
    }
    if (isArray && schema.nullable) {
        options = `, { ${nullableTrueOption}, ${isArrayOption} }`;
    }
    if (isArray && nullable) {
        options = `, { ${nullableTrueOption}, ${isArrayOption} }`;
    }
    switch (schema.type) {
        case "object":
            if (schema.nullable) {
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
            const defaultNumber = schema.default ? ` = ${schema.default}` : ``;
            return `  @Bind('${key}'${options})\n  ${toPropertyName(key)}: number${defaultNumber}`;
        case "string":
            const defaultString = schema.default ? ` = '${schema.default}'` : ``;
            return `  @Bind('${key}'${options})\n  ${toPropertyName(key)}: string${defaultString}`;
        case "boolean":
            const defaultBool = schema.default ? ` = ${schema.default}` : ``;
            return `  @Bind('${key}'${options})\n  ${toPropertyName(key)}: boolean${defaultBool}`;
        default:
            return ``;
    }
}
exports.getPropertyFromSchema = getPropertyFromSchema;
function mapYamlTypeToTsType(keySchema, key) {
    switch (keySchema.type) {
        case "integer":
        case "number":
            return "number";
        case "boolean":
            return "boolean";
        case "string":
            return "string";
        case "array":
            return "[]";
        case "object":
            return `${toClassName(key)}Part`;
        default:
            return "";
    }
}
function parseKeySchema(key, schema) {
    const options = {
        isArray: schema.type == "array" ? true : false,
        nullable: schema.nullable ? true : false,
        allowed: schema.allowed,
        default: schema.default,
    };
    let parsedProperty = {
        name: toPropertyName(key),
        type: mapYamlTypeToTsType(schema, key),
        annotation: {
            decoratorName: computePropertyDecoratorName(schema),
            decoratorParameters: computePropertyDecoratorParameters(schema, key, options),
        },
    };
    return parsedProperty;
}
function computePropertyDecoratorName(schema) {
    switch (schema.type) {
        case "string":
        case "number":
        case "integer":
        case "boolean":
            return "Bind";
        case "array":
            if (schema.items && typeof schema.items === "object") {
                return "Embedded";
            }
            return "Bind";
        case "object":
            return "Embedded";
    }
    return "";
}
function computePropertyDecoratorParameters(schema, key, options) {
    switch (schema.type) {
        case "string":
        case "number":
        case "integer":
        case "boolean":
            return [key, options];
        case "array":
            if (schema.items && typeof schema.items === "object") {
                return [toClassName(key), key, options];
            }
            return [key];
        case "object":
            return [toClassName(key), key, options];
    }
    return [];
}

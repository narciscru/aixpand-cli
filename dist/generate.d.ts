declare class SchemaClass {
    name: string;
    code: string;
    signature: string;
    constructor(name: string, code: string, signature: string);
}
export declare const CLASS_DECORATORS_IMPORT = "import { PluginInstance, PluginPayload, Embedable, Embedded, Bind } from '@aixpand/client';\n\n";
export declare function toClassName(str: string): string;
export declare function parseYamlSchema(schemaPath: string): any;
export declare function generatePluginInstanceObjects(schema: any): SchemaClass[];
export declare function generatePluginPayloadObjects(schema: any): SchemaClass[];
export declare function getSchemaObjectProperties(schema: any): string | any[];
export declare function getPropertyFromSchema(schema: any, key: string, suffix: string, isArray?: boolean, nullable?: boolean): string;
export {};

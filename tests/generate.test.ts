import {
  generatePluginInstanceObjects,
  generatePluginPayloadObjects,
  getSchemaObjectProperties,
  parseYamlSchema,
} from "../src/generate";
import { readFileSync } from "fs";
import * as yaml from "js-yaml";

const schemaPath = "./tests/schemas/plugin1.yaml";

// Helper function to read a schema file
function readSchemaFile(path: string): any {
  return yaml.load(readFileSync(path, "utf8"));
}

test("parseYamlSchema should parse a YAML schema correctly", () => {
  const schema = readSchemaFile(schemaPath);
  const parsedSchema = parseYamlSchema(schemaPath);

  expect(parsedSchema).toEqual(schema);
});

test("generatePluginInstanceConfigs should generate domain objects correctly", () => {
  const schema = readSchemaFile(schemaPath);

  const generatedDomainObjects = generatePluginInstanceObjects(schema);
  expect(generatedDomainObjects.length).toEqual(1);
});


test("getSchemaObjectProperties should generate domain objects correctly", () => {
  const schema = readSchemaFile(schemaPath);
  const signature = Object.keys(schema.plugin)[0];

  const generatedDomainObjects = getSchemaObjectProperties(schema['plugin'][signature]);
  expect(generatedDomainObjects).toEqual(1);
});





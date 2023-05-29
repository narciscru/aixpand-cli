# aixp-cg

``aixp-cg`` is a code generation tool for generating TypeScript serialization and deserialization code from a YAML schema file. It provides a command-line interface for generating code from the schema file and outputting it to a destination directory as class files.

# Installation
You can install aixp-cg using npm:
```
$ npm i -g @aixpand/cli
```
# Usage
To generate TypeScript code from a YAML schema file, use the aixp-cg command:
```
aixpand generate --schemas ./tests/schemas --output ./tests/output

```
or
```
aixpand:generate --url https://raw.githubusercontent.com/narciscru/aixpand-schemas/main/schemas/plugin3.yaml  --output ./src/domain

```

This command reads the schema.yaml file, generates TypeScript code for serializing and deserializing data according to the schema, and outputs the generated code to the output.ts file.

# Configuration
aixp-cg can be configured using a JSON configuration file named ``aixp-cg.config.json``. This file can be placed in the root directory of your project, and it should contain a JSON object with the following properties:

- ``schemaPath``: The path to the input schema file. This can be either an absolute or relative path.

- ``outputPath``: The path to the output file or directory. If this is a directory, aixp-cg generates separate files for each schema in the directory.


Here is an example ``aixp-cg.config.json`` file:

```
{
  "input": "schema.yaml",
  "output": "src/serialization",
  "options": {
    "camelCase": true
  }
}
```
To use the configuration file, simply run the ``aixp-cg`` command without any options:

```
npx aixp-cg
```
This command reads the ``aixp-cg.config.json`` file, generates code according to the specified configuration, and outputs the generated code to the configured output file or directory.

# Contributing
Contributions are welcome! If you find a bug or would like to suggest an improvement, please create an issue or submit a pull request.

# License
``aixp-cg`` is licensed under the ``MIT`` License.





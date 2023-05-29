# aixpan cli

``@aixpand/cli`` is a code generation tool for generating TypeScript serialization and deserialization code from a YAML schema file. It provides a command-line interface for generating code from the schema file and outputting it to a destination directory as class files.

# Installation
You can install ``aixpand cli`` using npm:
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
aixpand generate --url https://raw.githubusercontent.com/narciscru/aixpand-schemas/main/schemas/plugin3.yaml  --output ./src/domain

```

This command reads the schema.yaml file, generates TypeScript code for serializing and deserializing data according to the schema, and outputs the generated code to the output.ts file.

# Contributing
Contributions are welcome! If you find a bug or would like to suggest an improvement, please create an issue or submit a pull request.

# License
``@aixpand/cli`` is licensed under the ``MIT`` License.





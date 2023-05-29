import * as fs from 'fs';
import * as path from 'path';

function createConfigFile() {
  const configFilePath = path.join(process.cwd(), 'aixp-cg.config.json');

  if (fs.existsSync(configFilePath)) {
    console.log(`Configuration file already exists at ${configFilePath}`);
    return;
  }

  const configTemplate = {
    schema: 'path/to/schema.yml',
    output: 'path/to/output/directory',
  };

  fs.writeFileSync(configFilePath, JSON.stringify(configTemplate, null, 2), 'utf8');
  console.log(`Created configuration file at ${configFilePath}`);
}

createConfigFile();

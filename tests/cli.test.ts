import { expect } from 'chai';
import { spawnSync } from 'child_process';

describe('CLI command', () => {
  test('aixpand:generate command local schemas', () => {
    // Run the CLI command
    const { stdout, stderr, status } = spawnSync('aixpand', ['generate', '--schemas', './tests/schemas', '--output', './tests/output/local']);

    // Check the status code
    expect(status).to.equal(0); 

    // Check the output
    expect(stderr.toString()).to.equal('');
    expect(stdout.toString()).to.contain('Generated class written to'); 
  });

  // test('aixpand:generate command web schemas', () => {
  //   // Run the CLI command
  //   const { stdout, stderr, status } = spawnSync('aixpand', ['generate', '--url', 'https://raw.githubusercontent.com/narciscru/aixpand-schemas/main/schemas/plugin3.yaml', '--output', './tests/output/web']);

  //   // Check the status code
  //   expect(status).to.equal(0); 

  //   // Check the output
  //   expect(stderr.toString()).to.equal('');
  //   expect(stdout.toString()).to.contain('Generated class written to'); 
  // });
});

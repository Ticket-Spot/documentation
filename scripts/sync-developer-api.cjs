const fs = require('node:fs');
const path = require('node:path');

const args = process.argv.slice(2);
const sourceIndex = args.indexOf('--server');
const server = sourceIndex >= 0 ? args[sourceIndex + 1] : path.resolve(__dirname, '../../../eventviewer/wix-eventviewer-server');
if (!server) throw new Error('Provide the server repository path with --server.');
const YAML = require(require.resolve('yamljs', { paths: [server] }));
const source = path.join(server, 'routes/api/v2/swagger/openapi.yaml');
const spec = YAML.load(source);
// Mintlify needs an absolute server URL because its docs run on a separate host.
spec.servers = [{ url: 'https://ticketspotapp.com/api/api/v2', description: 'Production API' }];
const output = `${JSON.stringify(spec, null, 2)}\n`;
const target = path.resolve(__dirname, '../api-reference/openapi.json');
if (args.includes('--check')) {
  if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== output) throw new Error('Developer API reference is out of sync. Run scripts/sync-developer-api.cjs.');
  console.log('Developer API contract matches the server.');
} else {
  fs.writeFileSync(target, output);
  console.log('Updated api-reference/openapi.json from the server contract.');
}

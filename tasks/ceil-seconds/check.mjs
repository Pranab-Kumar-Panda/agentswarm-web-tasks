import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
assert.equal(process.argv.length,4);assert.equal(process.argv[2],'--solution');
const result=spawnSync(process.execPath,['--experimental-strip-types',fileURLToPath(new URL('./worker.mjs',import.meta.url)),resolve(process.argv[3])],{timeout:5000,maxBuffer:1024*1024,encoding:'utf8'});
process.stdout.write(result.stdout||'');process.stderr.write(result.stderr||'');
if(result.error)console.error(result.error.message);
process.exitCode=result.status===0&&!result.error?0:1;

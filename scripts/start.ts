async function main() {
  const PERMISSIONS = ['--allow-sys', '--allow-env', '--allow-read', '--allow-write', '--allow-run', '--allow-net=github.com,api.github.com,remotive.io'];
  const process = Deno.run({
    cmd: ['deno', 'run', ...PERMISSIONS, 'src/main.ts'],
    stdin: 'inherit',
    stdout: 'inherit',
  });

  await process.status();
}

main();

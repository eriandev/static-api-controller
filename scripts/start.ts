async function main() {
  const PERMISSIONS = [
    '--allow-sys',
    '--allow-env',
    '--allow-read',
    '--allow-write',
    '--allow-run',
    '--allow-net=github.com,api.github.com,remotive.io',
  ];
  const command = new Deno.Command('deno', {
    args: ['run', ...PERMISSIONS, 'src/main.ts'],
    stdin: 'inherit',
    stdout: 'inherit',
  });
  await command.output();
}

main();

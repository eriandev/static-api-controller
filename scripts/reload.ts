async function main() {
  const command = new Deno.Command('deno', {
    args: ['cache', '--reload', '--lock=deno.lock', '--lock-write', 'src/main.ts'],
    stdin: 'inherit',
    stdout: 'inherit',
  });
  await command.output();
}

main();

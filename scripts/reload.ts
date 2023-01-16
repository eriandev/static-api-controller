async function main() {
  const process = Deno.run({
    cmd: ['deno', 'cache', '--reload', '--lock=deno.lock', '--lock-write', 'src/main.ts'],
    stdin: 'inherit',
    stdout: 'inherit',
  });

  await process.status();
}

main();

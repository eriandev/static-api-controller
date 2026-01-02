const PERMISSIONS = [
  '--allow-sys',
  '--allow-env',
  '--allow-read',
  '--allow-write',
  '--allow-run',
  '--allow-net=github.com,api.github.com,remotive.io,remotive.com',
] as const

async function main() {
  const command = new Deno.Command('deno', {
    args: ['run', '--env', ...PERMISSIONS, 'src/main.ts'],
    stdin: 'inherit',
    stdout: 'inherit',
  })
  await command.output()
}

main()

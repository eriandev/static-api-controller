export async function emptyDirectory(directoryPath: string) {
  await Deno.remove(directoryPath, { recursive: true })
}

export async function writeJSON(filePath: string, data: string) {
  const DIRECTORY_PATH = filePath
    .split('/', filePath.split('/').length - 1)
    .join('/')
    .toString()

  try {
    await Deno.mkdir(DIRECTORY_PATH, { recursive: true })

    const encoder = new TextEncoder()
    const uint8ArrayData = encoder.encode(data)

    await Deno.writeFile(filePath, uint8ArrayData)
  } catch (error) {
    console.error(`[sac:error] ${error as string}`)
  }
}

export async function readJSON<T = string>(filePath: string) {
  try {
    const decoder = new TextDecoder('utf-8')
    const data = await Deno.readFile(filePath)

    return JSON.parse(decoder.decode(data)) as T
  } catch (error) {
    return null
  }
}

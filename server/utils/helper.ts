import path from 'path'

export default {
  removeExtensionFromFile: (filename: string) => path.parse(filename).name
}
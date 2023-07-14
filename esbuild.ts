import { build } from 'esbuild'

build({
  bundle: true,
  entryPoints: ['./src/index.ts'],
  external: [
  ],
  format: 'cjs',
  outfile: './dist/index.js',
  watch: Boolean(process.env.ESBUILD_WATCH),
  platform: 'node',
  plugins: [
  ],
})

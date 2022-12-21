import { defineConfig, configDefaults } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import swc from 'unplugin-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),

    /**
     * Needed as a workaround for Vite work properly with Nest
     * https://github.com/vitest-dev/vitest/issues/708#issuecomment-1118628479
     */
    swc.vite(),
  ],
  test: {
    environment: 'node',
    exclude: [
      ...configDefaults.exclude,
      '**/e2e/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
  },
})

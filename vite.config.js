import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { exec } from 'node:child_process'

const devSeedPlugin = () => ({
  name: 'dev-seed-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url && req.url.startsWith('/dev-seed-recover')) {
        const urlObj = new URL(req.url, 'http://localhost')
        const email = urlObj.searchParams.get('email') || ''
        
        console.log(`[Vite Dev Seed] Intercepted request to seed recovery code for email: ${email}`)
        
        // Ejecutar el comando de Docker/Postgres en la terminal
        const sqlCmd = `docker exec -i bank-service-postgres psql -U root -d db -c "INSERT INTO password_reset_code (user_id, code_hash, expires_at, attempts, created_at, updated_at) SELECT id, '\$2a\$10\$hmIWez3YRKN.hhz68tB1UuQmhKICvzFjSP4yuVMVHY8zADF6cxew.', NOW() + INTERVAL '1 hour', 0, NOW(), NOW() FROM \\\"user\\\" WHERE email = '${email}';"`
        
        exec(sqlCmd, (err, stdout, stderr) => {
          if (err) {
            console.error('[Vite Dev Seed] Error executing query:', err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: err.message, stderr }))
            return
          }
          console.log('[Vite Dev Seed] Output:', stdout)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: true, stdout }))
        })
      } else {
        next()
      }
    })
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), devSeedPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

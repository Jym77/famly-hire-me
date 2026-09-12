import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

const managerPort = process.env.MANAGER_PORT;
const managerUrl = process.env.MANAGER_URL;

if (!managerPort || !managerUrl) {
  throw new Error('❌ Missing required environment variables: MANAGER_PORT and MANAGER_URL must be defined in the environment.');
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(managerPort),
  },
})

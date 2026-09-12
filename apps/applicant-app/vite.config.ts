import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

const applicantPort = process.env.APPLICANT_PORT;
const applicantUrl = process.env.APPLICANT_URL;

if (!applicantPort || !applicantUrl) {
  throw new Error('❌ Missing required environment variables: APPLICANT_PORT and APPLICANT_URL must be defined in the environment.');
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(applicantPort),
  },
})

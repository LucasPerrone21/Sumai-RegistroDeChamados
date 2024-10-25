import { z } from 'zod';
import dotenv from 'dotenv';


dotenv.config(); // Isso carrega as variáveis do arquivo .env para o process.env


// Defina o esquema para suas variáveis de ambiente
const envSchema = z.object({
    APP_ENVIROMENT: z.enum(['development', 'production', 'test']).default('development'),
    APP_PORT: z.string().transform(Number).default('3333'),
    DATABASE_URL: z.string().url(),
    APP_SECRET: z.string(),
});

const envTest = envSchema.safeParse(process.env)
export const env = envTest.data;


if (!envTest.success) {
  console.error('Invalid environment variables:', envTest.error.format());
  process.exit(1); // Para a execução se houver erro nas variáveis
}

import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'http://localhost:5012/swagger/v1/swagger.json',
  output: 'src/api',
});
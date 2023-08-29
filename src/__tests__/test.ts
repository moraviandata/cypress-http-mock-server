import axios from 'axios';

import { HttpMockServer } from '../index';

test('Cypress http mock server', async () => {
  const server = new HttpMockServer()
  await server.start()

  const response = await axios.get('http://localhost:3000');
  expect(response.status).toBe(200)

  server.stop()  
});

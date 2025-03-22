import path from 'node:path';
import { fileURLToPath } from 'node:url';

import fastifyStatic from '@fastify/static';
import type { FastifyInstance } from 'fastify';

export function registerSsr(app: FastifyInstance): void {
  app.register(fastifyStatic, {
    preCompressed: true,
    prefix: '/public/',
    root: [
      path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist'),
      path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../public'),
    ],
  });

  app.register(fastifyStatic, {
    decorateReply: false,
    preCompressed: true,
    prefix: '/assets/',
    root: [path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist/assets')],
  });

  app.get('/favicon.ico', (_, reply) => {
    reply.status(404).send();
  });

  app.get('/*', async (_req, reply) => {
    reply.sendFile('index.html', path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist'));
  });
}

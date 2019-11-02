'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.Server({
    port: 3000,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/api/products',
    handler: (request, h) => {
      const products = [
        {
          name: 'item 1',
          price: 10
        },
        {
          name: 'item 2',
          price: 21
        }
      ];
      return h
        .response({
          ok: true,
          data: products
        })
        .code(200);
    }
  });

  server.route({
    method: 'GET',
    path: '/api/products/{id}',
    handler: (request, h) => {
      const product = request.params.id;

      return h
        .response({
          ok: true,
          data: product
        })
        .code(200);
    }
  });

  await server.start();

  console.log(`server running on ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();

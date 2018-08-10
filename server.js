const fastify = require('fastify')({
  logger: true
})
const oas = require('fastify-oas');

fastify.register(oas, {
  routePrefix: '/documentation',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Show fastify-oas enum issue',
      version: '0.1.0',
    },
    consumes: ['application/json'],
    produces: ['application/json'],
  },
});

fastify.route({
  method: 'GET',
  url: '/with_enum_param',
  schema: {
    querystring: {
      myString: { type: 'string' },
      myEnum: {
        type: 'string',
        enum: ['val1', 'val2']
      },
    },
    response: {
      200: {
        description: 'Successful Response',
        type: 'object',
      }
    }
  },
  handler: async function(request) {
    return { hello: 'world' }
  }
});

fastify.ready(err => {
  if (err) throw err;
  fastify.oas();
});

fastify.listen(8080, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})


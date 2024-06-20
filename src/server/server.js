

const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const { loadModel } = require('../services/inferenceOps');
const dotenv = require('dotenv');
const InputError = require('../exceptions/InputError');


dotenv.config();

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });



  /* Load the Model and Save the Model in server.app (Uncomment once Model is Available) */
  /*
    server.app is a place to store values accessible wherever the server can access
    access values in server.app through handlers:
      request.server.app
  */
 
      const model = await loadModel();
      server.app.model = model;
  

  await server.register([
    {
      plugin: require('@hapi/inert')
    },
    {
      plugin: require('@hapi/jwt'),
    }
  ])

  server.auth.strategy('jwt_strategy', 'jwt', {
    keys: process.env.ACCESS_TOKEN_SECRET,
    verify: {
            aud: false,
            iss: false,
            sub: false,
            nbf: true,
            maxAgeSec: 0,
            timeSkewSec: 0,
    },
    validate: async (artifacts, request, h) => {
      return { isValid: true };
    }
  })

  server.auth.default('jwt_strategy');


  server.ext('onPreResponse', (request, h)=>{
    const response = request.response;

    if(response instanceof Error){
      console.error(`Response is an Error!`);
      const newResponse = h.response({
        status: 'fail',
        message: `${response.message}`,
        error: `${response.stack}`,
      });

      console.error(response.stack);

      newResponse.code(500)

      if(response instanceof InputError){
        newResponse.code(response.errorCode);
      }
      

      return newResponse;
    }

    return h.continue;
  })

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (error)=>{
  console.error(`Process caught Error!`);
  console.error(error.stack);
  process.exit(1);
})

init();

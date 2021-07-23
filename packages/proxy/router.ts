import { handler } from 'aws-lambda-router';
import client from './nbn';

exports.handler = handler({
  // for handling an http-call from an AWS API Gateway proxyIntegration we provide the following config:
  proxyIntegration: {
    cors: true,
    routes: [
      {
        path: '/places/autocomplete',
        method: 'GET',
        action: async request => {
          const { query } = request.queryStringParameters;
          const { data } = await client.get('v1/autocomplete', {
            params: { query },
          });

          return data;
        },
      },
      {
        path: '/places/status/:place',
        method: 'GET',
        action: async request => {
          const { place } = request.paths;
          const { data } = await client.get(`v2/details/${place}`);

          return data;
        },
      },
    ],
  },
});

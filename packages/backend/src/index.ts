import { createPrometheusExporterPlugin } from "@bmatei/apollo-prometheus-exporter";
import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import type { IResolvers } from "graphql-tools";
import { register } from "prom-client";
import nbn, { StatusResponse, SuggestionResponse } from "./nbn";

import bundle from "express-prom-bundle";

const typeDefs = gql`
  type Query {
    getAddressConnectionType(place: String!): StatusResponse
    autocomplete(address: String!): SuggestionResponse
  }

  type SuggestionResponse {
    timestamp: String
    source: String
    suggestions: [Suggestion]
  }

  type Suggestion {
    id: String
    formattedAddress: String
    latitude: Float
    longitude: Float
  }

  type StatusResponse {
    timestamp: String
    servingArea: ServingArea
    addressDetail: AddressDetail
  }

  type ServingArea {
    csaId: String
    techType: String
    serviceType: String
    serviceStatus: String
    serviceCategory: String
    rfsMessage: String
    description: String
  }

  type AddressDetail {
    id: String
    # latitude: number
    # longitude: number
    reasonCode: String
    techFlip: String
    serviceType: String
    serviceStatus: String
    disconnectionStatus: String
    disconnectionDate: String
    techType: String
    formattedAddress: String
    address1: String
    address2: String
    statusMessage: String
    frustrated: Boolean
    zeroBuildCost: Boolean
    wp1DisconnectionDate: String
    wp1DisconnectionStatus: String
    wp2DisconnectionDate: String
    wp2DisconnectionStatus: String
    wp3DisconnectionDate: String
    wp3DisconnectionStatus: String
    wp4DisconnectionDate: String
    wp4DisconnectionStatus: String
    speedTierAvailability: Boolean
    # eec: number
    cbdpricing: Boolean
    ee: Boolean
    TC2SMD: Boolean
  }
`;

const resolvers: IResolvers = {
  Query: {
    async autocomplete(parent, args, context, info) {
      const { data } = await nbn.get<SuggestionResponse>("v1/autocomplete", {
        params: { query: args.address },
      });

      return data;
    },
    async getAddressConnectionType(parent, args, context, info) {
      const { place } = args;
      const { data } = await nbn.get<StatusResponse>(`v2/details/${place}`);

      return data;
    },
  },
};

async function start(): Promise<void> {
  try {
    const app = express();
    app.get("/metrics", (_, res) => res.send(register.metrics()));

    const middleware = bundle({ includeMethod: true });
    const prometheusExporterPlugin = createPrometheusExporterPlugin({
      app,
      defaultMetrics: false,
    });

    app.use(middleware);
    app.use("/health", (req, res) => res.json({ healthy: true }));

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [prometheusExporterPlugin as any],
    });

    await server.start();

    server.applyMiddleware({ app, path: "/" });

    await new Promise<void>((res) =>
      app.listen(4000 || process.env.NODE_ENV, res)
    );

    console.log(`🚀 Service started`);
  } catch (error) {
    console.error("Failed to start!", error);
  }
}

start();

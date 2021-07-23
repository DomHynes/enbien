import { ApolloServer, gql } from "apollo-server";
import type { IResolvers } from "graphql-tools";
import nbn, { StatusResponse, SuggestionResponse } from "./nbn";

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

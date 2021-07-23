var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var import_apollo_server = __toModule(require("apollo-server"));
var import_nbn = __toModule(require("./nbn"));
const typeDefs = import_apollo_server.gql`
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
const resolvers = {
  Query: {
    async autocomplete(parent, args, context, info) {
      const { data } = await import_nbn.default.get("v1/autocomplete", {
        params: { query: args.address }
      });
      return data;
    },
    async getAddressConnectionType(parent, args, context, info) {
      const { place } = args;
      const { data } = await import_nbn.default.get(`v2/details/${place}`);
      return data;
    }
  }
};
const server = new import_apollo_server.ApolloServer({
  typeDefs,
  resolvers
});
server.listen().then(({ url }) => {
  console.log(`\u{1F680} Server ready at ${url}`);
});

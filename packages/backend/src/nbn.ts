import axios from "axios";

const nbn = axios.create({
  headers: {
    Referer: "https://www.nbnco.com.au/residential/learn/rollout-map.html",
  },
  baseURL: "https://places.nbnco.net.au/places",
});

export interface SuggestionResponse {
  timestamp: number;
  source: string;
  suggestions: Suggestion[];
}

export interface Suggestion {
  id: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
}

export interface StatusResponse {
  timestamp: number;
  servingArea: ServingArea;
  addressDetail: AddressDetail;
}

export interface AddressDetail {
  id: string;
  latitude: number;
  longitude: number;
  reasonCode: string;
  techFlip: string;
  serviceType: string;
  serviceStatus: string;
  disconnectionStatus: string;
  disconnectionDate: string;
  techType: string;
  formattedAddress: string;
  address1: string;
  address2: string;
  statusMessage: string;
  frustrated: boolean;
  zeroBuildCost: boolean;
  wp1DisconnectionDate: string;
  wp1DisconnectionStatus: string;
  wp2DisconnectionDate: string;
  wp2DisconnectionStatus: string;
  wp3DisconnectionDate: string;
  wp3DisconnectionStatus: string;
  wp4DisconnectionDate: string;
  wp4DisconnectionStatus: string;
  speedTierAvailability: boolean;
  eec: number;
  cbdpricing: boolean;
  ee: boolean;
  TC2SMD: boolean;
}

export interface ServingArea {
  csaId: string;
  techType: string;
  serviceType: string;
  serviceStatus: string;
  serviceCategory: string;
  rfsMessage: string;
  description: string;
}

export default nbn;

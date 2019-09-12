import axios from "axios";

const client = axios.create({
  headers: {
    Referer: "https://www.nbnco.com.au/residential/learn/rollout-map.html"
  },
  baseURL: "https://places.nbnco.net.au/places"
});

export default client;

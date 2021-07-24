import { gql } from "@apollo/client";
import { client } from "../apollo/client";

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log(req.address);
  if (req.address) {
    main(req.address).then((techType) => sendResponse(techType));
  }
});

async function main(address: string) {
  if (address) {
    const locations = await client.query({
      query: gql`
        query getLocations($query: String!) {
          autocomplete(address: $query) {
            timestamp
            suggestions {
              id
              formattedAddress
            }
          }
        }
      `,
      variables: { query: address },
    });
    console.log(locations);
    const connections = await client.query({
      query: gql`
        query getInfo($address: String!) {
          getAddressConnectionType(place: $address) {
            timestamp
            addressDetail {
              techType
            }
          }
        }
      `,
      variables: {
        address: locations?.data?.autocomplete?.suggestions?.[0]?.id,
      },
    });
    console.log(connections);
    return connections?.data?.getAddressConnectionType?.addressDetail?.techType;
  }
}

import { gql, useQuery } from "@apollo/client";
import { Button, Container, Loader, Paper } from "@mantine/core";
import React, { useEffect } from "react";
import usePageAddress from "../hooks/usePageAddress";

export default function Popup() {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  const address = usePageAddress();
  console.log(address);

  const locationQuery = useQuery(
    gql`
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
    { skip: !address, variables: { query: address } }
  );

  const connectionQuery = useQuery(
    gql`
      query getInfo($address: String!) {
        getAddressConnectionType(place: $address) {
          timestamp
          addressDetail {
            techType
          }
        }
      }
    `,
    {
      skip: !locationQuery?.data?.autocomplete?.suggestions?.[0]?.id,
      variables: {
        address: locationQuery?.data?.autocomplete?.suggestions?.[0]?.id,
      },
    }
  );

  if (locationQuery.loading || connectionQuery.loading)
    return (
      <Container>
        <Loader />
      </Container>
    );

  return (
    <Container padding="md">
      <Paper>
        {
          connectionQuery.data?.getAddressConnectionType?.addressDetail
            ?.techType
        }
      </Paper>
    </Container>
  );
}

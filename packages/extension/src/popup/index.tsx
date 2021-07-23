import { ApolloProvider } from "@apollo/client";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { client } from "../apollo/client";
import Popup from "./Popup";

chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Popup />
    </ApolloProvider>,
    document.getElementById("popup")
  );
});

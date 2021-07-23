/* eslint-disable no-undef */
import { useEffect, useState } from "react";

const usePageAddress = () => {
  const [address, setAddress] = useState();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { getAddress: true }, async (add) => {
        if (add) {
          setAddress(add.address);
        }
      });
    });
  }, []);

  return address;
};

export default usePageAddress;

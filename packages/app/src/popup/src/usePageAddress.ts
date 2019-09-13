/* eslint-disable no-undef */
import { useEffect, useState } from 'react';

const usePageAddress = () => {
  const [address, setAddress] = useState();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      //@ts-ignore
      chrome.tabs.sendMessage(tabs[0].id, { getAddress: true }, async add => {
        if (add) {
          setAddress(add.address);
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return address;
};

export default usePageAddress;

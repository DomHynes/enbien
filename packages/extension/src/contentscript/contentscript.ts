import "./contentscript.scss";

const findAddress = () => {
  const address = document.querySelector("h1");

  if (address) {
    return address.textContent;
  }

  return;
};

const address = findAddress();
console.log({ address });
if (address) {
  const node = document.createElement("h2");
  chrome.runtime.sendMessage({ address }, (techType: string) => {
    console.log({ techType });
    if (techType) {
      node.appendChild(document.createTextNode(techType));

      node.classList.add("enbien");

      document.querySelector("h1").appendChild(node);
    }
  });
}

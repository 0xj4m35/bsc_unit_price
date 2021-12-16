"use strict";

const createHTML = (content) => {
  const template = document.createElement("template");
  template.innerHTML = content.trim();
  return template.content.firstChild;
};

const createElement = (root, ...elems) => {
  const div = document.createElement(root);
  elems.forEach((e) => {
    div.append(e);
  });
  return div;
};

const insertAfter = (referenceNode, newNode) => {
  if (referenceNode.nextSibling) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  } else {
    referenceNode.parentNode.appendChild(newNode);
  }
};

const extractData = (li) => {
  const qEl = li.querySelector("span:nth-child(6)");
  const nameEl = li.querySelector(".media-body > a:last-child");
  return {
    quantity: parseFloat(qEl?.innerText),
    name: nameEl?.innerText || "XXX",
  };
};

const getPriceText = (fromToken, toToken) => {
  return `<b>1</b> ${fromToken.name} = <b>${
    toToken.quantity / fromToken.quantity
  }</b> ${toToken.name}`;
};

const renderToDOM = (priceText) => {
  const ul = document.querySelector("ul.list-unstyled");
  const parentUl = ul.closest("div.row");
  insertAfter(parentUl, createHTML('<hr class="hr-space"/>'));
  insertAfter(
    parentUl.nextSibling,
    createHTML(
      `<div class="row"><div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0"><div class="bscup_title">Unit price (Calculated by BSC Unit Price):</div></div><div class="col-md-9">${priceText}</div></div>`
    )
  );
};

const main = () => {
  const lis = document.querySelectorAll("ul.list-unstyled li.media");
  if (!lis || lis.length < 2) {
    return;
  }
  const fromToken = extractData(lis[0]);
  const toToken = extractData(lis[lis.length - 1]);
  if (!fromToken.quantity || !toToken.quantity) {
    return;
  }
  const priceText = getPriceText(fromToken, toToken);
  renderToDOM(priceText);
};

main();

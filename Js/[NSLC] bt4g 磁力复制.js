// ==UserScript==
// @name         [NSLC] bt4g 磁力复制
// @namespace    bt4gprx
// @version      1.0
// @description  从bt4g网站上提取并打开磁链哈希值
// @author       NSLC
// @match        http://bt4gprx.com/*
// @match        https://bt4gprx.com/*
// @match        http://bt4g.org/*
// @match        https://bt4g.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function extractAndAppendLink() {
        const firstAElement = document.evaluate('/html/body/main/div[2]/div/div[2]/div[2]/a[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        const lastAElement = document.evaluate('/html/body/main/div[2]/div/div[2]/div[2]/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (firstAElement) {
            const hashExtract = firstAElement.getAttribute('href').match(/[0-9A-Fa-f]{40}/)[0]
            if (hashExtract){
                if (lastAElement) {
                    const parentElementA = lastAElement.parentElement;
                    const newParagraph = document.createElement('p');
                    newParagraph.textContent = hashExtract;
                    parentElementA.insertBefore(newParagraph, lastAElement.nextSibling);
                    console.log("[NSLC][MagnetaAppend] Text Appended.")
                }
            }
            if (lastAElement) {
                const newAnchor = document.createElement('a');
                newAnchor.href = "magnet:?xt=urn:btih:" + hashExtract;
                newAnchor.textContent = "Open Magnet Link";

                const parentElementP = lastAElement.parentElement;

                parentElementP.insertBefore(newAnchor, parentElementP.querySelector('p').nextSibling);
            }
        }
    }


    window.addEventListener('load', function () {
        setTimeout(function () {
            console.log("[NSLC][MagnetaAppend] Triggered.")
            extractAndAppendLink();
        }, 500);
    });
})();

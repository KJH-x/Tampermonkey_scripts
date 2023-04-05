// ==UserScript==
// @name         ACG.RIP大种筛选
// @version      1
// @description  大于2GB的行将会被高亮，大小将会被红标
// @match        http://acg.rip/*
// @match        https://acg.rip/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function highlightSizes() {
        const sizeElements = document.querySelectorAll('td.size');
        for (let i = 0; i < sizeElements.length; i++) {
            const sizeElement = sizeElements[i];
            const sizeText = sizeElement.textContent.trim();
            if (sizeText.endsWith('GB')) {
                const sizeValue = parseFloat(sizeText);
                if (sizeValue > 2) {
                    sizeElement.style.color = '#f67ba1';
                    sizeElement.style.fontWeight = 'bold';
                    sizeElement.parentElement.style.backgroundColor = '#855f16';
                }
            }
        }
    }

    // Highlight sizes on page load
    window.addEventListener('load', highlightSizes);

    // Highlight sizes on dynamic page updates
    const observer = new MutationObserver(highlightSizes);
    observer.observe(document.body, { childList: true, subtree: true });
})();

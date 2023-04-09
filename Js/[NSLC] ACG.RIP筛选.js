// ==UserScript==
// @name         [NSLC] ACG.RIP筛选
// @version      3.0
// @description  大于2GB的行将会被高亮，大小将会被红标，隐藏被禁止的uID
// @match        http://acg.rip/*
// @match        https://acg.rip/*
// @grant        none
// @author       NSLC
// ==/UserScript==

(function() {
    'use strict';
    const userIDs = ['5266'];

    function highlightSizes() {
        const sizeElements = document.querySelectorAll('td.size');
        for (let i = 0; i < sizeElements.length; i++) {
            const sizeElement = sizeElements[i];
            const sizeText = sizeElement.textContent.trim();
            if (sizeText.endsWith('GB')) {
                const sizeValue = parseFloat(sizeText);
                if (sizeValue > 2) {
                    console.log('[NSLC][AcgRip] 找到好东西')
                    sizeElement.style.color = '#f67ba1';
                    sizeElement.style.fontWeight = 'bold';
                    sizeElement.parentElement.style.backgroundColor = '#855f16';
                }
            }
        }
    }
    function HideBannedUserContent(){
        const userLinks = document.querySelectorAll('tr td div a');
        userLinks.forEach(function(userLink) {
            const userID = userLink.getAttribute('href').match(/\/user\/(\d+)/)[1];
            if (userIDs.includes(userID)) {
                userLink.closest('tr').remove();
                console.log(`[NSLC][AcgRip][User ban] removing matched uID: ${userID}`)
            }
        });}
    function Actions(){
        HideBannedUserContent();
        highlightSizes();
    }
    // on page load
    window.addEventListener('load', Actions);

    // Highlight sizes on dynamic page updates
    const observer = new MutationObserver(Actions);
    observer.observe(document.body, { childList: true, subtree: true });
})();

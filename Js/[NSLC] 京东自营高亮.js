// ==UserScript==
// @name         [NSLC] 京东自营高亮
// @namespace    https://www.example.com/
// @version      1.0
// @description  Highlights search results on JD search pages that contain a specific class
// @match        http://search.jd.com/*
// @match        https://search.jd.com/*
// @grant        none
// @author       NSLC
// ==/UserScript==

(function() {
    'use strict';
    function ZiYingHighlight(){
        const items = document.querySelectorAll('li.gl-item');
        items.forEach(function(item) {
            const specialIconDiv = item.querySelector('div.gl-i-wrap');
            const specialIcon = specialIconDiv.querySelector('i.goods-icons.J-picon-tips.J-picon-fix')
            if (specialIcon) {
                specialIconDiv.style.backgroundColor = '#6b4c12';
            }
        });
    }
    document.addEventListener('DOMContentLoaded', ZiYingHighlight);
    window.onload = ZiYingHighlight
    const observer = new MutationObserver(function(mutationsList, observer) {
        mutationsList.forEach(function(mutation) {
            const addedNodes = mutation.addedNodes;
            if (addedNodes && addedNodes.length > 0) {
                ZiYingHighlight();
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();

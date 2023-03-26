// ==UserScript==
// @name         百度题库答案蒙版去除
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  去除百度题库答案蒙版
// @match        *://easylearn.baidu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removeMaskDiv() {
        console.log('removeMaskDiv function called');
        const maskDiv = document.querySelector('div.mask');
        if (maskDiv) {
            console.log('ChatGPT: mask div found');
            maskDiv.remove();
            console.log('ChatGPT: mask div deleted successfully');
        } else {
            console.log('ChatGPT: mask div not found');
        }
    }

    setTimeout(removeMaskDiv, 2000);
})();

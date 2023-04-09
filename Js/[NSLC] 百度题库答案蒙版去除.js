// ==UserScript==
// @name         [NSLC] 百度题库答案蒙版去除
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  去除百度题库答案蒙版
// @match        *://easylearn.baidu.com/*
// @grant        none
// @author       NSLC
// ==/UserScript==

(function() {
    'use strict';

    function removeMaskDiv() {
        console.log('removeMaskDiv function called');
        const maskDiv = document.querySelector('div.mask');
        if (maskDiv) {
            maskDiv.remove();
            console.log('[NSLC][百度题库] 去除成功');
        } else {
            console.log('[NSLC][百度题库] 未找到答案遮罩');
        }
    }

    setTimeout(removeMaskDiv, 2000);
})();

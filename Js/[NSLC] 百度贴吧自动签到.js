// ==UserScript==
// @name         [NSLC] 百度贴吧自动签到
// @version      2.0
// @description  Automatically click the tieba sign-in button when it appears on the page and print a log message to the console
// @match        http://tieba.baidu.com/*
// @match        https://tieba.baidu.com/*
// @grant        none
// @author       NSLC
// ==/UserScript==

(function() {
    'use strict';

    const sign_in_button_title = "签到";
    function QianDao() {
        const sign_in_button = document.querySelector(`a[title="${sign_in_button_title}"]`);

        if (sign_in_button) {
            sign_in_button.click();
            console.log(`[NSLC][百度贴吧] 点击了 ${sign_in_button_title}`);
        } else {
            console.log(`[NSLC][百度贴吧] 找不到 ${sign_in_button_title}`);
        }
    }
    window.addEventListener('load', function() {
        setTimeout(function() {
            QianDao()
        }, 3000); // 3 second delay
    });

})();

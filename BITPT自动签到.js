// ==UserScript==
// @name         BITPT自动签到
// @namespace    http://tampermonkey
// @version      1.0
// @description  BITPT自动签到（开心-不想填写）
// @match        http://bitpt.cn/*
// @match        https://bitpt.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const sign_in_button_text = "签到领奖！";

    window.addEventListener('load', function() {
        const sign_in_button = Array.from(document.getElementsByTagName("a")).find(a => a.textContent === sign_in_button_text);

        if (sign_in_button) {
            sign_in_button.click();
            console.log(`[ChatGPT] 点击 ${sign_in_button_text} 按钮`);

            setTimeout(function() {
                const kx_button = document.getElementById("kx");

                if (kx_button) {
                    kx_button.click();
                    console.log("[ChatGPT] 点击 开心 按钮");

                    setTimeout(function() {
                        const qdmode_radio_button = document.querySelector('input[name="qdmode"][value="3"]');

                        if (qdmode_radio_button) {
                            qdmode_radio_button.click();
                            console.log("[ChatGPT] 点击 留言 按钮");

                            setTimeout(function() {
                                const qiandao_button = document.querySelector('button.pn.pnc');

                                if (qiandao_button) {
                                    qiandao_button.click();
                                    console.log("[ChatGPT] 点击 签到 按钮");
                                } else {
                                    console.log("[ChatGPT] 找不到 签到 按钮");
                                }
                            }, 500);
                        } else {
                            console.log("[ChatGPT] 找不到 留言 按钮");
                        }
                    }, 1000);
                } else {
                    console.log("[ChatGPT] 找不到 开心 按钮");
                }
            }, 1000);
        } else {
            console.log(`[ChatGPT] 找不到 ${sign_in_button_text} 按钮`);
        }
    });
})();

// ==UserScript==
// @name         [NSLC][TJUPT]换标题
// @namespace    http://tampermonkey.net/
// @version      2024-05-21
// @description  Simplified The Title
// @author       NSLC
// @match        https://tjupt.org
// @match        https://www.tjupt.org
// @match        https://tjupt.org/torrents.php*
// @match        https://www.tjupt.org/torrents.php*
// @match        https://tjupt.org/*
// @match        https://www.tjupt.org/*
// @icon         https://www.tjupt.org/assets/favicon/favicon.png
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    // 定义需要执行的操作
    var titleFin = ''
    var logSignCSS = 'background: #990066; color: #FFFFFF';
    var logFunctionCSS = 'background: #663366; color: #FFFFFF';
    function Actions() {
        let result = document.evaluate(
            '//title',
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );

        // 获取标题节点
        let titleNode = result.singleNodeValue;

        // 检查标题节点是否存在
        if (titleNode) {
            // 获取当前标题内容
            let currentTitle = titleNode.textContent;
            if (currentTitle === titleFin) {
                return;
            } else {
                // 使用正则表达式提取{text}部分
                // 北洋园PT :: 首页 - Powered by NexusPHP
                let newTitle = currentTitle.replace(/^北洋园PT :: (.*?) - Powered by NexusPHP/, '北洋园 | $1');

                // 修改标题内容
                titleNode.textContent = newTitle;
                console.log(`%c[NSLC][TJUPT]` , `%c[SIMTI]` , `%c已修改标题为 \"${newTitle}\"`, logSignCSS, logFunctionCSS, ``);
                titleFin = newTitle;
            }
        } else {
            console.log('Title element not found.');
        }
    }

    // 页面加载完成时执行
    window.addEventListener('load', Actions);

    // 在动态页面更新时执行
    const observer = new MutationObserver(Actions);
    observer.observe(document.body, { childList: true, subtree: true });

})();

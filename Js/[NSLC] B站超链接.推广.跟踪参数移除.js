// ==UserScript==
// @name         [NSLC] B站广告|推广|分享跟踪参数|移除
// @namespace    http://tampermonkey.net/
// @version      4.2
// @description  在页面加载、评论加载等时候去除无聊的关键词超链接以及跟着的放大镜，在页面加载完成前后之后去除推广恼人小组件，在点击复制10ms后去除剪贴板的网址跟踪参数
// @author       NappingSodion
// @match        *://*.bilibili.com/video/*
// @grant        none
// @author       NSLC
// ==/UserScript==


(function () {
    'use strict';

    /**
     * Removes elements from the DOM based on the provided selector.
     * @param {string} selector - The CSS selector for elements to be removed.
     * @param {string} logMessage - The message to be logged after removing elements.
     * @param {boolean} checkParent - Optional. If true, checks the parent elements before removing.
     * @param {string} parentTagName - Optional. Specifies the expected tagName for the parent element (e.g., 'A').
     */
    function removeElementsBySelector(selector, logMessage, checkParent = false, parentTagName) {
        const elementsToRemove = document.querySelectorAll(selector);
        elementsToRemove.forEach(element => {
            if (checkParent) {
                const parent = element.parentNode;
                if (parent && (!parentTagName || (parentTagName && parent.tagName === parentTagName))) {
                    parent.remove();
                    console.log(logMessage);
                }
            } else {
                element.remove();
                console.log(logMessage);
            }
        });
    }

    /**
     * Batch removes elements based on the provided nested list.
     * @param {Array} nestedList - A nested list containing arrays with selector, logMessage, checkParent, and parentTagName.
     */
    function batchRemoveElementsBySelector(nestedList) {
        nestedList.forEach(([selector, logMessage, checkParent = false, parentTagName]) => {
            removeElementsBySelector(selector, logMessage, checkParent, parentTagName);
        });
    }

    // 匹配列表
    const loopBannedList = [
        ['i.icon.search-word', '[NSLC][B站][去除关键词搜索图标]'],
        ['a.jump-link.search-word', '[NSLC][B站][去除关键词链接]']
    ];
    const OnceBannedList = [
        ['div.ad-floor-cover', '[NSLC][B站][去除推广广告]', true, 'A'],
        ['div.pop-live-small-mode', '[NSLC][B站][去除直播推广]'],
        ['div.video-page-game-card-small', '[NSLC][B站][去除游戏推广]'],
        ['div.video-ai-assistant', '[NSLC][B站][去除视频ai总结]'],
        ['div.video-page-special-card-small', '[NSLC][B站][去除视频推广卡片]'],
        ['div.act-end', '[NSLC][B站][去除网页推广卡片]'],
        ['div.inside-wrp', '[NSLC][B站][去除网页推广卡片2]'],
        ['div.reply-notice','[NSLC][B站][去除评论区活动推广]'],
        ['a.loc-moveclip','[NSLC][B站][顶部滚动广告]'],
        ['a.download-client-trigger','[NSLC][B站][下载客户端]'],
    ];

    function cleanUp(mutationsList) {
        batchRemoveElementsBySelector(loopBannedList)
    }

    // 变DOM触发
    const observer = new MutationObserver(cleanUp);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('DOMContentLoaded', cleanUp);

    // DOM加载后延时执行
    // 应对多种加载条件
    window.onload = function () {
        setTimeout(function () { batchRemoveElementsBySelector(OnceBannedList) }, 3000)
        setTimeout(function () { batchRemoveElementsBySelector(OnceBannedList) }, 5000)
        setTimeout(function () { batchRemoveElementsBySelector(OnceBannedList) }, 7000)
        setTimeout(function () { batchRemoveElementsBySelector(OnceBannedList) }, 10000)
    };

    // 以下为复制链接的跟踪参数去除部分：
    (function () {
        'use strict';

        var CopyLinkEventObserver = new MutationObserver(function (mutationsList, CopyLinkEventObserver) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    var addedNodes = mutation.addedNodes;
                    for (var i = 0; i < addedNodes.length; i++) {
                        var node = addedNodes[i];
                        if (node.nodeType === Node.ELEMENT_NODE && node.matches('div.video-share-info *')) {
                            node.addEventListener('click', async function () {
                                try {
                                    console.log('[NSLC][B站][跟踪参数去除]监听到复制点击事件');
                                    await new Promise(resolve => setTimeout(resolve, 10));
                                    var clipboardContent = await navigator.clipboard.readText();
                                    var modifiedClipboardContent = modifyClipboardContent(clipboardContent);
                                    await navigator.clipboard.writeText(modifiedClipboardContent);
                                    console.log('[NSLC][B站][跟踪参数去除]新链接已写入剪贴板：', modifiedClipboardContent);
                                } catch (error) {
                                    console.error('[NSLC][B站][跟踪参数去除]失败，参见错误信息：', error);
                                }
                            });
                        }
                    }
                }
            }
        });

        CopyLinkEventObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        function modifyClipboardContent(clipboardContent) {
            var modifiedContent = clipboardContent;
            var linkRegExp = /(https?:\/\/[^\s]+)/g;
            var match = linkRegExp.exec(clipboardContent);
            while (match !== null) {
                var link = match[0];
                var modifiedLink = link.split('?')[0];
                modifiedContent = modifiedContent.replace(link, modifiedLink);
                match = linkRegExp.exec(clipboardContent);
            }
            return modifiedContent;
        }
    })();

})();

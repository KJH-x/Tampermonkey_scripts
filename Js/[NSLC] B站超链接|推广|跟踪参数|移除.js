// ==UserScript==
// @name         [NSLC] B站超链接|推广|跟踪参数|移除
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  在页面加载、评论加载等时候去除无聊的关键词超链接以及跟着的放大镜，在页面加载完成几秒之后去除推广小组件，在点击复制10ms后去除剪贴板的网址跟踪参数
// @author       NappingSodion
// @match        *://*.bilibili.com/*
// @grant        none
// @author       NSLC
// ==/UserScript==


(function() {
    'use strict';
    function removeLinkLabel(link) {
        const label = link.textContent;
        const textNode = document.createTextNode(link.textContent);
        link.parentNode.replaceChild(textNode, link);
        console.log(`[NSLC][BiliBili][去除关键词链接]["${label}"]`);

    }

    function removeSearchIcon(icon) {
        const searchIcons = document.querySelectorAll('i.icon.search-word');
        searchIcons.forEach(searchIcon => {
            searchIcon.remove();
            console.log(`[NSLC][BiliBili][去除关键词搜索图标]`);
        });
    }

    // Function to handle mutations to the DOM
    function cleanUp(mutationsList) {
        const links = document.querySelectorAll('a.jump-link.search-word');
        const icons = document.querySelectorAll('i.icon.search-word');
        icons.forEach(removeSearchIcon);
        links.forEach(removeLinkLabel);
        removeSideBarAD()
    }

    function removeSideBarAD(){
        // Find the <div> element with class "ad-floor-cover"
        const adFloorCover = document.querySelector('div.ad-floor-cover');
        if (adFloorCover) {
            const parentLink = adFloorCover.parentNode;
            if (parentLink && parentLink.tagName === 'A') {
                parentLink.remove();
                console.log(`[NSLC][BiliBili][去除推广广告]`);
            }
        };
        const popLiveSmallMode = document.querySelector('div.pop-live-small-mode');
        if (popLiveSmallMode) {
            popLiveSmallMode.remove();
            console.log(`[NSLC][BiliBili][去除直播推广]`);
        }
        const gameCard = document.querySelector('div.video-page-game-card-small')
        if (gameCard) {
            gameCard.remove();
            console.log(`[NSLC][BiliBili][去除游戏推广]`);
        }
    }

    const observer = new MutationObserver(cleanUp);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('DOMContentLoaded', cleanUp);

    window.onload = function() {
        const specialCard = document.querySelector('div.video-page-special-card-small');
        if (specialCard) {
            specialCard.remove();
            console.log("[NSLC][BiliBili][去除视频推广卡片]")
        }
        const inside_wrp = document.querySelector('div.act-end');
        if (inside_wrp) {
            inside_wrp.remove();
            console.log("[NSLC][BiliBili][去除网页推广卡片]")
        }

        setTimeout(function(){
            const ad_card_under_video = document.querySelector('div.inside-wrp');
            if (ad_card_under_video) {
                ad_card_under_video.remove();
                console.log("[NSLC][BiliBili][去除网页推广卡片2]")
            }
        },5000)

    };

    // 以下为复制链接的跟踪参数去除部分：
    (function() {
        'use strict';

        var CopyLinkEventObserver = new MutationObserver(function(mutationsList, CopyLinkEventObserver) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    var addedNodes = mutation.addedNodes;
                    for (var i = 0; i < addedNodes.length; i++) {
                        var node = addedNodes[i];
                        if (node.nodeType === Node.ELEMENT_NODE && node.matches('div.info-text *')) {
                            node.addEventListener('click', async function() {
                                try {
                                    console.log('[NSLC][BiliBili][跟踪参数去除]监听到复制点击事件');
                                    await new Promise(resolve => setTimeout(resolve, 10));
                                    var clipboardContent = await navigator.clipboard.readText();
                                    var modifiedClipboardContent = modifyClipboardContent(clipboardContent);
                                    await navigator.clipboard.writeText(modifiedClipboardContent);
                                    console.log('[NSLC][BiliBili][跟踪参数去除]新链接已写入剪贴板：', modifiedClipboardContent);
                                } catch (error) {
                                    console.error('[NSLC][BiliBili][跟踪参数去除]失败，参见错误信息：', error);
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

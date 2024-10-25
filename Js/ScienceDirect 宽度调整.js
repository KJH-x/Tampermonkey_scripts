// ==UserScript==
// @name         ScienceDirect 宽度调整
// @version      2024-10-09
// @description  modify width of science direct
// @author       NSLC
// @match        http://www.sciencedirect.com/science/article/*
// @match        https://www.sciencedirect.com/science/article/*
// @grant        none
// @icon         https://sciencedirect.elseviercdn.cn/shared-assets/103/images/favSD.ico
// ==/UserScript==

(function() {
    'use strict';
    document.addEventListener('DOMContentLoaded', function() {
        // Set max-width and center alignment for article-wrapper
        var articleWrapper = document.querySelector('.Article .article-wrapper');
        if (articleWrapper) {
            articleWrapper.style.maxWidth = '2160px';
            articleWrapper.style.margin = 'auto';
        }

        // Set width for the center column
        var centerWidth = document.getElementsByClassName('col-lg-12 col-md-16 pad-left pad-right');
        if (centerWidth.length > 0) {
            centerWidth[0].style.width = '60%';
        }

        // Set width for the left panel (Table of Contents)
        var leftPanel = document.getElementsByClassName('TableOfContents u-margin-l-bottom');
        if (leftPanel.length > 0) {
            leftPanel[0].style.width = '15%';
        }

        // Set width for the right panel (Related Content)
        var rightPanel = document.getElementsByClassName('RelatedContent');
        if (rightPanel.length > 0) {
            rightPanel[0].style.width = '15%';
        }

        // Modify the RelatedContent with class u-clr-grey8 to have width of 100%
        var relatedContentGrey = document.getElementsByClassName('RelatedContent u-clr-grey8');
        if (relatedContentGrey.length > 0) {
            relatedContentGrey[0].style.width = '100%';
        }

        // Inject new CSS for media query
        var style = document.createElement('style');
        style.innerHTML = `
            @media only screen and (min-width: 62em) {
                .col-lg-6, .row > .col-lg-6 {
                    width: 20%;
                }
            }
        `;
        document.head.appendChild(style);
    });
})();

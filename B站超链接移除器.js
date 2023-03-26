// ==UserScript==
// @name         B站超链接移除器
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes the label of <a> links with a specific class on the target website and replaces it with only the text it displays
// @author       NappingSodion
// @match        *://*.bilibili.com/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    // Function to remove the label from a link
    function removeLinkLabel(link) {
        // Save the label for later logging
        const label = link.textContent;
        try {
            // Replace the link element with a new text node containing the link's text content
            const textNode = document.createTextNode(link.textContent);
            link.parentNode.replaceChild(textNode, link);

            // Log the action in the console
            console.log(`ChatGPT: Removed label "${label}" from link`);
        } catch (err) {
        }
    }

    function removeSearchIcon() {
        const searchIcons = document.querySelectorAll('i.icon.search-word');
        searchIcons.forEach(searchIcon => {
            // Remove the search icon
            searchIcon.remove();
            console.log(`ChatGPT: Removed search icon`);
        });
    }

    // Function to handle mutations to the DOM
    function handleMutations(mutationsList) {
        // Get all links with the class 'jump-link search-word'
        const links = document.querySelectorAll('a.jump-link.search-word');

        // Loop through each link and remove the label
        links.forEach(removeLinkLabel);

        // Loop through each mutation
        for (const mutation of mutationsList) {
            // Check if the mutation added a node with the class 'jump-link search-word'
            if (mutation.type === 'childList' && mutation.addedNodes.length) {
                const addedNodes = mutation.addedNodes;
                for (const node of addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('jump-link') && node.classList.contains('search-word')) {
                        // Remove the label from the new link
                        removeLinkLabel(node);
                    }
                }
            }
        }
    }
    // Get all <a> elements with the class 'jump-link search-word'
    const links = document.querySelectorAll('div.reply-list a.jump-link.search-word');
    // Loop through each link and remove the label
    links.forEach(removeLinkLabel);
    // Set up a MutationObserver to monitor changes to the DOM
    const observer = new MutationObserver(handleMutations);
    observer.observe(document.body, { childList: true, subtree: true });

    function main() {
        const replyList = document.querySelector('.reply-list');
        if (replyList) {
            const links = replyList.querySelectorAll('a.jump-link.search-word');
            links.forEach(link => {
                removeLinkLabel(link);
            })
        }
    }

    // Run the script when the DOM is ready
    document.addEventListener('DOMContentLoaded', main);
    window.addEventListener('load', function() {
        removeSearchIcon()
    });

})();

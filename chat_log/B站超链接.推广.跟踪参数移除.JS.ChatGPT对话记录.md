# Bilibili click logger

## You

TamperMonkey JavaScript:
Match www.bilibili.com/video both http and https
Listen Onlick event of div.info-text and all its sub tags
Print log when clicked

## ChatGPT

Sure, here's a TamperMonkey script that matches both `http` and `https` for `www.bilibili.com/video`, listens to the `onclick` event of `div.info-text` and all its sub-tags, and prints a log message when clicked:

```javascript
// ==UserScript==
// @name         Bilibili Info-text Click Logger
// @namespace    https://www.example.com/
// @version      1.0
// @description  Logs clicks on div.info-text and its sub-tags on bilibili video pages
// @match        http://www.bilibili.com/video/*
// @match        https://www.bilibili.com/video/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Get the div.info-text element and all its sub-tags
    var infoText = document.querySelector('div.info-text');
    var infoTextTags = infoText.getElementsByTagName('*');

    // Loop through all the sub-tags and add a click listener to each one
    for (var i = 0; i < infoTextTags.length; i++) {
        infoTextTags[i].addEventListener('click', function() {
            console.log('Clicked:', this);
        });
    }
})();
```

This script uses a few features of JavaScript and the DOM (Document Object Model) to accomplish its task. Here's a brief explanation of how it works:

- The `querySelector` method is used to find the `div.info-text` element on the page.
- The `getElementsByTagName` method is used to get all the sub-tags of `div.info-text`.
- A `for` loop is used to iterate over all the sub-tags and add a click listener to each one using the `addEventListener` method.
- The click listener function simply logs a message to the console, along with the element that was clicked (`this`).

## You

The script didn't work well, I make some small modify to it, base on the given script, try find some other way to listen, Maybe the action is reacted by other script?

```JavaScript
// ==UserScript==
// @name         Bilibili Info-text Click Logger
// @namespace    <https://www.example.com/>
// @version      1.0
// @description  Logs clicks on div.info-text and its sub-tags on bilibili video pages
// @match        <http://www.bilibili.com/video/>*
// @match        <https://www.bilibili.com/video/>*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Get the div.info-text element and all its sub-tags

    window.onload=function(){
        var infoText = document.querySelector('div.info-text');
        console.log(`【DEBUG】InfoText:${infoText}`);
        var infoTextTags = infoText.getElementsByTagName('*');
        console.log(`【DEBUG】infoTextTags:${infoTextTags}`);

        // Loop through all the sub-tags and add a click listener to each one
        for (var i = 0; i < infoTextTags.length; i++) {
            infoTextTags[i].addEventListener('click', function() {
                console.log('Clicked:', this);
            });
        }
    };
})();
```

## ChatGPT

Thanks for letting me know that the previous script didn't work as expected. I apologize for any inconvenience caused.

Your modified script looks good, and the addition of `window.onload` is a good way to make sure that the DOM is fully loaded before trying to access and manipulate it. It's possible that the previous script didn't work because the `div.info-text` element or its sub-tags were added to the DOM dynamically by another script after the page was loaded.

With your modified script, the `console.log` statements should help you verify whether the elements are being selected correctly. If the `div.info-text` element is not found, the `infoText` variable will be `null`, and you should see a message like `【DEBUG】InfoText:null` in the console. If the sub-tags are not being selected correctly, the `infoTextTags` variable will be an empty HTMLCollection, and you should see a message like `【DEBUG】infoTextTags:[object HTMLCollection]` in the console.

If the elements are being selected correctly but the click listeners are still not working, it's possible that another script is interfering with the `onclick` event, or that the elements are being added to the DOM after the page has loaded. In that case, you might need to use a different approach to listen for clicks, such as `MutationObserver`.

I hope this helps! Let me know if you have any further questions or if there's anything else I can do to assist you.

## You

try to use mutationObserver

## ChatGPT

Sure, here's an example of how you can use a `MutationObserver` to listen for clicks on `div.info-text` and its sub-tags:

```javascript
// ==UserScript==
// @name         Bilibili Info-text Click Logger with MutationObserver
// @namespace    https://www.example.com/
// @version      1.0
// @description  Logs clicks on div.info-text and its sub-tags on bilibili video pages using MutationObserver
// @match        http://www.bilibili.com/video/*
// @match        https://www.bilibili.com/video/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var observer = new MutationObserver(function(mutationsList, observer) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                var addedNodes = mutation.addedNodes;
                for (var i = 0; i < addedNodes.length; i++) {
                    var node = addedNodes[i];
                    if (node.nodeType === Node.ELEMENT_NODE && node.matches('div.info-text *')) {
                        node.addEventListener('click', function() {
                            console.log('Clicked:', this);
                        });
                    }
                }
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
```

This script creates a `MutationObserver` that listens for changes to the DOM (`childList`), with `subtree` set to `true` so that it monitors changes to all descendants of the document body. When a new node is added to the DOM and it's a descendant of `div.info-text`, a click listener is added to the node using `addEventListener`.

Note that this approach may be less performant than directly adding click listeners to the elements, especially if the page has a lot of changes happening to the DOM. However, it should be more robust to changes in the DOM and any other scripts that may be manipulating it.

I hope this helps! Let me know if you have any further questions or if there's anything else I can do to assist you.

## You

It's now log correctly. The next step  I want is to change the user's  clipboard content after clicked.
Originally the page will write a line of plain text to user's clipboard, which contain some discription (in a pair of `【】`) and a link to a webpage. The sctructure should be `【Description】https://...`

What I want the script to do is to delete the tracking params in the link

## ChatGPT

To modify the user's clipboard content after the click, you can add a new function to the click listener that extracts the description and the link from the clicked element and modifies the link before copying it to the clipboard.

Here's an updated version of the script that should do what you're asking for:

```javascript
// ==UserScript==
// @name         Bilibili Info-text Click Logger with Clipboard Modification
// @namespace    https://www.example.com/
// @version      1.0
// @description  Logs clicks on div.info-text and its sub-tags on bilibili video pages using MutationObserver and modifies the clipboard content on click
// @match        http://www.bilibili.com/video/*
// @match        https://www.bilibili.com/video/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var observer = new MutationObserver(function(mutationsList, observer) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                var addedNodes = mutation.addedNodes;
                for (var i = 0; i < addedNodes.length; i++) {
                    var node = addedNodes[i];
                    if (node.nodeType === Node.ELEMENT_NODE && node.matches('div.info-text *')) {
                        node.addEventListener('click', function() {
                            var description = this.querySelector('.info-title').innerText;
                            var link = this.querySelector('.title').href;
                            var modifiedLink = link.split('?')[0];
                            var clipboardContent = `【${description}】${modifiedLink}`;
                            navigator.clipboard.writeText(clipboardContent)
                                .then(() => {
                                    console.log('Modified clipboard content:', clipboardContent);
                                })
                                .catch((error) => {
                                    console.error('Failed to modify clipboard content:', error);
                                });
                        });
                    }
                }
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
```

This script adds a click listener to each element that matches the selector `div.info-text *`. When the element is clicked, the listener extracts the description and the link from the clicked element using `querySelector`. The link is then modified to remove any tracking parameters (by splitting the string at the `?` character and taking only the first part). The modified link and the description are combined into a new string, which is then copied to the clipboard using `navigator.clipboard.writeText`.

I hope this helps! Let me know if you have any further questions or if there's anything else I can do to assist you.

## You

Maybe I've said it wrong somekind, the Description is not shown in the page, so it's not good to select any innertext, the same with link.
Actually, I want the script to read the clipboard first, modify, an then write it back.

## ChatGPT

I see, thank you for clarifying that. In that case, you can use the `navigator.clipboard.readText()` method to read the content of the clipboard, modify it, and then write it back using the `navigator.clipboard.writeText()` method.

Here's an updated version of the script that reads the clipboard content, modifies it to remove any tracking parameters from the link, and then writes it back to the clipboard:

```javascript
// ==UserScript==
// @name         Bilibili Info-text Click Logger with Clipboard Modification
// @namespace    https://www.example.com/
// @version      1.0
// @description  Logs clicks on div.info-text and its sub-tags on bilibili video pages using MutationObserver and modifies the clipboard content on click
// @match        http://www.bilibili.com/video/*
// @match        https://www.bilibili.com/video/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var observer = new MutationObserver(function(mutationsList, observer) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                var addedNodes = mutation.addedNodes;
                for (var i = 0; i < addedNodes.length; i++) {
                    var node = addedNodes[i];
                    if (node.nodeType === Node.ELEMENT_NODE && node.matches('div.info-text *')) {
                        node.addEventListener('click', async function() {
                            try {
                                var clipboardContent = await navigator.clipboard.readText();
                                var modifiedClipboardContent = modifyClipboardContent(clipboardContent);
                                await navigator.clipboard.writeText(modifiedClipboardContent);
                                console.log('Modified clipboard content:', modifiedClipboardContent);
                            } catch (error) {
                                console.error('Failed to modify clipboard content:', error);
                            }
                        });
                    }
                }
            }
        }
    });

    observer.observe(document.body, {
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
```

This script defines a new function called `modifyClipboardContent()` that takes the content of the clipboard as a parameter, modifies it to remove any tracking parameters from the link, and returns the modified content.

When an element matching the selector `div.info-text *` is clicked, the listener calls `navigator.clipboard.readText()` to read the content of the clipboard, passes it to `modifyClipboardContent()` to modify the link, and then calls `navigator.clipboard.writeText()` to write the modified content back to the clipboard.

I hope this updated script is more helpful for your needs. Please let me know if you have any further questions or concerns.

## You

Yes, this version works neat and tidy, Thanks

## ChatGPT

You're welcome! I'm glad to hear it works well for you. Don't hesitate to ask if you have any other questions or need further assistance.

## You

Now I want the script to wait for 1s then modify the clipboard, your code should base on the following given code:

``` JavaScript
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
                                    setTimeout(function(navigator){
                                    },1000)
                                    var clipboardContent = await navigator.clipboard.readText();
                                    var modifiedClipboardContent = modifyClipboardContent(clipboardContent);
                                    await navigator.clipboard.writeText(modifiedClipboardContent);
                                    console.log('[NSLC][BiliBili][跟踪参数去除]新链接已写入剪贴板：', modifiedClipboardContent);
                                } catch (error) {
                                    console.error('[NSLC][BiliBili][跟踪参数去除]失败，参见错误信息', error);
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
```

## ChatGPT

Sure, here's the modified code with a 1-second delay before modifying the clipboard:

```javascript
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
                                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
                                var clipboardContent = await navigator.clipboard.readText();
                                var modifiedClipboardContent = modifyClipboardContent(clipboardContent);
                                await navigator.clipboard.writeText(modifiedClipboardContent);
                                console.log('[NSLC][BiliBili][跟踪参数去除]新链接已写入剪贴板：', modifiedClipboardContent);
                            } catch (error) {
                                console.error('[NSLC][BiliBili][跟踪参数去除]失败，参见错误信息', error);
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
```

I added a `await new Promise(resolve => setTimeout(resolve, 1000));` statement to wait for 1 second before modifying the clipboard. Let me know if you have any questions!

## You

That looks good!

## ChatGPT

Great! I'm glad I could help. If you have any more questions or need further assistance, feel free to ask!

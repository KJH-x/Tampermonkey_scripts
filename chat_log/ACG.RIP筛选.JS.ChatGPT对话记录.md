# ACG RIP Size Highlighter

## You

写一个tampermonkey的脚本，用Javascript语言：
匹配：<http://acg.rip/*；https://acg.rip/*>
在页面加载完全后、在页面开始动态加载后，执行：
搜索所有<td class="size">，如果其正文中含有`GB`，将其格式变为：红色加粗高亮

## ChatGPT

以下是一个可以实现您要求的Tampermonkey脚本：

```javascript
// ==UserScript==
// @name         ACG RIP Size Highlighter
// @namespace    acg_rip_size_highlighter
// @version      1
// @description  Highlight file sizes in GB on ACG RIP website in red, bold and with yellow background color. 
// @match        http://acg.rip/*
// @match        https://acg.rip/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    function highlightSizes() {
        const sizeElements = document.querySelectorAll('td.size');
        for (let i = 0; i < sizeElements.length; i++) {
            const sizeElement = sizeElements[i];
            const sizeText = sizeElement.textContent.trim();
            if (sizeText.endsWith('GB')) {
                sizeElement.style.color = 'red';
                sizeElement.style.fontWeight = 'bold';
                sizeElement.style.backgroundColor = 'yellow';
            }
        }
    }
    
    // Highlight sizes on page load
    window.addEventListener('load', highlightSizes);
    
    // Highlight sizes on dynamic page updates
    const observer = new MutationObserver(highlightSizes);
    observer.observe(document.body, { childList: true, subtree: true });
})();
```

这个脚本使用`querySelectorAll()`方法来查找所有`td`元素并使用`size`类进行过滤，然后遍历这些元素并检查它们的文本内容是否以`GB`结尾。如果是，就将其颜色设置为红色、字重设置为粗体、背景颜色设置为黄色。然后，它会监听页面加载完成和页面更新事件，以便在页面内容更新时重新高亮文件大小。

要使用这个脚本，您需要在浏览器中安装Tampermonkey插件，并将以上代码复制到Tampermonkey的新脚本编辑器中。

## You

亮红色过于刺眼，改为#78082a

## ChatGPT

当然，您可以将脚本中的红色颜色代码改为#78082a或其他您喜欢的颜色代码，来符合您的需求。以下是修改后的代码：

```javascript
// ==UserScript==
// @name         ACG RIP Size Highlighter
// @namespace    acg_rip_size_highlighter
// @version      1
// @description  Highlight file sizes in GB on ACG RIP website in #78082a color, bold and with yellow background color. 
// @match        http://acg.rip/*
// @match        https://acg.rip/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    function highlightSizes() {
        const sizeElements = document.querySelectorAll('td.size');
        for (let i = 0; i < sizeElements.length; i++) {
            const sizeElement = sizeElements[i];
            const sizeText = sizeElement.textContent.trim();
            if (sizeText.endsWith('GB')) {
                sizeElement.style.color = '#78082a';
                sizeElement.style.fontWeight = 'bold';
                sizeElement.style.backgroundColor = 'yellow';
            }
        }
    }
    
    // Highlight sizes on page load
    window.addEventListener('load', highlightSizes);
    
    // Highlight sizes on dynamic page updates
    const observer = new MutationObserver(highlightSizes);
    observer.observe(document.body, { childList: true, subtree: true });
})();
```

您只需要将`sizeElement.style.color`的值改为`#78082a`即可。

## You

已知此td标签文本中表示的是文件的大小，在前述基础上，增加条件：
单位是GB且大小大于2GB

## ChatGPT

好的，以下是修改后的脚本，满足您的要求：

```javascript
// ==UserScript==
// @name         ACG RIP Size Highlighter
// @namespace    acg_rip_size_highlighter
// @version      1
// @description  Highlight file sizes in GB on ACG RIP website in #78082a color, bold and with yellow background color, if they are larger than 2GB. 
// @match        http://acg.rip/*
// @match        https://acg.rip/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    function highlightSizes() {
        const sizeElements = document.querySelectorAll('td.size');
        for (let i = 0; i < sizeElements.length; i++) {
            const sizeElement = sizeElements[i];
            const sizeText = sizeElement.textContent.trim();
            if (sizeText.endsWith('GB')) {
                const sizeValue = parseFloat(sizeText);
                if (sizeValue > 2) {
                    sizeElement.style.color = '#78082a';
                    sizeElement.style.fontWeight = 'bold';
                    sizeElement.style.backgroundColor = 'yellow';
                }
            }
        }
    }
    
    // Highlight sizes on page load
    window.addEventListener('load', highlightSizes);
    
    // Highlight sizes on dynamic page updates
    const observer = new MutationObserver(highlightSizes);
    observer.observe(document.body, { childList: true, subtree: true });
})();
```

这个脚本增加了一个条件判断，如果文件大小以`GB`为单位且大于2GB，那么才进行高亮。

## You

高亮改写逻辑改为对所在<tr>操作

## ChatGPT

好的，以下是修改后的脚本，满足您的要求：

```javascript
// ==UserScript==
// @name         ACG RIP Size Highlighter
// @namespace    acg_rip_size_highlighter
// @version      1
// @description  Highlight file sizes in GB on ACG RIP website in #78082a color, bold and with yellow background color, if they are larger than 2GB. 
// @match        http://acg.rip/*
// @match        https://acg.rip/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    function highlightSizes() {
        const sizeElements = document.querySelectorAll('td.size');
        for (let i = 0; i < sizeElements.length; i++) {
            const sizeElement = sizeElements[i];
            const sizeText = sizeElement.textContent.trim();
            if (sizeText.endsWith('GB')) {
                const sizeValue = parseFloat(sizeText);
                if (sizeValue > 2) {
                    const trElement = sizeElement.parentElement;
                    trElement.style.color = '#78082a';
                    trElement.style.fontWeight = 'bold';
                    trElement.style.backgroundColor = 'yellow';
                }
            }
        }
    }
    
    // Highlight sizes on page load
    window.addEventListener('load', highlightSizes);
    
    // Highlight sizes on dynamic page updates
    const observer = new MutationObserver(highlightSizes);
    observer.observe(document.body, { childList: true, subtree: true });
})();
```

这个脚本修改了高亮的逻辑，现在会对包含符合条件的文件大小的整个`<tr>`标签进行高亮，而不是只对`<td>`标签进行高亮。

// ==UserScript==
// @name         [NSLC][TJUPT]拾荒者
// @namespace    http://tampermonkey.net/
// @version      2024-05-25
// @description  Hight Light What U Like
// @author       NSLC
// @match        https://www.tjupt.org/torrents.php*
// @match        https://tjupt.org/torrents.php*
// @icon         https://www.tjupt.org/assets/favicon/favicon.png
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var logSignCSS = 'background: #990066; color: #FFFFFF';
    var logFunctionCSS = 'background: #663366; color: #FFFFFF';

    // 定义正则表达式列表，每个对象包含相对XPath和匹配规则
    var regexList = [
        {
            xpath: './/td/table/tbody/tr/td/a/b',
            regex: /.*TV.*Fin.*/,
            bgcolor: 'yellow'
        },
        {
            xpath: './/td/table/tbody/tr/td/a/b',
            regex: /.*连载.*/,
            bgcolor: 'grey'
        },
        {
            xpath: './/td/table/tbody/tr/td',
            regex: /.*网络收费短剧.*/,
            bgcolor: 'black'
        }
        // 可以在这里添加更多的对象，每个对象包含一个相对XPath和一个匹配规则
    ];

    // 定义需要执行的操作
    function Actions() {

        // 搜索所有结果（table/tr）
        var elements = document.evaluate(
            '/html/body/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr',
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );

        // 遍历找到的所有元素
        for (var i = 0; i < elements.snapshotLength; i++) {
            var element = elements.snapshotItem(i);

            if (element.style.backgroundColor === 'yellow' || element.style.backgroundColor === 'grey'|| element.style.backgroundColor === 'black' ) {
                continue; // 如果已经高亮，跳过
            }

            // 遍历正则表达式列表
            for (var k = 0; k < regexList.length; k++) {
                var regexObj = regexList[k];

                // 获取子元素并检查其文本
                var subElements = document.evaluate(
                    regexObj.xpath,
                    element,
                    null,
                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                    null
                );

                for (var j = 0; j < subElements.snapshotLength; j++) {
                    var subElement = subElements.snapshotItem(j);
                    var textContent = subElement.textContent;
                    const targetColor = regexObj.bgcolor;

                    if (regexObj.regex.test(textContent)) {
                        console.log(`%c[NSLC][TJUPT]%c[TITLE]%c Matched`, logSignCSS, logFunctionCSS, ``);
                        // 如果匹配正则表达式，改变父元素的背景颜色
                        element.style.backgroundColor = targetColor;
                        // 已知的 tr 元素element
                        // 获取此 tr 节点下的所有满足 td/table/tbody/tr 路径的元素
                        var targetRows = element.querySelectorAll('td > table > tbody > tr');
                        // 遍历这些目标 tr 元素并更改背景颜色
                        targetRows.forEach(function(row) {
                            row.style.backgroundColor = targetColor;
                        });
                        break; // 一旦匹配就不再检查其他子元素
                    }
                }
            }

            // 文件大小高亮
            var sizeBoxElements = element.querySelectorAll('td.rowfollow');
            sizeBoxElements.forEach(function (sizeBoxElement) {
                // 检查是否已经设置
                if (sizeBoxElement.style.backgroundColor === 'lightgreen' || sizeBoxElement.style.backgroundColor === 'lightcoral' || sizeBoxElement.style.backgroundColor === 'lightyellow') {
                    return;
                }
                var sizeText = sizeBoxElement.innerHTML.trim();
                var sizeParts = sizeText.split('<br>');
                if (sizeParts.length === 2) {
                    var sizeValue = parseFloat(sizeParts[0]);
                    var sizeUnit = sizeParts[1].trim();
                    if (sizeUnit === 'MiB' && sizeValue > 200 && sizeValue < 600) {
                        console.log(`%c[NSLC][TJUPT]%c[SIZE]%c 400 MiB > x > 20 0MiB`, logSignCSS, logFunctionCSS, ``);
                        sizeBoxElement.style.backgroundColor = 'lightgreen';
                    }else if (sizeUnit === 'GiB' && sizeValue > 50) {
                        console.log(`%c[NSLC][TJUPT]%c[SIZE]%c ... > x > 50 GiB`, logSignCSS, logFunctionCSS, ``);
                        sizeBoxElement.style.backgroundColor = 'lightcoral';
                    }else if (sizeUnit === 'MiB' && sizeValue > 600 ) {
                        console.log(`%c[NSLC][TJUPT]%c[SIZE]%c 1.0 GiB > x > 600 MiB`, logSignCSS, logFunctionCSS, ``);
                        sizeBoxElement.style.backgroundColor = 'lightyellow';
                    }
                }

            });

            // Seeder 高亮
            var seederCountElements = element.querySelectorAll('td.rowfollow[align="center"] > b > a');
            seederCountElements.forEach(function (seederCountElement) {
                // 检查是否已经设置
                if (seederCountElement.style.color === 'lightgreen' || seederCountElement.style.color === 'lightyellow') {
                    return;
                }
                var numberValue = parseFloat(seederCountElement.textContent);
                if (numberValue > 50) {
                    console.log(`%c[NSLC][TJUPT]%c[Seeders]%c > 50`, logSignCSS, logFunctionCSS, ``);
                    seederCountElement.style.color = 'lightgreen';
                    seederCountElement.parentElement.parentElement.style.backgroundColor = 'lightcoral'; // 设置背景色为亮红色
                } else if (numberValue > 15) {
                    console.log(`%c[NSLC][TJUPT]%c[Seeders]%c > 15`, logSignCSS, logFunctionCSS, ``);
                    seederCountElement.style.color = 'lightyellow';
                    seederCountElement.parentElement.parentElement.style.backgroundColor = 'lightcoral'; // 设置背景色为亮红色
                }

            });

        }
    }

    // 页面加载完成时执行
    window.addEventListener('load', Actions);

    // 在动态页面更新时执行
    const observer = new MutationObserver(Actions);
    observer.observe(document.body, { childList: true, subtree: true });

    // 每三秒检查一次DOM
    setInterval(Actions, 2000);
})();

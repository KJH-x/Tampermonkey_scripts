
# Tampermonkey脚本 TypeScript.

#### You:
请按照要求写一个tampermonkey脚本，用typescript语言：
在页面中找到a标签：含有正文：`签到领奖！`，模拟点击它，并在控制台中打印日志

#### ChatGPT:
以下是一个使用TypeScript编写的Tampermonkey脚本，它会在页面中查找带有"签到领奖！"文本的a标签，并模拟点击它。当点击完成后，脚本将在浏览器控制台中打印一条日志信息。

```typescript
// ==UserScript==
// @name         Click Sign-in Button Automatically
// @namespace    http://tampermonkey
// @version      1.0
// @description  Automatically click the sign-in button when it appears on the page and print a log message to the console
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const sign_in_button_text = "签到领奖！";

    const sign_in_button = Array.from(document.getElementsByTagName("a")).find(a => a.textContent === sign_in_button_text);

    if (sign_in_button) {
        sign_in_button.click();
        console.log(`Clicked on ${sign_in_button_text} button`);
    } else {
        console.log(`Couldn't find ${sign_in_button_text} button`);
    }
})();
```

你需要将此代码保存为一个`.ts`文件，然后使用TypeScript编译器（或集成开发环境）将其编译为JavaScript。接下来，你可以将编译后的JavaScript代码复制到Tampermonkey脚本编辑器中，并保存。当你在访问页面时，如果页面上有符合条件的a标签，脚本将会模拟点击，并在浏览器控制台中打印出相应的日志信息。


#### You:
改使用Javascript语言编写

#### ChatGPT:
以下是使用JavaScript编写的Tampermonkey脚本，它会在页面中查找带有"签到领奖！"文本的a标签，并模拟点击它。当点击完成后，脚本将在浏览器控制台中打印一条日志信息。

```javascript
// ==UserScript==
// @name         Click Sign-in Button Automatically
// @namespace    http://tampermonkey
// @version      1.0
// @description  Automatically click the sign-in button when it appears on the page and print a log message to the console
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const sign_in_button_text = "签到领奖！";

    const sign_in_button = Array.from(document.getElementsByTagName("a")).find(a => a.textContent === sign_in_button_text);

    if (sign_in_button) {
        sign_in_button.click();
        console.log(`Clicked on ${sign_in_button_text} button`);
    } else {
        console.log(`Couldn't find ${sign_in_button_text} button`);
    }
})();
```

你可以将以上代码复制到Tampermonkey脚本编辑器中，然后保存。当你在访问页面时，如果页面上有符合条件的a标签，脚本将会模拟点击，并在浏览器控制台中打印出相应的日志信息。


#### You:
等到页面完全加载再点击

#### ChatGPT:
以下是一个修改后的Tampermonkey脚本，它会等待页面完全加载之后再查找带有"签到领奖！"文本的a标签，并模拟点击它。当点击完成后，脚本将在浏览器控制台中打印一条日志信息。

```javascript
// ==UserScript==
// @name         Click Sign-in Button Automatically
// @namespace    http://tampermonkey
// @version      1.0
// @description  Automatically click the sign-in button when it appears on the page and print a log message to the console
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const sign_in_button_text = "签到领奖！";

    window.addEventListener('load', function() {
        const sign_in_button = Array.from(document.getElementsByTagName("a")).find(a => a.textContent === sign_in_button_text);

        if (sign_in_button) {
            sign_in_button.click();
            console.log(`Clicked on ${sign_in_button_text} button`);
        } else {
            console.log(`Couldn't find ${sign_in_button_text} button`);
        }
    });
})();
```

你可以将以上代码复制到Tampermonkey脚本编辑器中，然后保存。当你在访问页面时，脚本将会等待页面完全加载之后再查找带有"签到领奖！"文本的a标签，并模拟点击它。当点击完成后，脚本将在浏览器控制台中打印出相应的日志信息。


#### You:
接下来，等待一秒钟，点击标签
<li id="kx" onclick="Icon_selected(this.id)" fwin="dsu_paulsign">

#### ChatGPT:
以下是一个修改后的Tampermonkey脚本，它会等待页面完全加载之后，查找带有"签到领奖！"文本的a标签，并模拟点击它。之后，脚本将等待1秒钟，然后查找id为"kx"的li标签，并模拟点击它。

```javascript
// ==UserScript==
// @name         Click Sign-in Button Automatically
// @namespace    http://tampermonkey
// @version      1.0
// @description  Automatically click the sign-in button and another button when they appear on the page and print a log message to the console
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const sign_in_button_text = "签到领奖！";

    window.addEventListener('load', function() {
        const sign_in_button = Array.from(document.getElementsByTagName("a")).find(a => a.textContent === sign_in_button_text);

        if (sign_in_button) {
            sign_in_button.click();
            console.log(`Clicked on ${sign_in_button_text} button`);

            setTimeout(function() {
                const kx_button = document.getElementById("kx");

                if (kx_button) {
                    kx_button.click();
                    console.log("Clicked on kx button");
                } else {
                    console.log("Couldn't find kx button");
                }
            }, 1000);
        } else {
            console.log(`Couldn't find ${sign_in_button_text} button`);
        }
    });
})();
```

你可以将以上代码复制到Tampermonkey脚本编辑器中，然后保存。当你在访问页面时，脚本将会等待页面完全加载之后，查找带有"签到领奖！"文本的a标签，并模拟点击它。之后，脚本将等待1秒钟，然后查找id为"kx"的li标签，并模拟点击它。当点击完成后，脚本将在浏览器控制台中打印出相应的日志信息。


#### You:
在点击玩<li>标签后，等待一秒，继续寻找并点击
<input type="radio" name="qdmode" value="3">，三个属性都要完全匹配

#### ChatGPT:
以下是一个修改后的Tampermonkey脚本，它会等待页面完全加载之后，查找带有"签到领奖！"文本的a标签，并模拟点击它。之后，脚本将等待1秒钟，然后查找id为"kx"的li标签，并模拟点击它。当点击完成后，脚本将等待1秒钟，然后查找name属性为"qdmode"、value属性为"3"的input标签，并模拟点击它。

```javascript
// ==UserScript==
// @name         Click Sign-in Button Automatically
// @namespace    http://tampermonkey
// @version      1.0
// @description  Automatically click the sign-in button and another two buttons when they appear on the page and print a log message to the console
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const sign_in_button_text = "签到领奖！";

    window.addEventListener('load', function() {
        const sign_in_button = Array.from(document.getElementsByTagName("a")).find(a => a.textContent === sign_in_button_text);

        if (sign_in_button) {
            sign_in_button.click();
            console.log(`Clicked on ${sign_in_button_text} button`);

            setTimeout(function() {
                const kx_button = document.getElementById("kx");

                if (kx_button) {
                    kx_button.click();
                    console.log("Clicked on kx button");

                    setTimeout(function() {
                        const qdmode_radio_button = document.querySelector('input[name="qdmode"][value="3"]');

                        if (qdmode_radio_button) {
                            qdmode_radio_button.click();
                            console.log("Clicked on qdmode radio button");
                        } else {
                            console.log("Couldn't find qdmode radio button");
                        }
                    }, 1000);
                } else {
                    console.log("Couldn't find kx button");
                }
            }, 1000);
        } else {
            console.log(`Couldn't find ${sign_in_button_text} button`);
        }
    });
})();
```

你可以将以上代码复制到Tampermonkey脚本编辑器中，然后保存。当你在访问页面时，脚本将会等待页面完全加载之后，查找带有"签到领奖！"文本的a标签，并模拟点击它。之后，脚本将等待1秒钟，然后查找id为"kx"的li标签，并模拟点击它。当点击完成后，脚本将等待1秒钟，然后查找name属性为"qdmode"、value属性为"3"的input标签，并模拟点击它。当点击完成后，脚本将在浏览器控制台中打印出相应的日志信息。


#### You:
在点击完<input>后，等待0.5秒，查找点击
<button type="button" class="pn pnc" onclick="showWindow('qwindow', 'qiandao', 'post', '0');return false"><strong>点我签到</strong></button>

#### ChatGPT:
以下是修改后的Tampermonkey脚本，它会等待页面完全加载之后，查找带有"签到领奖！"文本的a标签，并模拟点击它。之后，脚本将等待1秒钟，然后查找id为"kx"的li标签，并模拟点击它。当点击完成后，脚本将等待1秒钟，然后查找name属性为"qdmode"、value属性为"3"的input标签，并模拟点击它。当点击完成后，脚本将等待0.5秒钟，然后查找class为"pn pnc"的button标签，并模拟点击它。

```javascript
// ==UserScript==
// @name         Click Sign-in Button Automatically
// @namespace    http://tampermonkey
// @version      1.0
// @description  Automatically click the sign-in button and another two buttons when they appear on the page and print a log message to the console
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const sign_in_button_text = "签到领奖！";

    window.addEventListener('load', function() {
        const sign_in_button = Array.from(document.getElementsByTagName("a")).find(a => a.textContent === sign_in_button_text);

        if (sign_in_button) {
            sign_in_button.click();
            console.log(`Clicked on ${sign_in_button_text} button`);

            setTimeout(function() {
                const kx_button = document.getElementById("kx");

                if (kx_button) {
                    kx_button.click();
                    console.log("Clicked on kx button");

                    setTimeout(function() {
                        const qdmode_radio_button = document.querySelector('input[name="qdmode"][value="3"]');

                        if (qdmode_radio_button) {
                            qdmode_radio_button.click();
                            console.log("Clicked on qdmode radio button");

                            setTimeout(function() {
                                const qiandao_button = document.querySelector('button.pn.pnc');

                                if (qiandao_button) {
                                    qiandao_button.click();
                                    console.log("Clicked on qiandao button");
                                } else {
                                    console.log("Couldn't find qiandao button");
                                }
                            }, 500);
                        } else {
                            console.log("Couldn't find qdmode radio button");
                        }
                    }, 1000);
                } else {
                    console.log("Couldn't find kx button");
                }
            }, 1000);
        } else {
            console.log(`Couldn't find ${sign_in_button_text} button`);
        }
    });
})();
```

你可以将以上代码复制到Tampermonkey脚本编辑器中，然后保存。当你在访问页面时，脚本将会等待页面完全加载之后，查找带有"签到领奖！"文本的a标签，并模拟点击它。之后，脚本将等待1秒钟，然后查找id为"kx"的li标签，并模拟点击它。当点击完成后，脚本将等待1秒钟，然后查找name属性为"qdmode"、value属性为"3"的input标签，并模拟点击它。当点击完成后，脚本将等待0.

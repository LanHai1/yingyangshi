/**
 * 获取元素
 * @param {*} value 
 */
let fJquery = (value) => {
    let res = null;
    if (/>/.test(value)) {
        let arr = value.split(/>|\s/);
        let res1 = "document";
        for (let i = 0; i < arr.length; i++) {
            switch (arr[i][0]) {
                case ".":
                    arr[i] = arr[i].replace(".", "")
                    res1 += `.getElementsByClassName("${arr[i]}")[0]`;
                    break;
                case "#":
                    arr[i] = arr[i].replace("#", "")
                    res1 += `.getElementById("${arr[i]}")`;
                    break;
                default:
                    res1 += document.getElementsByTagName(arr[i]).length == 0 ? "null" : `.getElementsByTagName("${arr[i]}")[0]`;
                    break;
            }
        }
        /\[0]$/.test(res1) ? res1 = res1.substring(0, res1.length - 3) : "";
        return eval(res1);
    }

    switch (value[0]) {
        case ".":
            value = value.replace(".", "")
            res = document.getElementsByClassName(value);
            break;
        case "#":
            value = value.replace("#", "")
            res = document.getElementById(value);
            break;
        default:
            res = document.getElementsByTagName(value).length == 0 ? "null" : document.getElementsByTagName(value);
            break;
    }
    return res;
}

/**
 * 缓动动画
 * @param {element} el 
 * @param {attributeJson{key:value}} attrs 
 * @param {fn} callback 
 */
function animation_s(el, attrs, callback) {
    clearInterval(el.timeId);
    el.timeId = setInterval(() => {
        let flag = true;
        for (const key in attrs) {
            if (key == "opacity") {
                let current = +(window.getComputedStyle(el)[key]) * 100;
                let target = attrs[key] * 100;
                let temp = target > current ? Math.ceil((target - current) / 10) : Math.floor((target - current) / 10);
                current += temp;

                current = current / 100;
                el.style[key] = `${current}`;
                if (target / 100 != current) {
                    flag = false;
                }
            } else {
                let current = parseInt(window.getComputedStyle(el)[key]);
                let target = attrs[key];
                let temp = target > current ? Math.ceil((target - current) / 10) : Math.floor((target - current) / 10);
                current += temp;
                el.style[key] = `${current}px`;
                if (target != current) {
                    flag = false;
                }
            }
        }
        if (flag) {
            clearInterval(el.timeId);
            if (callback instanceof Function) {
                callback();
            }
        }
    }, 20)
}
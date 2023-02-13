const rightMenu = () => {
    return {
        inserted: (el, binding, vnode) => {
            //获取vue实例对象
            let vm = vnode.context;
            let showFlag = true;
            vnode = vnode.elm;
            //阻止默认浏览器的右键菜单
            el.oncontextmenu = event => {
                event.preventDefault();
            };
            el.onmouseup = event => {
                console.log(binding.value);
                if (event.button === 2) {
                    var posX = 0,
                        posY = 0;
                    if (event.pageX || event.pageY) {
                        posX = event.pageX;
                        posY = event.pageY;
                    } else if (event.clientX || event.clientY) {
                        posX = event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
                        posY = event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
                    }
                    var divEl = document.createElement('div');
                    divEl.innerHTML = `<div>123</div>`;
                    divEl.setAttribute('style', `position: absolute; top: ${posY}px; left: ${posX}px`);
                    divEl.setAttribute('onclick', "javascript:alert('This is a test!');");
                    document.body.appendChild(divEl);
                }
            };
            document.onmouseup = () => {
                if (showFlag) {
                    vm.menuShow = false;
                }
                showFlag = true;
            };
        }
    };
};

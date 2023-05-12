/** @format */

export default () => {
  return {
    inserted(el, binding, vNode) {
      const dragDom = el; // 被拖拽的元素
      // 更改鼠标样式
      el.style.cursor = 'move';

      // 判断元素上是否存在position属性，如果存在，判断是否为absolute，如果不是absolute则设置为absolute
      !el.style.position && (el.style.position = 'absolute');

      // 鼠标按下事件
      el.onmousedown = (e) => {
        // 移动时禁止选中
        document.onselectstart = () => false;

        e = e || window.event;
        const target = e.target || e.srcElement;

        const elParent = target.parentNode;

        // 计算出鼠标相对元素的位置
        const disX = e.clientX - dragDom.offsetLeft;
        const disY = e.clientY - dragDom.offsetTop;

        // 获取可移动区域
        const maxX = elParent.offsetWidth - dragDom.offsetWidth;
        const maxY = elParent.offsetHeight - dragDom.offsetHeight;

        // 忽略margin大小
        const dragDomMarginLeft = Number(window.getComputedStyle(dragDom).marginLeft.replace(/\px/g, ''));
        const dragDomMarginTop = Number(window.getComputedStyle(dragDom).marginTop.replace(/\px/g, ''));

        document.onmousemove = (e) => {
          // 通过事件委托，计算移动的距离
          let l = e.clientX - disX;
          let t = e.clientY - disY;

          // 限制元素可拖动的范围
          if (l < 0) {
            l = 0;
          } else if (l > maxX) {
            l = maxX;
          }

          if (t < 0) {
            t = 0;
          } else if (t > maxY) {
            t = maxY;
          }

          // 移动当前元素
          dragDom.style.left = `${l - dragDomMarginLeft}px`;
          dragDom.style.top = `${t - dragDomMarginTop}px`;
        };
        // 鼠标抬起事件
        document.onmouseup = (e) => {
          document.onselectstart = () => true;

          document.onmousemove = null;
          document.onmouseup = null;
        };
      };

      return false;
    }
  };
};

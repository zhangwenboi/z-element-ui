/** @format */

const dialogDrag = () => {
  return {
    bind(el, binding) {
      // if (!binding.value) return;
      const dialogHeaderEl = el.querySelector('.el-dialog__header');
      const dragDom = el.querySelector('.el-dialog');
      dialogHeaderEl.style.cursor = 'move';

      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
      const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

      dialogHeaderEl.onmousedown = (e) => {
        document.onselectstart = () => false;
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft;
        const disY = e.clientY - dialogHeaderEl.offsetTop;

        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;

        const maxX = innerWidth - dragDom.offsetWidth;
        const maxY = innerHeight - dragDom.offsetHeight;
        // 忽略margin大小
        const dragDomMarginLeft = Number(window.getComputedStyle(dragDom).marginLeft.replace(/\px/g, ''));
        const dragDomMarginTop = Number(window.getComputedStyle(dragDom).marginTop.replace(/\px/g, ''));

        // 获取到的值带px 正则匹配替换
        let styL, styT;

        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (sty.left.includes('%')) {
          // eslint-disable-next-line no-useless-escape
          styL = Number(innerWidth) * (Number(sty.left.replace(/\%/g, '')) / 100);
          // eslint-disable-next-line no-useless-escape
          styT = Number(innerHeight) * (Number(sty.top.replace(/\%/g, '')) / 100);
        } else {
          styL = Number(sty.left.replace(/\px/g, ''));
          styT = Number(sty.top.replace(/\px/g, ''));
        }

        document.onmousemove = function (e) {
          // 通过事件委托，计算移动的距离
          const l = e.clientX - disX;
          const t = e.clientY - disY;

          // 移动范围
          let left = l + styL;

          let top = t + styT;

          if (left < -dragDomMarginLeft) {
            left = -dragDomMarginLeft;
          } else if (left > maxX - dragDomMarginLeft) {
            left = maxX - dragDomMarginLeft;
          }

          if (top < -dragDomMarginTop) {
            top = -dragDomMarginTop;
          } else if (top > maxY - dragDomMarginTop) {
            top = maxY - dragDomMarginTop;
          }

          // 移动当前元素
          dragDom.style.left = `${left}px`;
          dragDom.style.top = `${top}px`;

          // 将此时的位置传出去
          // binding.value({x:e.pageX,y:e.pageY})
        };
        document.onmouseup = function (e) {
          document.onselectstart = () => true;

          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  };
};
export default dialogDrag;

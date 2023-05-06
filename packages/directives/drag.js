/** @format */

export default () => {
  return {
    bind(el, binding, vNode) {
      // 获取要拖拽的元素
      const dragDom = el;
      // 获取当前组件的根元素
      const dragDomParent = dragDom.parentNode;

      // 获取当前组件的根元素的宽度
      const dragDomParentWidth = dragDomParent.offsetWidth;
      // 获取当前组件的根元素的高度
      const dragDomParentHeight = dragDomParent.offsetHeight;

      // 获取当前组件的宽度
      const dragDomWidth = dragDom.offsetWidth;
      // 获取当前组件的高度
      const dragDomHeight = dragDom.offsetHeight;

      // 获取当前组件的左边距
      const dragDomLeft = dragDom.offsetLeft;
      // 获取当前组件的上边距
      const dragDomTop = dragDom.offsetTop;

      // 忽略计算拖拽元素 margin
      const dragDomMarginLeft = parseInt(window.getComputedStyle(dragDom).marginLeft);
      const dragDomMarginTop = parseInt(window.getComputedStyle(dragDom).marginTop);

      // 主要逻辑
      // 鼠标按下事件
      dragDom.onmousedown = (e) => {
        e.preventDefault();
        document.onselectstart = () => false;

        // 设置当前组件的样式
        dragDom.style.position = 'absolute';
        dragDom.style.left = `${dragDomLeft}px`;
        dragDom.style.top = `${dragDomTop}px`;
        dragDom.style.width = `${dragDomWidth}px`;
        dragDom.style.height = `${dragDomHeight}px`;

        // 设置鼠标样式
        dragDom.style.cursor = 'move';
        // 获取鼠标在当前组件内的坐标
        const mouseInDomX = e.clientX - dragDomLeft;
        const mouseInDomY = e.clientY - dragDomTop;

        // 鼠标移动事件
        document.onmousemove = (e) => {
          // 阻止默认事件
          e.preventDefault();
          // 组织鼠标移动时选中文字

          // 当前组件所处的坐标
          const dragDomX = e.clientX - mouseInDomX;
          const dragDomY = e.clientY - mouseInDomY;

          // 当前组件的最大坐标
          const dragDomMaxX = dragDomParentWidth - dragDomWidth - dragDomMarginLeft;
          const dragDomMaxY = dragDomParentHeight - dragDomHeight - dragDomMarginTop;

          // 当前组件的最小坐标
          const dragDomMinX = -dragDomMarginLeft;
          const dragDomMinY = -dragDomMarginTop;

          // 当前组件的坐标

          if (dragDomX < dragDomMinX) {
            dragDom.style.left = `${dragDomMinX}px`;
          } else if (dragDomX > dragDomMaxX) {
            dragDom.style.left = `${dragDomMaxX}px`;
          } else {
            dragDom.style.left = `${dragDomX}px`;
          }

          if (dragDomY < dragDomMinY) {
            dragDom.style.top = `${dragDomMinY}px`;
          } else if (dragDomY > dragDomMaxY) {
            dragDom.style.top = `${dragDomMaxY}px`;
          } else {
            dragDom.style.top = `${dragDomY}px`;
          }
        };
      };

      // 鼠标抬起事件
      document.onmouseup = () => {
        document.onselectstart = () => true;

        dragDom.style.cursor = 'default';
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  };
};

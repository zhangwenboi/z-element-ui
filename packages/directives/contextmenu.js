/** @format */
import Vue from 'vue';
import { isVNode } from 'element-ui/src/utils/vdom';
const contextmenu = () => {
  return {
    inserted: (el, binding, vnode) => {
      //获取vue实例对象
      let vm = vnode.context;
      vnode = vnode.elm;
      let $menu = document.getElementById('contextmenu_z_element_ui_1');

      const { value: menuData } = binding;

      //阻止默认浏览器的右键菜单
      el.oncontextmenu = (event) => {
        event.preventDefault();
        event.stopPropagation();

        // 将menu添加到body
        const top = event.clientY + 'px';
        const left = event.clientX + 'px';

        $menu.style.top = top;
        $menu.style.left = left;
        $menu.style.zIndex = 9999;
        $menu.style.position = 'fixed';

        document.body.appendChild($menu);
      };
      el.onmousedown = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.button !== 2) return;
      };
      el.onmouseup = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.button !== 2) return;

        if (!menuData) {
          throw new Error('menu is required');
        }

        if (!$menu) {
          $menu = document.createElement('div');
          $menu.setAttribute('id', 'contextmenu_z_element_ui_1');
        } else {
          // 删除menu的所有子节点
          while ($menu.hasChildNodes()) {
            $menu.removeChild($menu.firstChild);
          }
        }

        // 判断menuData是否为Vnode 或者是函数
        if (typeof menuData === 'function' || isVNode(menuData)) {
          // 将vnode转换为真实dom
          const instance = Vue.extend({
            render() {
              return isVNode(menuData) ? menuData : menuData();
            }
          });
          const myComponentInstance = new instance();
          myComponentInstance.$mount();
          $menu.appendChild(myComponentInstance.$el);
          vm.menuShow = true;
          return;
        }
        // 如果menuData为数组
        const menuList = document.createElement('ul');
        menuList.style = 'list-style:  margin: 0; padding: 8px 12px;cursor: pointer;';

        menuData.forEach((item) => {
          const menuItem = document.createElement('li');
          menuItem.style = 'background-color:#fff; color:#000; font-size:14px; padding:2px 8px;transition: all .2s ease-in-out;border-radius: 4px;';

          menuItem.onmouseover = () => {
            menuItem.style.backgroundColor = '#007aff';
            menuItem.style.color = '#fff';
          };
          menuItem.onmouseout = () => {
            menuItem.style.backgroundColor = '#fff';
            menuItem.style.color = '#000';
          };

          menuItem.innerText = item.label;
          menuItem.onclick = () => {
            item?.click?.call(vm);
            vm.menuShow = false;
          };
          menuList.appendChild(menuItem);
        });
        $menu.style = `background-color: #fff; border-radius: 4px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);`;

        $menu.appendChild(menuList);

        vm.menuShow = true;
      };
      document.body.addEventListener('click', () => {
        const $menu = document.getElementById('contextmenu_z_element_ui_1');
        if ($menu) {
          document.body.removeChild($menu);
          vm.menuShow = false;
        }
      });
    },
    unbind(el, binding, vnode) {
      document.body.removeEventListener('click', () => {});
      el.onmouseup = null;
      el.onmousedown = null;
    }
  };
};
export default contextmenu;

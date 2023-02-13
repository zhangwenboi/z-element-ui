/**
 * v-errimg="{type:'avatarErr'}"
 * v-errimg
 * 不传，默认取showErr项替代，其他情况根据实际情况传类型
 * type---error图片类型，默认showErr
 * empty---为空的时候是否需要展示err图片，默认true
 */
const errImg = imgObj => {
    const errImg = (el, binding) => {
        let defaultImg = imgObj.showErr,
            val = binding.value,
            type = (val && val.type) || 'showErr',
            empty = (val && val.empty) || true;

        if (!el.src && empty) {
            el.src = defaultImg;
            return;
        }

        const errHandle = () => el.addEventListener('error', _ => (el.src = defaultImg));

        try {
            defaultImg = imgObj[type];
            errHandle();
        } catch (e) {
            errHandle();
        }
    };
    return {
        bind: (el, binding) => errImg(el, binding),
        update: (el, binding) => errImg(el, binding)
    };
};
export default errImg;

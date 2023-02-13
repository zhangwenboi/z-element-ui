const preventShake = options => {
    return {
        inserted(el, binding) {
            el.addEventListener('click', () => {
                if (!el.disabled) {
                    el.disabled = true;
                    setTimeout(() => {
                        el.disabled = false;
                    }, binding.arg || options.time);
                }
            });
        }
    };
};
export default preventShake;

import { DirectiveBinding } from 'vue';
interface OutsideBindingArgs {
    handler: (e: MouseEvent) => void;
    event?: (e: Event) => boolean;
    include?: () => HTMLElement | HTMLElement[];
}
interface OutsideDirectiveBinding extends DirectiveBinding {
    value: ((e: MouseEvent) => void) | OutsideBindingArgs;
}
declare const Outside: {
    bind(el: HTMLElement, binding: OutsideDirectiveBinding): void;
    update(el: HTMLElement, binding: OutsideDirectiveBinding): void;
    unbind(el: HTMLElement, binding: OutsideDirectiveBinding): void;
};



export default { Outside };
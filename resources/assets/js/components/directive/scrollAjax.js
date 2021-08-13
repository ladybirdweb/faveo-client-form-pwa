import Vue from 'vue';


export const ScrollAjax={
bind(el, binding, vnode) {
        var raw = $(el)[0];
        $(el).bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                vnode.context[binding.expression]();
            }
        });
    }
 }
 Vue.directive('scroll-ajax', ScrollAjax);
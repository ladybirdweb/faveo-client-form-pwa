import { mount, createLocalVue } from '@vue/test-utils'

import Vue from 'vue'

import {ValidationProvider} from 'vee-validate';
Vue.component('ValidationProvider', ValidationProvider);

import TinyMCEWithValidation from "../resources/assets/js/components/Common/tinyMCE/TinyMCEWithValidation";

const localVue = createLocalVue();

window.ClassicEditor = new Vue();

describe('TinyMCEWithValidation',() => {

    let wrapper;

    function mountComponent(validate= {}, fieldValueProp = 'hello'){

        wrapper = mount(TinyMCEWithValidation, {

            sync: false,

            propsData:{

                fieldName : 'checkbox',

                validate : validate,

                objKey : 'value',

                value: fieldValueProp
            },

            localVue,

            stubs : ['editor','form-field-template'],
            methods : { onChange : jest.fn(), basePath: jest.fn(), getCsrfToken: jest.fn() }
        });
    }

    it('emits `assignToModel` when `onChange` is called', ()=>{

        mountComponent();

        wrapper.vm.onChange();

        expect(wrapper.emitted().assignToModel)
    });

    it('updates model value when `value` is updated', async ()=>{

        mountComponent({}, "spartan");
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.editorValue).toBe("spartan");
    })
});

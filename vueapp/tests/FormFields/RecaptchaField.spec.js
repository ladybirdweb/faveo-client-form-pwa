import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import RecaptchaField from 'components/FormFields/RecaptchaField';
import VeeValidate, {ValidationProvider} from 'vee-validate';
import Vuex from 'vuex';

const localVue = createLocalVue();
Vue.component('ValidationProvider', ValidationProvider);

window.eventHub  = new Vue();

localVue.use(Vuex)

describe('RecaptchaField',() => {

    let wrapper;
    let getters;
    let store;

    function mountComponent(node = {}, validate = {}, category="ticket"){

      getters = {

        getUserData: () => {return { captcha : { version : 'v2', siteKey : 'poiuytrewqasdfghjklkmnbvcxzasdfg'}}}
      }

      store = new Vuex.Store({
        getters
      })

      wrapper = mount(RecaptchaField, {
        sync: false,
        propsData:{
          node: node,
          category:category
        }, localVue,store,
        mocks: ['vue-recaptcha'],
      });
    }

    it('emits `updateCaptchaValidation` with captcha value when `markRecaptchaAsVerified` is called',()=>{
      mountComponent();
      wrapper.vm.markRecaptchaAsVerified('test_value');
      expect(wrapper.emitted('assignToModel')).toEqual([['value','test_value']]);
      expect(wrapper.vm.recaptchaVerified).toBe('test_value');
    })

    it('emits `assignToModel` with value as empty once ``{category}FormSubmitted` is emitted and resets captcha',()=>{
      mountComponent();
      jest.mock()
      window.grecaptcha = {reset : jest.fn()};
      window.eventHub.$emit(wrapper.vm.category+'FormSubmitted');
      expect(wrapper.emitted('assignToModel')).toEqual([['value','']]);
      expect(window.grecaptcha.reset).toHaveBeenCalled();
    })

});

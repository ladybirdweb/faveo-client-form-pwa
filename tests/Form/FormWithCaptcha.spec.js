import { mount, createLocalVue } from '@vue/test-utils'

import Vue from 'vue'

import Vuex from 'vuex'

import FormWithCaptcha from 'components/Common/Form/FormWithCaptcha';

Vue.directive('captcha', {});

window.eventHub = new Vue();

let localVue = createLocalVue();

localVue.use(Vuex);

Vue.mixin({data: ()=>({ recaptchaApplyfor : ['login_page'] })});

describe('FormWithCaptcha', () => {

  let wrapper;

  let store;

  let actions;

  actions = { 

    setAlert : jest.fn()
  }

  store = new Vuex.Store({  actions })

  const updateWrapper = () =>{

    wrapper = mount(FormWithCaptcha,{

      stubs: ['recaptcha-field'],

      mocks: { trans: (string) => string },

       localVue, store
    });  
  }

  beforeEach(() => {
    
    updateWrapper();
  })

  it("updates `captchaKey` value when `getCaptcha` method called",()=>{

    wrapper.vm.getCaptcha('captcha_key');

    expect(wrapper.vm.captchaKey).toEqual('captcha_key')
  });

  it("calls `formSubmit` method when `page` is empty",()=>{

    wrapper.setProps({ page : '', formSubmit : jest.fn() });

    wrapper.vm.onSubmit();

    expect(wrapper.vm.formSubmit).toHaveBeenCalled()
  });

  it("calls `formSubmit` method with params  when `page` is not equal empty",()=>{

    wrapper.setProps({ page : 'login_page', formSubmit : jest.fn() });

    wrapper.setData({ captchaKey : 'key' })

    wrapper.vm.onSubmit();

    expect(wrapper.vm.formSubmit).toHaveBeenCalledWith("g-recaptcha-response", "key")
  });

   it("calls `setAlert` method when `captchaKey` is empty",()=>{

    wrapper.setProps({ page : 'login_page', formSubmit : jest.fn() });

    wrapper.vm.onSubmit();

    expect(actions.setAlert).toHaveBeenCalled();
  })
});

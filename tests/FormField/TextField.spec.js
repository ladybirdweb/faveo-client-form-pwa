import { mount } from '@vue/test-utils'
import TextField from 'components/MiniComponent/FormField/TextField'
import Vuex from 'vuex'
import {localVue} from "../BaseTestcase";
import FormFieldTemplate from 'components/MiniComponent/FormField/FormFieldTemplate'
import Vue from 'vue';
import {ValidationProvider} from 'vee-validate';
Vue.component('ValidationProvider', ValidationProvider);


let wrapper
let label = 'test label'
let value = 'test value'
let name = 'test_name'
let classname = 'test-class'

let getters
let store

/**
 * updates props in the component
 * @param type  text input field type(prop)
 */
const updateWrapper = (type = "text") =>{
    getters = {
        getValidationErrors: () => {return {}}
    }

    store = new Vuex.Store({
        getters
    })

    wrapper = mount(TextField,{
        propsData:{
            label:label,
            value:value,
            name:name,
            type:type,
            classname:classname,
            showWordLimit: false,
            onChange:jest.fn((a,b)=>{}),
        },localVue, store,
        stubs:{'FormFieldTemplate':FormFieldTemplate}
    })

}

describe('TextField',()=>{

    it('updates changedValue to be equal to "value"(prop) as soon as component is mounted',()=>{
        updateWrapper();
        expect(wrapper.vm.$data.changedValue).toMatch(value)

    })

    it('mounts textarea whenever type is passed as "textarea"',()=>{
        updateWrapper('textarea')
        expect(wrapper.find('text').exists()).toBe(false)
        expect(wrapper.find('textarea').exists()).toBe(true)
    })

    it('mounts text whenever no type is passed',()=>{
        updateWrapper()
        expect(wrapper.find('input').exists()).toBe(true)
        expect(wrapper.find('textarea').exists()).toBe(false)
    })

    it('does not call onChange function if text field is not changing',()=>{

        //trigger an input and check if the method is getting called
        expect(wrapper.vm.onChange).toHaveBeenCalledTimes(0)
    })

    it('calls onChange function if text field is changing',()=>{
        updateWrapper()
        wrapper.find('input').trigger('input')
        //trigger an input and check if the method is getting called
        expect(wrapper.vm.onChange).toHaveBeenCalledTimes(1)
    })

    it('calls onChange function if text area is changing',()=>{
        updateWrapper('textarea')
        wrapper.find('textarea').trigger('input')
        //trigger an input and check if the method is getting called
        expect(wrapper.vm.onChange).toHaveBeenCalledTimes(1)
    })

})
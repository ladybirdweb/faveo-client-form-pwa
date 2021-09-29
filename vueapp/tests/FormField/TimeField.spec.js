import { mount } from '@vue/test-utils'
import TimeField from 'components/MiniComponent/FormField/TimeField'
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import {localVue} from "../BaseTestcase";
import FormFieldTemplate from 'components/MiniComponent/FormField/FormFieldTemplate'
window.eventHub  = new Vue();

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

    wrapper = mount(TimeField,{
    	mocks:{
		  	lang:(string)=>string
		  },
        propsData:{
            label:label,
            value:value,
            name:name,
            type:type,
            classname:classname,
            onChange:jest.fn((a,b)=>{}),
        },localVue, store,
        stubs:{'FormFieldTemplate':FormFieldTemplate}
    })

}

describe('TimeField',()=>{



    it('calls onChange function if text field is changing',()=>{
        updateWrapper()
        wrapper.find('input').trigger('input')
        //trigger an input and check if the method is getting called
        expect(wrapper.vm.onChange).toHaveBeenCalledTimes(1)
    })

    it('onChange is of type Function', () => {
        const change = wrapper.vm.$options.props.onChange;
        expect(change.type).toBe(Function)
    })

    it('onChange function is required', () => {
        const change = wrapper.vm.$options.props.onChange;
        expect(change.Required).toBeTruthy()
    })
    
})
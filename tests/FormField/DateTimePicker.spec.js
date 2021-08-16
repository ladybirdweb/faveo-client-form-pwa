import { mount } from '@vue/test-utils'
import DateTimePicker from 'components/MiniComponent/FormField/DateTimePicker'
import Vue from 'vue'
import Vuex from 'vuex'
import {localVue} from "../BaseTestcase";
import FormFieldTemplate from 'components/MiniComponent/FormField/FormFieldTemplate'
import DatePicker from 'vue2-datepicker'

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
const updateWrapper = (type = "text", outputFormat = "") =>{
    getters = {
        getValidationErrors: () => {return {}}
    }

    store = new Vuex.Store({
        getters
    })

    wrapper = mount(DateTimePicker,{
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
            outputFormat: outputFormat
        },localVue, store,
        stubs:{'FormFieldTemplate':FormFieldTemplate,'date-picker':DatePicker, 'ValidationProvider':'<div></div>'}
    })

}

describe('DateTimePicker',()=>{
   
    it('updates changedValue to be equal to "value"(prop) as soon as component is mounted',()=>{
        updateWrapper();
        expect(wrapper.vm.$data.changedValue).toMatch(value)

    })

    it('onChange is of type Function', () => {
        updateWrapper()
        const change = wrapper.vm.$options.props.onChange;
        expect(change.type).toBe(Function)
    })

    it('onChange function is required', () => {
        updateWrapper()
        const change = wrapper.vm.$options.props.onChange;
        expect(change.Required).toBeTruthy()
    })

    it('converts date to passed format if `outputFormat` is passed', () => {
        updateWrapper('text', 'YYYY')
        wrapper.vm.onDateTimeChange('2020-10-10 00:00:00', 'datetime');
        expect(wrapper.vm.onChange).toHaveBeenCalledWith('2020', 'datetime');
    })
})
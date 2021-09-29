import { mount } from '@vue/test-utils'
import StaticSelect from 'components/MiniComponent/FormField/StaticSelect'
import FormFieldTemplate from 'components/MiniComponent/FormField/FormFieldTemplate'
import Vuex from "vuex";
import {localVue} from "../BaseTestcase";

let wrapper
let label = 'test label'
let value = 'test value'
let name = 'test_name'
let classname = 'test-class'

let getters
let store

describe('StaticSelect',()=>{

    beforeEach(()=>{

        getters = {
            getValidationErrors: () => {return {}}
        }

        store = new Vuex.Store({
            getters
        })

        wrapper = mount(StaticSelect,{
            propsData:{
                label:label,
                value:value,
                name:name,
                classname:classname,
                elements:[],
                onChange:jest.fn((a,b)=>{}),
            },localVue, store,
            stubs:{'FormFieldTemplate':FormFieldTemplate}
        })

    })


    it('updates changedValue(state) to be equal to "value"(prop) as soon as component is mounted',()=>{
        expect(wrapper.vm.$data.selectedValue).toMatch(value)

    })

    it('does not call onChange function if selected field is not changing',()=>{
        expect(wrapper.vm.onChange).toHaveBeenCalledTimes(0)
    })

    it('calls onChange function if selcted field is changing',()=>{
        wrapper.find('select').trigger('change')
        //trigger an input and check if the method is getting called
        expect(wrapper.vm.onChange).toHaveBeenCalledTimes(1)
    })

})
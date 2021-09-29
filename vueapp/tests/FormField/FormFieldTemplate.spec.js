import { mount } from '@vue/test-utils'
import FormFieldTemplate from 'components/MiniComponent/FormField/FormFieldTemplate'
import Vuex from 'vuex'
import {localVue} from "../BaseTestcase";

let wrapper
let label = 'test label'
let name = 'test_name'
let classname = 'test-class'

let getters
let store

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r =  parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    return result ? 'rgb('+r + ", " + g + ", " + b+')' : null;
}

describe('FormFieldTemplate',()=>{

    beforeEach(()=>{
        getters = {
            getValidationErrors: () => {return {test_name: 'test error'}}
        }

        store = new Vuex.Store({
            getters
        })

    })


    it('has label displayed in even if everything else is empty',()=>{
        wrapper = mount(FormFieldTemplate,{
            propsData:{
                label:label,
                name:'',
                classname:'',
            }, localVue, store
        })
        expect(wrapper.text()).toBe(label)
    })

    it('does not have has-error class when "errors" is empty',()=>{
        //population vuex with different key name in store
        getters = {
            getValidationErrors: () => {return {}}
        }

        store = new Vuex.Store({
            getters
        })


        wrapper = mount(FormFieldTemplate,{
            propsData:{
                label:label,
                name:name,
                classname:classname,
            },localVue, store
        })
        expect(wrapper.classes()).not.toContain('has-error')
    })

    it('does not have has-error class when "errors" has different key than name',()=>{
        //population vuex with different key name in store
        getters = {
            getValidationErrors: () => {return {test_name2: 'test error'}}
        }

        store = new Vuex.Store({
            getters
        })



        wrapper = mount(FormFieldTemplate,{
            propsData:{
                label:label,
                name:name,
                classname:classname,
            },localVue, store
        })
        expect(wrapper.classes()).not.toContain('has-error')
        expect(wrapper.find('.help-block').exists()).toBe(false)

    })

    it('has has-error class when errors are non-empty and with key same as name',()=>{

        wrapper = mount(FormFieldTemplate,{
            propsData:{
                label:label,
                name:name,
                classname:classname,
            },localVue, store
        })
        expect(wrapper.classes()).toContain('has-error')
    })

    it('has the passed classname',()=>{
        wrapper = mount(FormFieldTemplate,{
            propsData:{
                label:label,
                name:name,
                classname:classname,
            },localVue, store
        })
        expect(wrapper.classes()).toContain('test-class')
    })

    it('class of the asterix symbol should be is-danger',()=>{
        wrapper = mount(FormFieldTemplate,{
            propsData:{
                label:label,
                name:'',
                classname:'',
                required:true,
            }, localVue, store
        })
        let labelArray = wrapper.findAll('label');
        expect(labelArray.wrappers[1].element.classList).toContain("is-danger")
    })

})
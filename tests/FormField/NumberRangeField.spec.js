import { mount, createLocalVue, shallowMount } from '@vue/test-utils';

import NumberRangeField from 'components/MiniComponent/FormField/NumberRangeField'

import Vue from 'vue'

let wrapper;

describe('NumberRangeField', () => {

	beforeEach(()=>{

		wrapper = mount(NumberRangeField,{
			
			stubs:['form-field-template',],

			propsData : {

				name : 'name',

				value : 'value',

				label : 'label',

				onChange : jest.fn()
			},
		   
		  mocks:{ lang: (string) => string }
		})
	})

	it('is a vue instance', () => {
	  
	  expect(wrapper.isVueInstance()).toBeTruthy()
	});

	it('updates `minValue,maxValue` value when `updateValue` method called`',()=>{

		wrapper.vm.onInput = jest.fn();

		wrapper.setProps({ value : {min:10,max:1000}});

		wrapper.vm.updateValue();

		expect(wrapper.vm.minValue).toEqual(10)

		expect(wrapper.vm.maxValue).toEqual(1000)

		expect(wrapper.vm.onInput).toHaveBeenCalled();
	})

	it('calls `onChange` method when `onInput` method called',()=>{

		wrapper.vm.onInput();

		expect(wrapper.vm.onChange).toHaveBeenCalled();
	})
})

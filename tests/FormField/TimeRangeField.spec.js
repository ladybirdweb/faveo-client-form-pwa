import { mount, createLocalVue, shallowMount } from '@vue/test-utils';

import TimeRangeField from 'components/MiniComponent/FormField/TimeRangeField'

import Vue from 'vue'

window.eventHub = new Vue();

let wrapper;

describe('TimeRangeField', () => {

	beforeEach(()=>{

		wrapper = mount(TimeRangeField,{
			
			stubs:['form-field-template',],

			propsData : {

				name : 'name',

				value : 'value',

				onChange : jest.fn()
			},
		   
		  mocks:{ lang: (string) => string }
		})
	})

	it('updates `option,count` value when `updateValue` method called without `time`',()=>{

		wrapper.vm.onInput = jest.fn();

		wrapper.setProps({ value : 'last::10~minute'});

		wrapper.vm.updateValue();

		expect(wrapper.vm.isDatePicker).toEqual(false)

		expect(wrapper.vm.count).toEqual("10")

		expect(wrapper.vm.option).toEqual('minute')

		expect(wrapper.vm.onInput).toHaveBeenCalled();
	})

	it('updates `changedValue` value when `updateValue` method called with `time`',()=>{

		wrapper.vm.onDateChange = jest.fn();

		wrapper.setProps({ value : '2020-2-10'});

		wrapper.vm.updateValue();

		expect(wrapper.vm.isDatePicker).toEqual(true)

		expect(wrapper.vm.changedValue).toEqual("2020-2-10")

		expect(wrapper.vm.onDateChange).toHaveBeenCalled();
	})

	it('calls `onChange` method when `onInput` method called',()=>{

		wrapper.vm.onInput();

		expect(wrapper.vm.onChange).toHaveBeenCalled();
	})

	it('calls `onChange` method when `onDateChange` method called',()=>{

		wrapper.vm.onDateChange();

		expect(wrapper.vm.onChange).toHaveBeenCalled();
	})
})

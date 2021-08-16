import { shallow, createLocalVue,  mount } from '@vue/test-utils'

import sinon from 'sinon'

import Vue from 'vue'

import moxios from 'moxios';

import ColorPicker from 'components/MiniComponent/FormField/ColorPicker.vue'

let wrapper;

describe('ColorPicker',() => {
	
	beforeEach(() => {
		
		wrapper = mount(ColorPicker,{
			
			stubs: ['chrome-picker'],
			
			mocks:{ lang:(string)=>string }
		})   
	})


	it('is vue instance',() => {
		expect(wrapper.isVueInstance()).toBeTruthy()
	});

	it('updates color value if selected color begins with `rgba`',()=>{

		wrapper.vm.updateColors('rgba(255,0,0,0.3)');

		expect(wrapper.vm.$data.colors).toEqual({"a": "0.3", "hex": "#ff0000"});
	});

	it('updates color value if selected color begins with`#`',()=>{

		wrapper.vm.updateColors('#000000');

		expect(wrapper.vm.$data.colors).toEqual({"hex": "#000000"});
	});

	it('updates `displayPicker` value as true when `showPicker` method called',()=>{

		wrapper.vm.showPicker();

		expect(wrapper.vm.$data.displayPicker).toBe(true);
	});

	it('updates `displayPicker` value as false when `hidePicker` method called',()=>{

		wrapper.vm.hidePicker();

		expect(wrapper.vm.$data.displayPicker).toBe(false);
	});

	it('if `displayPicker` is false ,calls `showPicker` method when `togglePicker` method called',()=>{

		wrapper.setData({ displayPicker : false});

		wrapper.vm.showPicker = jest.fn();

		wrapper.vm.togglePicker();

		expect(wrapper.vm.showPicker).toHaveBeenCalled();
	});

	it('if `displayPicker` is true ,calls `hidePicker` method when `togglePicker` method called',()=>{

		wrapper.setData({ displayPicker : true});

		wrapper.vm.hidePicker = jest.fn();

		wrapper.vm.togglePicker();

		expect(wrapper.vm.hidePicker).toHaveBeenCalled();
	});

	it('calls `updateColors` method when `updateFromInput` from method called',()=>{

		wrapper.vm.updateColors = jest.fn();

		wrapper.vm.updateFromInput();

		expect(wrapper.vm.updateColors).toHaveBeenCalled();
	});

	it('updates `colorValue`',()=>{

		wrapper.vm.updateFromPicker({"a": "0.3", "hex": "#ff0000","rgba" : { a : 1}});

		expect(wrapper.vm.$data.colorValue).toEqual('#ff0000')
	});

	it('updates `colorValue` as rgba if a not equal to 1',()=>{

		wrapper.vm.updateFromPicker({"a": "0.3", "hex": "#ff0000","rgba" : { a : 28,r : 1, g : 2 , b : 85}});

		expect(wrapper.vm.$data.colorValue).toEqual('rgba(1, 2, 85, 28)')
	})
})
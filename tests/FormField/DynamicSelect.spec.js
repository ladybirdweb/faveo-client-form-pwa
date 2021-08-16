
import { mount } from '@vue/test-utils'
import DynamicSelect from 'components/MiniComponent/FormField/DynamicSelect'
import Vuex from 'vuex'
import { localVue } from "../BaseTestcase";
import moxios from 'moxios'
import Vue from 'vue';
import {ValidationProvider} from 'vee-validate';
Vue.component('ValidationProvider', ValidationProvider);
window.eventHub = new Vue();

import { errorHandler } from 'helpers/responseHandler';
jest.mock('helpers/responseHandler', () => ({
    errorHandler: jest.fn()
}))

import _ from 'lodash-core';
jest.unmock('lodash');
_.debounce = jest.fn((fn) => fn);

let wrapper
let label = 'test label'
let value = 'testvalue'
let name = 'test_name'
let classname = 'test-class'


let getters
let store
const fakeRequestData = {
    success: true,
    data: {
        test_key: [
            { id: 1, name: "test name 1" },
            { id: 2, name: "test name 2" },
            { id: 3, name: "test name 3" }
        ]
    }

}

/**
 * Changes the component configuration for testing in different conditions
 * @param {Boolean} multiple
 * @param {Array} elements
 * @param {Boolean} apiEndpoint
 * */
const configureWrapper = (apiEndpoint = 'test-api-endpoint') => {
    wrapper = mount(DynamicSelect, {
        propsData: {
            label: label,
            value: value,
            name: name,
            classname: classname,
            apiEndpoint: apiEndpoint,
            multiple: false,
            onChange: jest.fn((a, b) => { }),
            id: "dynamic-select",
            clearable: true,
            optionLabel: 'name'
        }, localVue, store,
        stubs: ['v-select', 'faveo-image-element', 'loader']
    })
}

describe('DynamicSelect', () => {

    global.IntersectionObserver = class IntersectionObserver {
        constructor() { }
        observe() {
            return null;
        }
        disconnect() {
            return null;
        }
    };

    beforeEach(() => {
        getters = {
            getValidationErrors: () => { return { test_name: 'test error' } },
        }

        store = new Vuex.Store({
            getters
        })


        moxios.install()

        //faking the success response
        moxios.stubRequest('test-api-endpoint', {
            status: 200,
            response: fakeRequestData
        })

    })

    afterEach(() => {
        moxios.uninstall()
    })

    it('default value for the `elements` prop should be an empty array', () => {
        configureWrapper(null);
        expect(wrapper.vm.elements.length).toBe(0);
    });

    it('assign `elements` to listElements if Boolean(elements) is true', () => {
        configureWrapper(null);

        wrapper.setProps({ elements: undefined });
        expect(wrapper.vm.listElements.length).toBe(0);

        wrapper.setProps({ elements: [{ id: 0, name: 'name' }] });
        expect(wrapper.vm.listElements.length).toBe(1);

        wrapper.setProps({ elements: [] });
        expect(wrapper.vm.listElements.length).toBe(0);
    });


    it('trigger `onChange` if onValueChange get called', () => {
        wrapper.vm.onValueChange({ id: 13, name: 'name' });
        expect(wrapper.vm.onChange).toHaveBeenCalledWith({ id: 13, name: 'name' }, 'test_name');
    })

    it('`filterListElements` will filter out matching elements based on the searchQuery', () => {
        wrapper.setProps({ elements: [{ id: 0, name: 'name' }, { id: 0, name: 'NaMe' }, { id: 0, name: 'demo' }] });

        wrapper.vm.searchQuery = 'nam';
        wrapper.vm.filterListElements();
        expect(wrapper.vm.listElements).toStrictEqual([{ id: 0, name: 'name' }, { id: 0, name: 'NaMe' }]);

        wrapper.vm.searchQuery = 'demo';
        wrapper.vm.filterListElements();
        expect(wrapper.vm.listElements).toStrictEqual([{ id: 0, name: 'demo' }]);

        wrapper.vm.searchQuery = '404';
        wrapper.vm.filterListElements();
        expect(wrapper.vm.listElements).toStrictEqual([]);

        wrapper.vm.searchQuery = '';
        wrapper.vm.filterListElements();
        expect(wrapper.vm.listElements).toStrictEqual([{ id: 0, name: 'name' }, { id: 0, name: 'NaMe' }, { id: 0, name: 'demo' }]);

    })

    it('returns only 5 characters if option length is more than 5 and returns exact value if option length not more than 5', () => {

        configureWrapper();

        wrapper.setProps({ strlength: 5 });

        expect(wrapper.vm.subString('dynamic select')).toEqual('dynam...');

        wrapper.setProps({ strlength: 5 });

        expect(wrapper.vm.subString('12345')).toEqual('12345')
    })

    it('`getApiParams` will return required api parameters', () => {
        configureWrapper();
        expect(wrapper.vm.getApiParams()).toStrictEqual({ page: undefined, 'search-query': undefined, paginate: 1 });

        wrapper.vm.page = 3;
        expect(wrapper.vm.getApiParams()).toStrictEqual({ page: 3, 'search-query': undefined, paginate: 1 });

        wrapper.vm.searchQuery = 'demo';
        expect(wrapper.vm.getApiParams()).toStrictEqual({ page: 3, 'search-query': 'demo', paginate: 1 });
    })

    it('`postApiResponseOperations` will push new values to listElements if isRefresh is false', () => {
        configureWrapper();

        wrapper.vm.listElements = [{ id: 0, name: 'One' }, { id: 1, name: 'Two' }];
        const response = {
            next_page_url: '/localhost',
            data: [{ id: 0, name: 'demo' }]
        }
        wrapper.vm.postApiResponseOperations(response, false, { offsetParent: { scrollTop: 321 } })
        expect(wrapper.vm.listElements.length).toBe(3);

    })

    it('`postApiResponseOperations` will assign new values to listElements if isRefresh is true', () => {

        configureWrapper();

        const response = {
            next_page_url: '/localhost',
            data: [{ id: 2, name: 'Something' }]
        }

        wrapper.vm.listElements = [{ id: 0, name: 'One' }, { id: 1, name: 'Two' }];
        wrapper.vm.postApiResponseOperations(response, true);

        expect(wrapper.vm.listElements.length).toBe(1);
        expect(wrapper.vm.nextPageUrl).toBe('/localhost');
    })

    it('`hasNextPage` will return boolean on basis of `next_page_url` value', () => {

        configureWrapper();

        wrapper.vm.nextPageUrl = null;
        expect(wrapper.vm.hasNextPage).toBe(false);

        wrapper.vm.nextPageUrl = 'something';
        expect(wrapper.vm.hasNextPage).toBe(true);
    })

    it('`getListFromServer` will make API call if `apiEndpoint` is true', (done) => {

        configureWrapper();

        wrapper.vm.postApiResponseOperations = jest.fn();

        wrapper.vm.getListFromServer(true);

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            expect(request.config.url).toBe('test-api-endpoint');
            const response = {
                data: {
                    data: {
                        next_page_url: '/localhost',
                        data: [{ id: 2, name: 'Something' }]
                    }
                }
            }
            request.respondWith({
                status: 200,
                response: response.data
            }).then(function () {
                expect(wrapper.vm.postApiResponseOperations).toHaveBeenCalled();
                done();
            })
        })
    })

    it('`getListFromServer` will make API call if `apiEndpoint` is true', (done) => {

        configureWrapper();

        wrapper.vm.getListFromServer(true);

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            expect(request.config.url).toBe('test-api-endpoint');
            request.respondWith({
                status: 500,
                response: {}
            }).then(function () {
                expect(errorHandler).toHaveBeenCalled();
                done();
            })
        })
    })

    it('`onSearch` will reset page to 1 and call `search` function', (done) => {

        configureWrapper();

        wrapper.vm.onSearch('demo');
        expect(wrapper.vm.searchQuery).toBe('demo');
        expect(wrapper.vm.page).toBe(1);

        wrapper.vm.search = jest.fn();
        setTimeout(() => {
            expect(wrapper.vm.search).toHaveBeenCalled();
        });
        done();
    })

    it('`infiniteScroll` will increase the page count and call getListFromServer function if `isIntersecting` is true', () => {
        configureWrapper();
        wrapper.vm.getListFromServer = jest.fn();
        wrapper.vm.infiniteScroll([{ isIntersecting: true, target: {} }]);
        expect(wrapper.vm.page).toBe(1);
        expect(wrapper.vm.getListFromServer).toHaveBeenCalledWith(false, {});

        wrapper.vm.infiniteScroll([{ isIntersecting: true, target: {} }]);
        expect(wrapper.vm.page).toBe(2);

        wrapper.vm.infiniteScroll([{ isIntersecting: false, target: {} }]);
        expect(wrapper.vm.page).toBe(2);

    })

    it('watch `apiEndpoint` if changed, call flushAndRestart function', () => {
        configureWrapper();
        wrapper.vm.flushAndRestart = jest.fn();

        wrapper.setProps({ apiEndpoint: 'localhost/something' });
        expect(wrapper.vm.flushAndRestart).toHaveBeenCalled();

    })

    it('watch `apiEndpoint` if changed and having non-boolean value, don not call flushAndRestart function', () => {

        configureWrapper();
        wrapper.vm.flushAndRestart = jest.fn();

        wrapper.setProps({ apiEndpoint: '' });
        expect(wrapper.vm.flushAndRestart).not.toHaveBeenCalled();
    })

    it('watch `apiParameters` if changed call flushAndRestart function', () => {
        configureWrapper();
        wrapper.vm.flushAndRestart = jest.fn();

        wrapper.setProps({ apiParameters: { data: 1 } });
        expect(wrapper.vm.flushAndRestart).toHaveBeenCalled();

    })

    it('watch `apiParameters` if changed and having non-boolean value, don not call flushAndRestart function', () => {

        configureWrapper();
        wrapper.vm.flushAndRestart = jest.fn();

        wrapper.setProps({ apiParameters: undefined });
        expect(wrapper.vm.flushAndRestart).not.toHaveBeenCalled();
    })

    it('resetProperties will flush all the properties', () => {
        configureWrapper();
        wrapper.vm.resetProperties();

        expect(wrapper.vm.listElements.length).toBe(0);
        expect(wrapper.vm.page).toBe(0);
        expect(wrapper.vm.observer).toBe(null);
        expect(wrapper.vm.nextPageUrl).toBe('');
        expect(wrapper.vm.searchQuery).toBe(undefined);
        expect(wrapper.vm.isLoading).toBe(false);
        expect(wrapper.vm.selectedValue).toBe(null);

    })


})

import { mount } from '@vue/test-utils'
import ButtonDropdown from 'components/MiniComponent/FormField/ButtonDropdown'
import moxios from 'moxios'
import sinon from 'sinon'

let wrapper
let label = 'test label'
let value = 'test value'
let name = 'test_name'
let isShowCaretIcon = false
let btnIconClass = 'test_btn_icon_class'
let btnColorClass = 'test_btn_clr_class'
let classname = 'test-class'
let identityFlag = 'test_identityFlag'

const fakeRequestData = {
    success:true,
    data : {
        test_key: [
            { id:1, name:"test name 1" },
            { id:2, name:"test name 2" },
            { id:3, name:"test name 3" }
        ]
    }
}

/**
 * Changes the component configuration for testing in different conditions
 * @param {Array} elements
 * @param {Boolean} prePopulate
 * @param {Boolean} apiEndpoint
 * */
const configureWrapper = (elements = [], prePopulate = false, apiEndpoint = 'test-api-endpoint') => {
    wrapper = mount(ButtonDropdown,{
      mocks:{
        lang:(string)=>string
      },
      propsData:{
          label:label,
          value:value,
          name:name,
          classname:classname,
          apiEndpoint:apiEndpoint,
          elements:elements,
          prePopulate:prePopulate,
          isShowCaretIcon:isShowCaretIcon,
          btnIconClass:btnIconClass,
          btnColorClass:btnColorClass,
          identityFlag:identityFlag,
          onChange:jest.fn((a,b)=>{}),
          id:"btn-click",
      }
    })
}

//faking the success response
function mockingApiCall() {
  moxios.stubRequest('test-api-endpoint',{
      status: 200,
      response: fakeRequestData
  })
}

describe('ButtonDropdown',()=>{

  beforeEach(()=>{
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('sends API request and populates "componentElements" on the first click, ' +
      'if "prePopulate" is false and no data list is passed from outside',(done)=>{

    configureWrapper([], false);
    expect(wrapper.vm.$data.componentElements.length).toBe(0)
    wrapper.vm.onClick()
    mockingApiCall()

    moxios.wait(()=>{
        expect(wrapper.vm.$data.componentElements)
            .toEqual(expect.arrayContaining(fakeRequestData.data.test_key))

        //checking number of request sent
         expect(moxios.requests.__items.length).toBe(1)
        done()
    })
  });

  it('does not send an API request on the first click, ' +
      'if "prePopulate" is true but some data is passed from outside',(done)=>{

      // passing test data, from outside, so there should not be an API call on first click
      configureWrapper(fakeRequestData.data.test_key, true);
      sinon.spy(wrapper.vm, 'getValuesFromAPI')
      expect(wrapper.vm.$data.componentElements)
          .toEqual(expect.arrayContaining(fakeRequestData.data.test_key))
      wrapper.vm.onClick()
      mockingApiCall()
      moxios.wait(()=>{
          //checking number of request sent
          expect(moxios.requests.__items.length).toBe(0)
          done()
      })
      //checking number of request sent
      expect(wrapper.vm.getValuesFromAPI.callCount).toBe(0)
  });

  it('sends an API request as soon as component is mounted, ' +
      'if "prePopulate" is true (it does send API request but as soon as component is mounted)' +
      'and passed data (elements prop) is null',(done)=>{

      // passing test data, from outside, so there should not be an API call on first click
      configureWrapper([], true);

      sinon.spy(wrapper.vm, 'getValuesFromAPI')
      mockingApiCall()
      moxios.wait(()=>{
        //checking number of request sent
        expect(moxios.requests.__items.length).toBe(1)
        expect(wrapper.vm.$data.componentElements)
            .toEqual(expect.arrayContaining(fakeRequestData.data.test_key))
        done()
      })
  });

  it('does not send an API request as soon as component is mounted, ' +
      'if "prePopulate" is true (it does send API request but as soon as component is mounted)' +
      'but passed data (elements prop) is not null',(done)=>{

      // passing test data, from outside, so there should not be an API call on first click
      configureWrapper(fakeRequestData.data.test_key, true);
      sinon.spy(wrapper.vm, 'getValuesFromAPI')
      mockingApiCall()
      moxios.wait(()=>{
        //checking number of request sent
        expect(moxios.requests.__items.length).toBe(0)
        expect(wrapper.vm.$data.componentElements)
            .toEqual(expect.arrayContaining(fakeRequestData.data.test_key))
        done()
    })
  });

  it('onChange is of type Function', () => {
      const change = wrapper.vm.$options.props.onChange;
      expect(change.type).toBe(Function)
  });

  it('onChange function is required', () => {
      const change = wrapper.vm.$options.props.onChange;
      expect(change.Required).toBe(true)
  });

  it('initial value of `elements` shouldn\'t be null or undefined', () => {
      const elements = wrapper.vm.$options.props.elements;
      expect(elements.default).toBeTruthy()
  });

  it('identityFlag data is required', () => {
      const identityFlag = wrapper.vm.$options.props.identityFlag;
      expect(identityFlag.Required).toBe(true)
  });

})

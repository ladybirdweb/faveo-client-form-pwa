import { mount } from '@vue/test-utils'
import PhoneWithCountryCode from 'components/MiniComponent/FormField/PhoneWithCountryCode'

let wrapper;

const configureWrapper = (language = '', classname = '', value = null, name = '', countryCode = 91) => {
  wrapper = mount(PhoneWithCountryCode, {
    mocks: {
      lang: (string) => string
    },
    stubs: ['form-field-template'],
    propsData: {
      language: language,
      value: value,
      name: name,
      classname: classname,
      countryCode: countryCode,
      onChange: jest.fn((a, b) => { })
    }
  })
}

describe('PhoneWithCountryCode', () => {

  it('changedValue should be empty string if selectCountry is called and have false as 2nd argument', (done) => {
    configureWrapper();
    let country = {
      iso: 'in',
      phonecode: '91',
      example: '1234567890'
    }
    wrapper.vm.selectCountry(country, false);
    setTimeout(() => {
      expect(wrapper.vm.changedValue).toBe('')
    }, 1);
    done();
  });

  it('call getCountryCodes if country code is not null', (done) => {
    configureWrapper('', '', null, '', 91);
    wrapper.vm.getCountryCodes = jest.fn();
    setTimeout(() => {
      expect(wrapper.vm.getCountryCodes).toHaveBeenCalled();
    }, 1);
    done();
  });

})

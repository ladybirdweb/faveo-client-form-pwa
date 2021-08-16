import { mount, createLocalVue } from '@vue/test-utils'

import DynamicSelectWithFilter from 'components/MiniComponent/FormField/DynamicSelectWithFilter'
import Vuex from 'vuex'

let wrapper;

const localVue = createLocalVue()

localVue.use(Vuex)

const filterOptions = [
  {
    "key": "asset_type_ids",
    "apiEndpoint": "/service-desk/api/dependency/asset_types",
    "label": "lang.asset_type",
    "className": "",
    "multiple": true,
    "elements": []
  },
  {
    "key": "org_ids",
    "apiEndpoint": "api/dependency/organizations",
    "label": "Organizations",
    "className": "",
    "multiple": true,
    "elements": []
  },
  {
    "key": "used_by_ids",
    "apiEndpoint": "api/dependency/users",
    "label": "lang.used_by",
    "className": "",
    "multiple": false,
    "elements": []
  },
  {
    "key": "managed_by_ids",
    "apiEndpoint": "api/dependency/agents",
    "label": "lang.managed_by",
    "className": "",
    "multiple": true,
    "elements": []
  }
]

const mountWrapper = (node, filterApiEndpoint, multiple = false, store, localVue) => {
  wrapper = mount(DynamicSelectWithFilter, {
    propsData: {
      node: node,
      filterApiEndpoint: filterApiEndpoint,
      multiple: multiple,
      onChange: jest.fn(),
      selectedAssets: [],
      clearSelectedValue: jest.fn(),
      changeSelectedAsset: jest.fn()
    },
    store: store,
    localVue: localVue,
    stubs: ['modal', 'dynamic-select', 'filter-dropdowns', 'loader'],
    mocks: { trans: (string) => string },
    directives: { tooltip: (string) => string }
  })
}

describe('DynamicSelectWithFilter', () => {

  const node = {
    unique: 'uni',
    value: [{ id: 13, name: 'demo' }],
    required: true,
    api_info: 'url:=service-desk/api/dependency/assets;;key:=id'
  }

  const filterApiEndpoint = 'service-desk/api/module-filter-structure/asset'

  let store
  let getters

  beforeEach(() => {

    getters = {
      getReporter: () => jest.fn()
    }

    store = new Vuex.Store({
      getters
    }) 
    mountWrapper(node, filterApiEndpoint, false, store, localVue)
  })

  it('apiEndpoint will return the url part of the api_info', () => {
    expect(wrapper.vm.apiEndpoint).toBe('service-desk/api/dependency/assets')
    expect(wrapper.vm.filterApiEndpoint).toBe('service-desk/api/module-filter-structure/asset')
  })

  it('onChangeFilter will update with merging old values to selectedFilters', () => {
    wrapper.vm.selectedFilters = { a: 0, c: 3 }
    wrapper.vm.onChangeFilter({ a: 1, b: 2 })

    expect(wrapper.vm.selectedFilters).toStrictEqual({ a: 1, b: 2, c: 3 })
  })

  it('applyFilter will update filterObject, formattedFilterString and apiParameters', () => {
    wrapper.vm.filterOptions = filterOptions
    wrapper.vm.selectedFilters = { asset_type_ids: { id: 1, name: 'farzy' }}

    wrapper.vm.applyFilter()
    expect(wrapper.vm.filterOptions[0].value).toStrictEqual({ id: 1, name: 'farzy' })
    
    expect(wrapper.vm.formattedFilterString).toBe('<em>Filter(s): </em><b>lang.asset_type: </b><em>farzy</em>')

    expect(wrapper.vm.apiParameters).toStrictEqual({"asset_type_ids[0]": 1})

    expect(wrapper.vm.showFilterPopup).toBe(false)
  })

  it('openFilterPopup will open filter modal popup', () => {
    wrapper.vm.openFilterPopup()
    expect(wrapper.vm.showFilterPopup).toBe(true);
  })

})

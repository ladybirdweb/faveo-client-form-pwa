import { createLocalVue } from '@vue/test-utils'
import Vuex from "vuex";
import moxios from 'moxios';

export const localVue = createLocalVue()

localVue.use(Vuex)


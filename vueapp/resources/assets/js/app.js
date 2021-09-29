require('./bootstrap');

var moment = require('moment');

import 'es6-promise/auto';

import {store} from 'store'

import VueProgressBar from 'vue-progressbar';

import Popover from 'vue-js-popover';

import { FulfillingBouncingCircleSpinner } from 'epic-spinners';

import StarRating from 'vue-star-rating';

import VTooltip from 'v-tooltip';

import vueHeadful from 'vue-headful';

import router from 'vue-router';

import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.use( CKEditor );

Vue.use(VueProgressBar, { color: '#009aba', failedColor: 'red', height: '2px' });

Vue.use(Popover);

Vue.use(require("vuejs-uib-pagination"));

Vue.use(require("vue-simple-uploader"));

Vue.component('fulfilling-bouncing-circle-spinner', FulfillingBouncingCircleSpinner);

Vue.component('star-rating', StarRating);

Vue.use(VTooltip);

Vue.component('vue-headful', vueHeadful);

Vue.use(require('vddl'));

Vue.component('form-entry', require('./components/Client/FaveoFormClientPanel'));

Vue.component('form-renderer', require('./components/Common/Form/FormRenderer'));

Vue.component('bounce-loader', require('vue-spinner/src/BounceLoader.vue'));

Vue.filter('truncate', function (str, max) {
        return str.length > max ? str.substr(0, max - 1) + '…' : str;
})

setTimeout(()=>{

  let app = new Vue({
    el: '#app-client-panel',
    store,
    router,
  });

}, 1000);

/**
 * Should be called to inject routes from outside the bundle
 * @param {Array} wildCardRoutes
 */
window.addRoutes = (wildCardRoutes) => {
	
  router.addRoutes(wildCardRoutes);
}

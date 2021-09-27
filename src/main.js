import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';

import Vue from "vue";
import axios from 'axios';
import App from "./App";
import router from "./router";
import appInfo from "./app-info";

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJhZG1pbiIsIkN1c3RvbU9iamVjdENhbkJlQWRkZWRIZXJlIl0sIm5iZiI6MTYzMjM3NTg1NywiZXhwIjoxNjMyOTgwNjU3LCJpYXQiOjE2MzIzNzU4NTd9.8ahLrsIzCEHW0EHk59dcG4Y3lF2lrao718QJ4pyQ2UY`
};

Vue.$http = axios.create({
    baseURL: 'https://5.189.167.236:44376/v1/api/',
    headers
});

Vue.config.productionTip = false;
Vue.prototype.$appInfo = appInfo;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

import './utils.js';
import VueAuthenticate from './authenticate.js';

const vueAuthInstance;
const VueAuthenticatePlugin = {
  install(app, options) {
    if (!options) {
      options = {};
    }

    if (!vueAuthInstance) {
      let axios;
      // if an axios instance is passed then use that,
      // then try to see if there is a instance referenced via
      // the $http instance property, otherwie fail
      if (options.axios) {
        axios = options.axios;
      } else if (this.$http) {
        axios = this.$http;
      } else {
        throw new Error('Request handler instance not found');
      }

      vueAuthInstance = new VueAuthenticate(axios, options);
      app.config.globalProperties.$auth = vueAuthInstance;
    }
  }
};

export default VueAuthenticatePlugin;

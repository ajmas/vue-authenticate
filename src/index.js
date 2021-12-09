import './utils.js';
import VueAuthenticate from './authenticate.js';

const VueAuthenticatePlugin = {
  install(app, options) {
    if (!options) {
      options = {};
    }

    // const Toast = new T(options);
    // app.component('toasted', ToastComponent);
    app.config.globalProperties.$auth = {
      get() {
        if (!vueAuthInstance) {
          // Request handler library not found, throw error
          if (!this.$http) {
            throw new Error('Request handler instance not found');
          }

          vueAuthInstance = new VueAuthenticate(this.$http, options);
        }
        return vueAuthInstance;
      }
    };
  },
};

export default VueAuthenticatePlugin;

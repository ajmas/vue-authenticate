typeof Object.assign != "function" && (Object.assign = function(i, e) {
  if (i === null)
    throw new TypeError("Cannot convert undefined or null to object");
  const t = Object(i);
  for (let o = 1; o < arguments.length; o++) {
    const r = arguments[o];
    if (r !== null)
      for (const n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
  }
  return t;
});
function x(i) {
  return i.replace(/([\:\-\_]+(.))/g, function(e, t, o, r) {
    return r ? o.toUpperCase() : o;
  });
}
function k(i) {
  return typeof i > "u";
}
function S(i) {
  return i !== null && typeof i == "object";
}
function _(i) {
  return typeof i == "string";
}
function m(i) {
  return typeof i == "function";
}
function p(i, e) {
  return i == null || e == null || Object.keys(e).forEach(function(t) {
    Object.prototype.toString.call(e[t]) === "[object Object]" ? Object.prototype.toString.call(i[t]) !== "[object Object]" ? i[t] = e[t] : i[t] = p(i[t], e[t]) : i[t] = e[t];
  }), i;
}
function h(i, e) {
  if (/^(?:[a-z]+:)?\/\//i.test(e))
    return e;
  const t = [i, e].join("/");
  return function(r) {
    return r.replace(/[\/]+/g, "/").replace(/\/\?/g, "?").replace(/\/\#/g, "#").replace(/\:\//g, "://");
  }(t);
}
function C(i) {
  const e = i.protocol === "https:";
  return i.protocol + "//" + i.hostname + ":" + (i.port || (e ? "443" : "80")) + (/^\//.test(i.pathname) ? i.pathname : "/" + i.pathname);
}
function w(i) {
  const e = {};
  let t, o;
  return (i || "").split("&").forEach((r) => {
    r && (o = r.split("="), t = decodeURIComponent(o[0]), e[t] = o[1] ? decodeURIComponent(o[1]) : !0);
  }), e;
}
function T(i) {
  let e;
  if (typeof module < "u" && module.exports)
    try {
      e = require("buffer").Buffer;
    } catch {
    }
  const t = String.fromCharCode, o = new RegExp(
    [
      "[À-ß][-¿]",
      "[à-ï][-¿]{2}",
      "[ð-÷][-¿]{3}"
    ].join("|"),
    "g"
  ), r = function(a) {
    switch (a.length) {
      case 4: {
        const d = ((7 & a.charCodeAt(0)) << 18 | (63 & a.charCodeAt(1)) << 12 | (63 & a.charCodeAt(2)) << 6 | 63 & a.charCodeAt(3)) - 65536;
        return t((d >>> 10) + 55296) + t((d & 1023) + 56320);
      }
      case 3:
        return t(
          (15 & a.charCodeAt(0)) << 12 | (63 & a.charCodeAt(1)) << 6 | 63 & a.charCodeAt(2)
        );
      default:
        return t(
          (31 & a.charCodeAt(0)) << 6 | 63 & a.charCodeAt(1)
        );
    }
  }, n = function(a) {
    return a.replace(o, r);
  };
  return (e ? function(a) {
    return (a.constructor === e.constructor ? a : e.Buffer.alloc(a, "base64")).toString();
  } : function(a) {
    return n(atob(a));
  })(
    String(i).replace(/[-_]/g, function(a) {
      return a === "-" ? "+" : "/";
    }).replace(/[^A-Za-z0-9\+\/]/g, "")
  );
}
function E(i = "") {
  if (i.length === 0)
    return {};
  const e = {}, t = new RegExp("\\s*;\\s*");
  return i.split(t).forEach((o) => {
    const [r, n] = o.split("="), s = decodeURIComponent(r), a = decodeURIComponent(n);
    e[s] = a;
  }), e;
}
function j(i) {
  const { path: e, domain: t, expires: o, secure: r } = i;
  return [
    typeof e > "u" || e === null ? "" : ";path=" + e,
    typeof t > "u" || t === null ? "" : ";domain=" + t,
    typeof o > "u" || o === null ? "" : ";expires=" + o.toUTCString(),
    typeof r > "u" || r === null || r === !1 ? "" : ";secure"
  ].join("");
}
function v(i, e, t) {
  return [
    encodeURIComponent(i),
    "=",
    encodeURIComponent(e),
    j(t)
  ].join("");
}
function A(i, e) {
  let t, o = i;
  const r = e.split(".");
  for (let n = 0; n < r.length; n++) {
    const s = r[n];
    if (t = o[s], S(t))
      o = o[s];
    else
      break;
  }
  return t;
}
const K = {
  createElement() {
  }
}, D = {
  atob() {
  },
  open() {
  },
  location: {},
  localStorage: {
    setItem() {
    },
    getItem() {
    },
    removeItem() {
    }
  },
  sessionStorage: {
    setItem() {
    },
    getItem() {
    },
    removeItem() {
    }
  }
}, g = typeof document < "u" ? document : K, u = typeof window < "u" ? window : D;
function P() {
  try {
    return u.location.hostname;
  } catch {
  }
  return "";
}
function l(i) {
  try {
    return k(i) ? u.location.origin : `${u.location.origin}${i}`;
  } catch {
  }
  return i || null;
}
const O = {
  baseUrl: null,
  tokenPath: "access_token",
  tokenName: "token",
  tokenPrefix: "vueauth",
  tokenHeader: "Authorization",
  tokenType: "Bearer",
  loginUrl: "/auth/login",
  registerUrl: "/auth/register",
  logoutUrl: null,
  storageType: "localStorage",
  storageNamespace: "vue-authenticate",
  cookieStorage: {
    domain: P(),
    path: "/",
    secure: !1
  },
  requestDataKey: "data",
  responseDataKey: "data",
  /**
   * Default request interceptor for Axios library
   * @context {VueAuthenticate}
   */
  bindRequestInterceptor: function(i) {
    const e = i.options.tokenHeader;
    i.$http.interceptors.request.use((t) => (i.isAuthenticated() ? t.headers[e] = [
      i.options.tokenType,
      i.getToken()
    ].join(" ") : delete t.headers[e], t));
  },
  providers: {
    facebook: {
      name: "facebook",
      url: "/auth/facebook",
      authorizationEndpoint: "https://www.facebook.com/v12.0/dialog/oauth",
      redirectUri: l("/"),
      requiredUrlParams: ["display", "scope"],
      scope: ["email"],
      scopeDelimiter: ",",
      display: "popup",
      oauthType: "2.0",
      popupOptions: { width: 580, height: 400 }
    },
    google: {
      name: "google",
      url: "/auth/google",
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
      redirectUri: l(),
      requiredUrlParams: ["scope"],
      optionalUrlParams: ["display"],
      scope: ["profile", "email"],
      scopePrefix: "openid",
      scopeDelimiter: " ",
      display: "popup",
      oauthType: "2.0",
      popupOptions: { width: 452, height: 633 }
    },
    github: {
      name: "github",
      url: "/auth/github",
      authorizationEndpoint: "https://github.com/login/oauth/authorize",
      redirectUri: l(),
      optionalUrlParams: ["scope"],
      scope: ["user:email"],
      scopeDelimiter: " ",
      oauthType: "2.0",
      popupOptions: { width: 1020, height: 618 }
    },
    instagram: {
      name: "instagram",
      url: "/auth/instagram",
      authorizationEndpoint: "https://api.instagram.com/oauth/authorize",
      redirectUri: l(),
      requiredUrlParams: ["scope"],
      scope: ["basic"],
      scopeDelimiter: "+",
      oauthType: "2.0",
      popupOptions: { width: null, height: null }
    },
    twitter: {
      name: "twitter",
      url: "/auth/twitter",
      authorizationEndpoint: "https://api.twitter.com/oauth/authenticate",
      redirectUri: l(),
      oauthType: "1.0",
      popupOptions: { width: 495, height: 645 }
    },
    bitbucket: {
      name: "bitbucket",
      url: "/auth/bitbucket",
      authorizationEndpoint: "https://bitbucket.org/site/oauth2/authorize",
      redirectUri: l("/"),
      optionalUrlParams: ["scope"],
      scope: ["email"],
      scopeDelimiter: " ",
      oauthType: "2.0",
      popupOptions: { width: 1020, height: 618 }
    },
    linkedin: {
      name: "linkedin",
      url: "/auth/linkedin",
      authorizationEndpoint: "https://www.linkedin.com/oauth/v2/authorization",
      redirectUri: l(),
      requiredUrlParams: ["state"],
      scope: ["r_emailaddress"],
      scopeDelimiter: " ",
      state: "STATE",
      oauthType: "2.0",
      popupOptions: { width: 527, height: 582 }
    },
    live: {
      name: "live",
      url: "/auth/live",
      authorizationEndpoint: "https://login.live.com/oauth20_authorize.srf",
      redirectUri: l(),
      requiredUrlParams: ["display", "scope"],
      scope: ["wl.emails"],
      scopeDelimiter: " ",
      display: "popup",
      oauthType: "2.0",
      popupOptions: { width: 500, height: 560 }
    },
    oauth1: {
      name: null,
      url: "/auth/oauth1",
      authorizationEndpoint: null,
      redirectUri: l(),
      oauthType: "1.0",
      popupOptions: null
    },
    oauth2: {
      name: null,
      url: "/auth/oauth2",
      clientId: null,
      redirectUri: l(),
      authorizationEndpoint: null,
      defaultUrlParams: ["response_type", "client_id", "redirect_uri"],
      requiredUrlParams: null,
      optionalUrlParams: null,
      scope: null,
      scopePrefix: null,
      scopeDelimiter: null,
      state: null,
      oauthType: "2.0",
      popupOptions: null,
      responseType: "code",
      responseParams: {
        code: "code",
        clientId: "clientId",
        redirectUri: "redirectUri"
      }
    }
  }
};
class z {
  constructor(e) {
    this._defaultOptions = p(
      {
        domain: P(),
        expires: null,
        path: "/",
        secure: !1
      },
      e
    );
  }
  setItem(e, t) {
    const o = p({}, this._defaultOptions), r = v(e, t, o);
    this._setCookie(r);
  }
  getItem(e) {
    const t = E(this._getCookie());
    return t.hasOwnProperty(e) ? t[e] : null;
  }
  removeItem(e) {
    const t = "", o = p({}, this._defaultOptions), r = p(o, {
      expires: /* @__PURE__ */ new Date(0)
    }), n = v(e, t, r);
    this._setCookie(n);
  }
  _getCookie() {
    try {
      return g.cookie === "undefined" ? "" : g.cookie;
    } catch {
    }
    return "";
  }
  _setCookie(e) {
    try {
      g.cookie = e;
    } catch {
    }
  }
}
class R {
  constructor(e) {
    this.namespace = e || null;
  }
  setItem(e, t) {
    u.localStorage.setItem(this._getStorageKey(e), t);
  }
  getItem(e) {
    return u.localStorage.getItem(this._getStorageKey(e));
  }
  removeItem(e) {
    u.localStorage.removeItem(this._getStorageKey(e));
  }
  _getStorageKey(e) {
    return this.namespace ? [this.namespace, e].join(".") : e;
  }
}
class $ {
  constructor(e) {
    this.namespace = e || null, this._storage = {};
  }
  setItem(e, t) {
    this._storage[this._getStorageKey(e)] = t;
  }
  getItem(e) {
    return this._storage[this._getStorageKey(e)];
  }
  removeItem(e) {
    delete this._storage[this._getStorageKey(e)];
  }
  _getStorageKey(e) {
    return this.namespace ? [this.namespace, e].join(".") : e;
  }
}
class F {
  constructor(e) {
    this.namespace = e || null;
  }
  setItem(e, t) {
    u.sessionStorage.setItem(this._getStorageKey(e), t);
  }
  getItem(e) {
    return u.sessionStorage.getItem(this._getStorageKey(e));
  }
  removeItem(e) {
    u.sessionStorage.removeItem(this._getStorageKey(e));
  }
  _getStorageKey(e) {
    return this.namespace ? [this.namespace, e].join(".") : e;
  }
}
function N(i) {
  switch (i.storageType) {
    case "localStorage":
      try {
        return u.localStorage.setItem("testKey", "test"), u.localStorage.removeItem("testKey"), new R(i.storageNamespace);
      } catch {
      }
      break;
    case "sessionStorage":
      try {
        return u.sessionStorage.setItem("testKey", "test"), u.sessionStorage.removeItem("testKey"), new F(i.storageNamespace);
      } catch {
      }
      break;
    case "cookieStorage":
      return new z(i.cookieStorage);
    case "memoryStorage":
    default:
      return new $(i.storageNamespace);
  }
}
class I {
  constructor(e, t, o) {
    this.popup = null, this.url = e, this.name = t, this.popupOptions = o;
  }
  async open(e, t) {
    try {
      if (this.popup = u.open(this.url, this.name, this._stringifyOptions()), this.popup && this.popup.focus && this.popup.focus(), !t)
        return this.pooling(e);
    } catch {
      throw new Error("OAuth popup error occurred");
    }
  }
  async pooling(e) {
    return new Promise((t, o) => {
      const r = g.createElement("a");
      r.href = e;
      const n = C(r);
      let s = setInterval(() => {
        (!this.popup || this.popup.closed || this.popup.closed === void 0) && (clearInterval(s), s = null, o(new Error("Auth popup window closed")));
        try {
          if (C(this.popup.location) === n)
            if (this.popup.location.search || this.popup.location.hash) {
              const y = w(
                this.popup.location.search.substring(1).replace(/\/$/, "")
              ), d = w(
                this.popup.location.hash.substring(1).replace(/[\/$]/, "")
              );
              let c = p({}, y);
              c = p(c, d), c.error ? o(new Error(c.error)) : t(c), clearInterval(s), s = null, this.popup.close();
            } else
              o(
                new Error(
                  "OAuth redirect has occurred but no query or hash parameters were found."
                )
              );
        } catch {
        }
      }, 250);
    });
  }
  _stringifyOptions() {
    const e = [];
    for (const t in this.popupOptions)
      k(this.popupOptions[t]) || e.push(`${t}=${this.popupOptions[t]}`);
    return e.join(",");
  }
}
const B = {
  name: null,
  url: null,
  authorizationEndpoint: null,
  scope: null,
  scopePrefix: null,
  scopeDelimiter: null,
  redirectUri: null,
  requiredUrlParams: null,
  defaultUrlParams: null,
  oauthType: "1.0",
  popupOptions: {}
};
class U {
  constructor(e, t, o, r) {
    this.$http = e, this.storage = t, this.providerConfig = p({}, B), this.providerConfig = p(this.providerConfig, o), this.options = r;
  }
  /**
   * Initialize OAuth1 process
   * @param  {Object} userData User data
   * @return {Promise}
   */
  async init(e) {
    this.oauthPopup = new I(
      "about:blank",
      this.providerConfig.name,
      this.providerConfig.popupOptions
    ), u.cordova || this.oauthPopup.open(this.providerConfig.redirectUri, !0);
    const t = await this.getRequestToken(), o = await this.openPopup(t);
    return this.exchangeForToken(o, e);
  }
  /**
   * Get OAuth1 request token
   * @return {Promise}
   */
  async getRequestToken() {
    const e = {};
    return e.method = "POST", e[this.options.requestDataKey] = p(
      {},
      this.providerConfig
    ), e.withCredentials = this.options.withCredentials, this.options.baseUrl ? e.url = h(
      this.options.baseUrl,
      this.providerConfig.url
    ) : e.url = this.providerConfig.url, this.$http(e);
  }
  /**
   * Open OAuth1 popup
   * @param  {Object} response Response object containing request token
   * @return {Promise}
   */
  async openPopup(e) {
    const t = [
      this.providerConfig.authorizationEndpoint,
      this.buildQueryString(e[this.options.responseDataKey])
    ].join("?");
    return this.oauthPopup.popup.location = t, u.cordova ? this.oauthPopup.open(this.providerConfig.redirectUri) : this.oauthPopup.pooling(this.providerConfig.redirectUri);
  }
  /**
   * Exchange token and token verifier for access token
   * @param  {Object} oauth    OAuth data containing token and token verifier
   * @param  {Object} userData User data
   * @return {Promise}
   */
  async exchangeForToken(e, t) {
    let o = p({}, t);
    o = p(o, e);
    const r = {};
    return r.method = "POST", r[this.options.requestDataKey] = o, r.withCredentials = this.options.withCredentials, this.options.baseUrl ? r.url = h(
      this.options.baseUrl,
      this.providerConfig.url
    ) : r.url = this.providerConfig.url, this.$http(r);
  }
  buildQueryString(e) {
    const t = [];
    for (const o in e) {
      const r = e[o];
      t.push(
        encodeURIComponent(o) + "=" + encodeURIComponent(r)
      );
    }
    return t.join("&");
  }
}
const H = {
  name: null,
  url: null,
  clientId: null,
  authorizationEndpoint: null,
  redirectUri: null,
  scope: null,
  scopePrefix: null,
  scopeDelimiter: null,
  state: null,
  requiredUrlParams: null,
  defaultUrlParams: ["response_type", "client_id", "redirect_uri"],
  responseType: "code",
  responseParams: {
    code: "code",
    clientId: "clientId",
    redirectUri: "redirectUri"
  },
  oauthType: "2.0",
  popupOptions: {}
};
class b {
  constructor(e, t, o, r) {
    this.$http = e, this.storage = t, this.providerConfig = p({}, H), this.providerConfig = p(this.providerConfig, o), this.options = r;
  }
  async init(e) {
    const t = this.providerConfig.name + "_state";
    m(this.providerConfig.state) ? this.storage.setItem(t, this.providerConfig.state()) : _(this.providerConfig.state) && this.storage.setItem(t, this.providerConfig.state);
    const o = [
      this.providerConfig.authorizationEndpoint,
      this._stringifyRequestParams()
    ].join("?"), n = await new I(
      o,
      this.providerConfig.name,
      this.providerConfig.popupOptions
    ).open(this.providerConfig.redirectUri);
    if (this.providerConfig.responseType === "token" || !this.providerConfig.url)
      return n;
    if (n.state && n.state !== this.storage.getItem(t))
      throw new Error(
        "State parameter value does not match original OAuth request state value"
      );
    return this.exchangeForToken(n, e);
  }
  /**
   * Exchange temporary oauth data for access token
   * @author Sahat Yalkabov <https://github.com/sahat>
   * @copyright Method taken from https://github.com/sahat/satellizer
   *
   * @param  {[type]} oauth    [description]
   * @param  {[type]} userData [description]
   * @return {[type]}          [description]
   */
  exchangeForToken(e, t) {
    const o = p({}, t);
    for (const n in this.providerConfig.responseParams)
      switch (n) {
        case "code":
          o[n] = e.code;
          break;
        case "clientId":
          o[n] = this.providerConfig.clientId;
          break;
        case "redirectUri":
          o[n] = this.providerConfig.redirectUri;
          break;
        default:
          o[n] = e[n];
      }
    e.state && (o.state = e.state);
    let r;
    return this.options.baseUrl ? r = h(this.options.baseUrl, this.providerConfig.url) : r = this.providerConfig.url, this.$http.post(r, o, {
      withCredentials: this.options.withCredentials
    });
  }
  /**
   * Stringify oauth params
   * @author Sahat Yalkabov <https://github.com/sahat>
   * @copyright Method taken from https://github.com/sahat/satellizer
   *
   * @return {String}
   */
  _stringifyRequestParams() {
    const e = [];
    return [
      "defaultUrlParams",
      "requiredUrlParams",
      "optionalUrlParams"
    ].forEach((o) => {
      this.providerConfig[o] && Array.isArray(this.providerConfig[o]) && this.providerConfig[o].forEach((r) => {
        const n = x(r);
        let s = m(this.providerConfig[r]) ? this.providerConfig[r]() : this.providerConfig[n];
        if (!(r === "redirect_uri" && !s)) {
          if (r === "state") {
            const a = this.providerConfig.name + "_state";
            s = encodeURIComponent(this.storage.getItem(a));
          }
          r === "scope" && Array.isArray(s) && (s = s.join(this.providerConfig.scopeDelimiter), this.providerConfig.scopePrefix && (s = [this.providerConfig.scopePrefix, s].join(
            this.providerConfig.scopeDelimiter
          ))), e.push([r, s]);
        }
      });
    }), e.map((o) => o.join("=")).join("&");
  }
}
class V {
  constructor(e, t) {
    let o = p({}, O);
    o = p(o, t);
    const r = N(o);
    if (Object.defineProperties(this, {
      $http: {
        get() {
          return e;
        }
      },
      options: {
        get() {
          return o;
        }
      },
      storage: {
        get() {
          return r;
        }
      },
      tokenName: {
        get() {
          return this.options.tokenPrefix ? [this.options.tokenPrefix, this.options.tokenName].join("_") : this.options.tokenName;
        }
      }
    }), this.options.bindRequestInterceptor && m(this.options.bindRequestInterceptor))
      this.options.bindRequestInterceptor.call(this, this);
    else
      throw new Error("Request interceptor must be functions");
  }
  /**
   * Check if user is authenticated
   * @author Sahat Yalkabov <https://github.com/sahat>
   * @copyright Method taken from https://github.com/sahat/satellizer
   * @return {Boolean}
   */
  isAuthenticated() {
    const e = this.storage.getItem(this.tokenName);
    if (e) {
      if (e.split(".").length === 3)
        try {
          const o = e.split(".")[1].replace("-", "+").replace("_", "/"), r = JSON.parse(u.atob(o)).exp;
          if (typeof r == "number")
            return Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3) < r;
        } catch {
          return !0;
        }
      return !0;
    }
    return !1;
  }
  /**
   * Get token if user is authenticated
   * @return {String} Authentication token
   */
  getToken() {
    return this.storage.getItem(this.tokenName);
  }
  /**
   * Set new authentication token
   * @param {String|Object} token
   */
  setToken(e, t) {
    e[this.options.responseDataKey] && (e = e[this.options.responseDataKey]);
    const o = t || this.options.tokenPath, r = A(e, o);
    r && this.storage.setItem(this.tokenName, r);
  }
  getPayload() {
    const e = this.storage.getItem(this.tokenName);
    if (e && e.split(".").length === 3)
      try {
        const o = e.split(".")[1].replace("-", "+").replace("_", "/");
        return JSON.parse(T(o));
      } catch {
      }
  }
  /**
   * Login user using email and password
   * @param  {Object} user           User data
   * @param  {Object} requestOptions Request options
   * @return {Promise}               Request promise
   */
  async login(e, t) {
    t = t || {}, t.url = t.url ? t.url : h(this.options.baseUrl, this.options.loginUrl), t[this.options.requestDataKey] = e || t[this.options.requestDataKey], t.method = t.method || "POST", t.withCredentials = t.withCredentials || this.options.withCredentials;
    const o = this.$http(t);
    return this.setToken(o), o;
  }
  /**
   * Register new user
   * @param  {Object} user           User data
   * @param  {Object} requestOptions Request options
   * @return {Promise}               Request promise
   */
  async register(e, t) {
    t = t || {}, t.url = t.url ? t.url : h(this.options.baseUrl, this.options.registerUrl), t[this.options.requestDataKey] = e || t[this.options.requestDataKey], t.method = t.method || "POST", t.withCredentials = t.withCredentials || this.options.withCredentials;
    const o = this.$http(t);
    return this.setToken(o), o;
  }
  /**
   * Logout current user
   * @param  {Object} requestOptions  Logout request options object
   * @return {Promise}                Request promise
   */
  async logout(e) {
    if (!this.isAuthenticated())
      throw new Error("There is no currently authenticated user");
    if (e = e || {}, e.url || this.options.logoutUrl) {
      e.url = e.url ? e.url : h(this.options.baseUrl, this.options.logoutUrl), e.method = e.method || "POST", e[this.options.requestDataKey] = e[this.options.requestDataKey] || void 0, e.withCredentials = e.withCredentials || this.options.withCredentials;
      const t = this.$http(e);
      return this.storage.removeItem(this.tokenName), t;
    } else
      this.storage.removeItem(this.tokenName);
  }
  /**
   * Authenticate user using authentication provider
   *
   * @param  {String} provider       Provider name
   * @param  {Object} userData       User data
   * @param  {Object} options        Options, to override provider config
   * @return {Promise}               Request promise
   */
  async authenticate(e, t, o) {
    let r = this.options.providers[e];
    if (!r)
      throw new Error("Unknown provider");
    r = Object.assign({}, r, o);
    let n;
    switch (r.oauthType) {
      case "1.0":
        n = new U(
          this.$http,
          this.storage,
          r,
          this.options
        );
        break;
      case "2.0":
        n = new b(
          this.$http,
          this.storage,
          r,
          this.options
        );
        break;
      default:
        throw new Error("Invalid OAuth type");
    }
    const s = await n.init(t);
    if (this.setToken(s, r.tokenPath), this.isAuthenticated())
      return s;
    throw new Error("Authentication failed");
  }
  /**
   * Link user using authentication provider without login
   *
   * @param  {String} provider       Provider name
   * @param  {Object} userData       User data
   * @param  {Object} options        Options, to override provider config
   * @return {Promise}               Request promise
   */
  async link(e, t, o) {
    let r = this.options.providers[e];
    if (!r)
      throw new Error("Unknown provider");
    r = Object.assign({}, r, o);
    let n;
    switch (r.oauthType) {
      case "1.0":
        n = new U(
          this.$http,
          this.storage,
          r,
          this.options
        );
        break;
      case "2.0":
        n = new b(
          this.$http,
          this.storage,
          r,
          this.options
        );
        break;
      default:
        throw new Error("Invalid OAuth type");
    }
    let s = n.init(t);
    return s[this.options.responseDataKey] && (s = s[this.options.responseDataKey]), s;
  }
}
let f;
const Q = {
  install(i, e) {
    if (e || (e = {}), !f) {
      let t = i.config.globalProperties.$http;
      if (e.axios)
        t = e.axios;
      else if (!t)
        throw new Error("No axios instance found, as option or as vue global");
      f = new V(t, e), i.config.globalProperties.$auth = f;
    }
  }
};
export {
  Q as default
};
//# sourceMappingURL=vue-authenticate.es.js.map

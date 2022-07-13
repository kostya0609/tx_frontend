import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  actions : {
    async query (ctx, params){
      if(!('type' in params))
        params.type = 'json'

      let body, header = {};

      if(params.type == 'json'){
        body = {
          token : ctx.getters.token,
          ...params.data
        }
        header['Content-Type'] = 'application/json;charset=utf-8';
      }else{
        body = params.data;
        body.append('token',ctx.getters.token)
      }

      try {
        let query = await fetch(ctx.getters.domain + params.url, {
          method: 'post',
          headers: header,
          body: params.type == 'json' ? JSON.stringify(body) : body
        });
        let result = await query.json();

        if('token' in result){
          ctx.commit('setToken',result.token);
        }

        return result;
      }catch(e){
        return {'status' : 'error','message' : 'Некорректный ответ сервера'};
      }
    }
  },
  mutations : {
    setLoading(s,v){
      s.loading = v;
    },
    setToken(s,v){
      localStorage.setItem('token',v);
      s.token = v
    },
    setComponent_params(s,v){
      s.component_params = v;
    },
  },

  state : {
    token               : 'gfgfghdhds',
    //token               : localStorage.getItem('token'),
    domain              : 'https://lara.cyberbiz.pro/api/tx',
    loading             : true,
    page                : 'request',
    component           : 'list',
    component_params    : {},
  },

  getters : {
    loading             : s => s.loading,
    domain              : s => s.domain,
    token               : s => s.token,
    component_params    : s => s.component_params,
  },
});

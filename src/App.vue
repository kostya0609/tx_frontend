<template>
  <div id="app" v-loading="$store.getters.loading">

    <div v-if="!token">
      <div class="authorize-form">
        <div class="logo">Лицензионный отдел</div>
        <template v-if="!login.correct">
          <div class="form-element">
            <span v-if="error" v-html="error" style="color:red;font-size: 16px;display: block;margin-bottom: 10px;"></span>
            <el-input v-mask="'+7-###-###-##-##'" placeholder="Введите номер телефона" v-model="login.text" />
            <el-button style="width: 100%;margin-top:10px;" @click="sendLogin">Получить код</el-button>
          </div>
        </template>
        <template v-if="login.correct && time.full > 0">
          <div class="form-element">
            <span style="font-size: 16px;display: block;margin-bottom: 10px;">
              На ваш номер <b v-html="login.text" />
              отправлено SMS с кодом авторизации СМС актуально еще
              {{ (time.minutes + '').padStart(2,'0') }}:{{ (time.seconds + '').padStart(2,'0')}}
            </span>
            <span v-if="error" v-html="error" style="color:red;font-size: 16px;display: block;margin-bottom: 10px;"></span>
            <el-input placeholder="Укажите код из SMS" v-model="login.code" />
            <el-button style="width: 100%;margin-top:10px;" @click="sendCode">Войти</el-button>
          </div>
        </template>
      </div>
    </div>
    <div v-else>
      <Root />
    </div>

  </div>
</template>

<script>

import Root  from './components/root'

export default {
  name: 'App',
  components : {Root },
  computed : {
    token : function(){
      return this.$store.getters.token;
    }
  },
  data: function (){
    return {
      login : {
        text    : '',
        code    : '',
        correct : false
      },
      time : {
        full : 0,
        seconds : 0,
        minutes : 0
      },
      error : ''
    };
  },
  methods : {
    sendLogin : async function() {
      this.$store.commit('setLoading', true);
      let result = await this.$store.dispatch('query', {url: '/auth/login', data: {login: this.login.text}});
      if (result.status == 'success') {
        this.login.correct = true;
        this.time.full = result.time;
        this.error = '';
      } else {
        this.error = result.message;
      }
      this.$store.commit('setLoading',false);
    },
    sendCode : async function() {
      this.$store.commit('setLoading', true);
      let result = await this.$store.dispatch('query', {url: '/auth/code', data: {code: this.login.code}});
      if (result.status == 'success') {
        this.time.full = 0;
        this.error = '';
      } else {
        this.error = result.message;
      }
      this.$store.commit('setLoading',false);
    },
  },
  created : async function(){
    this.$store.commit('setLoading',false);
  },
  watch : {
    'time.full' : function(val){
      if(this.time.full > 0){
        setTimeout(() => {
          this.time.full--;
        },1000);
        this.time.seconds = this.time.full % 60;
        this.time.minutes = parseInt((this.time.full / 60),10);
      }else{
        this.login = {
          text    : '',
          code    : '',
          correct : false
        };
        this.time = {
          full    : 0,
          minutes : 0,
          seconds : 0
        }
      }
    }
  }
}
</script>
<style>

.authorize-form{
  display: grid;
  height: 100vh;
}
.authorize-form .logo{
  display: grid;
  justify-content: center;
  align-self: end;
  color: #ff8c00;
  font-size: 28px;
  font-style: italic;
  margin-bottom: 20px;
  font-weight: bold;
}
.form-element{
  display: grid;
  width: 320px;
  justify-self: center;
  align-self: start;
}
.button_wrapper{
  display: flex;
}
.button_wrapper button{
  display: flex;
  margin-left: auto;
}
.three_fields{
  display: grid !important;
  grid-template-columns: 32% 32% 32%;
  grid-gap: 2%;
}
.two_fields{
  display: grid !important;
  grid-template-columns: 49% 49%;
  grid-gap: 2%;
}
.add-form-row{
  margin-bottom: 10px;
}
.add-form-fields{
  display: flex;
}
.add-form-fields button{
  margin-left: 2%;
}
.multiple-value{
  margin-bottom: 10px;
}
.multiple-element{
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
}
.add-form-row .multiple-value:last-child{
  margin-bottom: 0;
}
.dialog-button-list{
  width: 100%;
  margin-bottom: 10px !important;
  display: block !important;
  margin-left: 0 !important;
}
.el-notification__content{
  text-align: left !important;
  font-weight: bold !important;
}
.add-form-label{
  font-weight: bold;
}

small {
  color: #ff2400;
}
.invalid {
  border:solid 1px;
  border-color: #ff2400;
}

</style>
<template>
  <div>
    <div class="add-form-row">
      <label class="add-form-label">№ Лицензии</label>
      <el-input placeholder="№ Лицензии" v-model="license.number" :class="errors.number  ? 'invalid' : ''"/>
      <small v-if="errors.number">{{errors.number}}</small>
    </div>
    <div class="add-form-row">
      <label class="add-form-label">Дата выдачи</label>
      <el-date-picker
          v-model="license.data_start"
          :class="errors.data_start  ? 'invalid' : ''"
          :placeholder="'Введите значение'"
          type="date"
          format="dd.MM.yyyy"
          value-format="dd.MM.yyyy"
          :style="'width: 100%;'"
      ></el-date-picker>
      <small v-if="errors.data_start">{{errors.data_start}}</small>
    </div>
    <div class="add-form-row">
      <label class="add-form-label">Дата передачи водителю</label>
      <el-date-picker
          v-model="license.data_give"
          :class="errors.data_give  ? 'invalid' : ''"
          :placeholder="'Введите значение'"
          type="date"
          format="dd.MM.yyyy"
          value-format="dd.MM.yyyy"
          :style="'width: 100%;'"
      ></el-date-picker>
      <small v-if="errors.data_give">{{errors.data_give}}</small>
    </div>
    <div class="add-form-row">
      <el-button style="width:100%" @click="saveLicense">Сохранить</el-button>
    </div>
  </div>
</template>

<script>
import license from "@/components/add/license";

export default {
  name: "ListLicense",
  props : ['auto'],
  data (){
    return {
      license :{
        number      : '',
        data_start  : '',
        data_give   : '',
      },
      errors :{
        number     : null,
        data_start : null,
        data_give  : null,
      },
    }
  },
  methods :{
    async getData(){
      this.$store.commit('setLoading',true);

      // let result = await this.$store.dispatch('query',{url : '/license/get-edit',data : {
      //     auto : this.auto,
      //   }});
      // if(result.status == 'success') {
      //   this.license = result.data;
      // }else
      //   this.$notify.error({title : 'Возникла проблема' , message :  'Некорректный ответ сервера'});

      this.license.number     = 'какой-то номер';
      this.license.data_start = '25.09.2021';
      this.license.data_give  = '26.09.2021';

      this.$store.commit('setLoading',false);
    },
    async saveLicense(){
      if (!this.license.number)     return this.errors.number = 'Необходимо ввести номер лицензии';
      if (!this.license.data_start) return this.errors.data_start = 'Необходимо указать дату выдачи';
      if (!this.license.data_give)  return this.errors.data_give = 'Необходимо указать дату передачи водителю';

      this.$store.commit('setLoading',true);

      // let result = await this.$store.dispatch('query',{url : '/license/set-edit',data : {
      //     auto : this.auto,
      //     ... this.license,
      //   }});
      // if(result.status == 'success') {
      //   this.technicalCard = result.data;
      // }else
      //   this.$notify.error({title : 'Возникла проблема' , message :  'Некорректный ответ сервера'});

      this.$store.commit('setLoading',false);
    },
  },
  created() {
    this.getData();
  },
  watch : {
    'license.number': function () {
      this.errors.number = null;
    },
    'license.data_start': function () {
      this.errors.data_start = null;
    },
    'license.data_give': function () {
      this.errors.data_give = null;
    },
  }
}
</script>



<template>
  <div>
    <div class="add-form-row">
      <label class="add-form-label">№ Договора</label>
      <el-input placeholder="№ Договора" v-model="contract.number" :class="errors.number  ? 'invalid' : ''"/>
      <small v-if="errors.number">{{errors.number}}</small>
    </div>
    <div class="add-form-row">
      <label class="add-form-label">Дата подписания</label>
      <el-date-picker
          v-model="contract.data"
          :class="errors.data  ? 'invalid' : ''"
          :placeholder="'Введите значение'"
          type="date"
          format="dd.MM.yyyy"
          value-format="dd.MM.yyyy"
          :style="'width: 100%;'"
      ></el-date-picker>
      <small v-if="errors.data">{{errors.data}}</small>
    </div>
    <div class="add-form-row">
      <el-button style="width:100%" @click="saveContract">Сохранить</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListСontract",
  props : ['auto'],
  data (){
    return {
      contract :{
        number : '',
        data   : '',
      },
      errors :{
        number : null,
        data   : null,
      },
    }
  },
  methods : {
    async getData(){
      this.$store.commit('setLoading',true);

        // let result = await this.$store.dispatch('query',{url : '/contract/get-edit',data : {
        //     auto : this.auto,
        //   }});
        // if(result.status == 'success') {
        //   this.contract = result.data;
        // }else
        //   this.$notify.error({title : 'Возникла проблема' , message :  'Некорректный ответ сервера'});

      this.contract.number = 'какой-то номер';
      this.contract.data = '25.09.2021';

      this.$store.commit('setLoading',false);
    },
    async saveContract(){
      if (!this.contract.number) return this.errors.number = 'Необходимо ввести номер договора';
      if (!this.contract.data)   return this.errors.data = 'Необходимо указать дату подписания';

      this.$store.commit('setLoading',true);

      // let result = await this.$store.dispatch('query',{url : '/contract/set-edit',data : {
      //     auto : this.auto,
      //     ... this.contract,
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
    'contract.number': function () {
      this.errors.number = null;
    },
    'contract.data': function () {
      this.errors.data = null;
    },
  }
}
</script>



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
      <el-button style="width:100%" @click="addContract">Добавить</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddContract",
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
  methods :{
    async addContract(){
      if (!this.contract.number) return this.errors.number = 'Необходимо ввести номер договора';
      if (!this.contract.data)   return this.errors.data = 'Необходимо указать дату подписания';

      this.$store.commit('setLoading',true);

      // let result = await this.$store.dispatch('query',{url : '/grid/add-contract',data : {
      //     auto : this.auto,
      //     ...this.contract,
      //   }
      // });

      let result = {status : 'success', title : 'Успешно', message : 'Договор успешно добавлен'};

      if(result.status == 'success'){
        this.contract = { number : '', data : ''};
        await this.$emit('customModal',{key : 'addContract',value : false});
      }else{
        await this.$emit('customModal',{key : 'addContract',value : true});
      }

      this.$store.commit('setLoading',false);
      await this.$notify({
        title                     : result.title,
        message                   : result.message,
        type                      : result.status,
        dangerouslyUseHTMLString  : true,
        duration                  : 10000,
        showClose                 : true
      });
    },
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



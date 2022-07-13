<template>
  <div>
    <div class="add-form-row">
      <label class="add-form-label">№ Техосмотра</label>
      <el-input placeholder="№ Техосмотра" v-model="technicalCard.number" :class="errors.number  ? 'invalid' : ''"/>
      <small v-if="errors.number">{{errors.number}}</small>
    </div>
    <div class="add-form-row">
      <label class="add-form-label">Дата выдачи</label>
      <el-date-picker
          v-model="technicalCard.data_start"
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
      <el-button style="width:100%" @click="addTechnicalCard">Добавить</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddTechnicalCard",
  props : ['auto'],
  data (){
    return {
      technicalCard :{
        number      : '',
        data_start  : '',
      },
      errors :{
        number     : null,
        data_start : null,
      },
    }
  },
  methods :{
    async addTechnicalCard(){
      if (!this.technicalCard.number)     return this.errors.number = 'Необходимо ввести номер ТО';
      if (!this.technicalCard.data_start) return this.errors.data_start = 'Необходимо указать дату выдачи';

      this.$store.commit('setLoading',true);

      // let result = await this.$store.dispatch('query',{url : '/grid/add-TC',data : {
      //     auto : this.auto,
      //     ...this.technicalCard,
      //   }
      // });

      let result = {status : 'success', title : 'Успешно', message : 'Техосмотр успешно добавлен'};

      if(result.status == 'success'){
        this.technicalCard = { number : '', data_start : ''};
        await this.$emit('customModal',{key : 'addTechnicalCard',value : false});
      }else{
        await this.$emit('customModal',{key : 'addTechnicalCard',value : true});
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
    'technicalCard.number': function () {
      this.errors.number = null;
    },
    'technicalCard.data_start': function () {
      this.errors.data_start = null;
    },
  }
}
</script>

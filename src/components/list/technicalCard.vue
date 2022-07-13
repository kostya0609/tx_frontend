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
      <label class="add-form-label">Дата окончания ТО - {{technicalCard.data_final}}</label>
    </div>
    <div class="add-form-row">
      <label class="add-form-label">До окончания ТО дней - {{technicalCard.daysToFinal}}</label>

    </div>
    <div class="add-form-row">
      <el-button style="width:100%" @click="saveTechnicalCard">Сохранить</el-button>
    </div>
  </div>
</template>

<script>
import technicalCard from "@/components/add/technicalCard";

export default {
  name: "ListTechnicalCard",
  props : ['auto'],
  data (){
    return {
      technicalCard : {
        number      : '',
        data_start  : '',
        data_final  : '',
        daysToFinal : '',
      },

      errors : {
        number     : null,
        data_start : null,
      },
    }
  },
  methods : {
    async getData(){
      this.$store.commit('setLoading',true);

      // let result = await this.$store.dispatch('query',{url : '/technicalCard/get-edit',data : {
      //     auto : this.auto,
      //   }});
      // if(result.status == 'success') {
      //   this.technicalCard = result.data;
      // }else
      //   this.$notify.error({title : 'Возникла проблема' , message :  'Некорректный ответ сервера'});

      this.technicalCard.number = 'Какой-то номер';
      this.technicalCard.data_start = '25.09.2021';
      this.technicalCard.data_final = '24.09.2021';
      this.technicalCard.daysToFinal = '360';

      this.$store.commit('setLoading',false);
    },
    async saveTechnicalCard(){
      if (!this.technicalCard.number)     return this.errors.number = 'Необходимо ввести номер ТО';
      if (!this.technicalCard.data_start) return this.errors.data_start = 'Необходимо указать дату выдачи';

      this.$store.commit('setLoading',true);

      // let result = await this.$store.dispatch('query',{url : '/technicalCard/set-edit',data : {
      //     auto : this.auto,
      //     ... this.technicalCard,
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
    'technicalCard.number': function () {
      this.errors.number = null;
    },
    'technicalCard.data_start': function () {
      this.errors.data_start = null;
    },
  }
}
</script>

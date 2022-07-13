<template>
  <div>
    <div class="add-form-row">
      <label class="add-form-label">Комментарий</label>
      <el-input type="textarea" rows="4" placeholder="Комментарий" v-model="comments.text" :class="errors.text  ? 'invalid' : ''"/>
      <small v-if="errors.text">{{errors.text}}</small>
    </div>
    <div class="add-form-row">
      <el-button style="width:100%" @click="saveComments">Сохранить</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListComments",
  props : ['auto'],
  data (){
    return {
      comments :{
        text : '',
      },
      errors :{
        text : null,
      },
    }
  },
  methods : {
    async getData(){
      this.$store.commit('setLoading',true);

      // let result = await this.$store.dispatch('query',{url : '/comments/get-edit',data : {
      //     auto : this.auto,
      //   }});
      // if(result.status == 'success') {
      //   this.comments = result.data;
      // }else
      //   this.$notify.error({title : 'Возникла проблема' , message :  'Некорректный ответ сервера'});

      this.comments.text = 'Не правильно еб***е волки';

      this.$store.commit('setLoading',false);
    },
    async saveComments(){
      if (!this.comments.text) return this.errors.text = 'Необходимо ввести комментарий';

      this.$store.commit('setLoading',true);

      // let result = await this.$store.dispatch('query',{url : '/comments/set-edit',data : {
      //     auto : this.auto,
      //     ... this.technicalCard,
      //   }});
      // if(result.status == 'success') {
      //   this.comments = result.data;
      // }else
      //   this.$notify.error({title : 'Возникла проблема' , message :  'Некорректный ответ сервера'});

      this.$store.commit('setLoading',false);
    },
  },
  created() {
    this.getData();
  },
  watch : {
    'comments.text': function () {
      this.errors.text = null;
    },
  },
}
</script>



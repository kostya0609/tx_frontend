<template>
  <div>
    <div class="add-form-row">
      <label class="add-form-label">Комментарий</label>
      <el-input type="textarea" rows="4" placeholder="Комментарий" v-model="comments.text" :class="errors.text  ? 'invalid' : ''"/>
      <small v-if="errors.text">{{errors.text}}</small>
    </div>
    <div class="add-form-row">
      <el-button style="width:100%" @click="addComments">Добавить</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddComments",
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
  methods :{
    async addComments(){
      if (!this.comments.text) return this.errors.text = 'Необходимо ввести комментарий';

      this.$store.commit('setLoading',true);

      // let result = await this.$store.dispatch('query',{url : '/grid/add-comments',data : {
      //     auto : this.auto,
      //     ...this.comments,
      //   }
      // });

      let result = {status : 'success', title : 'Успешно', message : 'Комментарий успешно добавлен'};

      if(result.status == 'success'){
        this.comments = { text : ''};
        await this.$emit('customModal',{key : 'addComments',value : false});
      }else{
        await this.$emit('customModal',{key : 'addComments',value : true});
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
    'comments.text': function () {
      this.errors.text = null;
    },
  }
}
</script>



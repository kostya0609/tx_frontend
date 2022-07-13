<template>
  <div>
    <div class="add-form-row">
      <label class="add-form-label">Название задачи</label>
      <el-input placeholder="Название задачи" v-model="task.name" :class="errors.name  ? 'invalid' : ''"/>
      <small v-if="errors.name">{{errors.name}}</small>
    </div>
    <div class="add-form-row">
      <label class="add-form-label">Текст задачи</label>
      <el-input placeholder="Текст задачи" type="textarea" rows="4" v-model="task.text" :class="errors.text  ? 'invalid' : ''"/>
      <small v-if="errors.text">{{errors.text}}</small>
    </div>
    <div class="add-form-row">
      <label class="add-form-label">Ответственный</label>
        <el-select
            v-model="task.responsible"
            placeholder="Ответственный"
            :class="['change-fields-list', errors.responsible ? 'invalid' : '']"
        >
          <el-option
              v-for="item in responsibles"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      <small v-if="errors.responsible">{{errors.responsible}}</small>

    </div>
    <div class="add-form-row">
      <label class="add-form-label">Выполнить до</label>
      <el-date-picker
          v-model="task.data"
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
      <el-button style="width:100%" @click="addTask">Добавить</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddTask",
  props : ['auto'],
  data (){
    return {
      responsibles : [{value : 1, label : 'Вася'}],
      task   : {
        name        : '',
        text        : '',
        responsible : '',
        data        : '',
      },
      errors : {
        name        : null,
        text        : null,
        responsible : null,
        data        : null,
      },
    }
  },
  methods :{
    async getData(){
      // let result = await this.$store.dispatch('query',{url : '/grid/add-task-responsible',data : {}  });
      // if(result.status == 'success'){
      // if (result.responsibles.length > 0) this.responsibles = result.responsibles;
      // }
    },
    async addTask(){
      if (!this.task.name)        return this.errors.name = 'Необходимо ввести название задачи';
      if (!this.task.text)        return this.errors.text = 'Необходимо ввести текст задачи';
      if (!this.task.responsible) return this.errors.responsible = 'Необходимо выбрать ответственного';
      if (!this.task.data)        return this.errors.data = 'Необходимо указать срок выполнения задачи';

      this.$store.commit('setLoading',true);

      // let result = await this.$store.dispatch('query',{url : '/grid/add-task',data : {
      //     auto : this.auto,
      //     ...this.task,
      //   }
      // });

      let result = {status : 'success', title : 'Успешно', message : 'Задача успешно добавлена'};

      if(result.status == 'success'){
        this.task = { name : '', text : '', responsible : '', data : ''};
        await this.$emit('customModal',{key : 'addTask',value : false});
      }else{
        await this.$emit('customModal',{key : 'addTask',value : true});
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
  created() {
    this.getData();
  },
  watch : {
    'task.name': function () {
      this.errors.name = null;
    },
    'task.text': function () {
      this.errors.text = null;
    },
    'task.responsible': function () {
      this.errors.responsible = null;
    },
    'task.data': function () {
      this.errors.data = null;
    },
  },
}
</script>



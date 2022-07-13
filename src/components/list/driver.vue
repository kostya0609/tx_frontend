<template>
  <div>
    <Grid :name="name" v-if="load" />
  </div>
</template>
<script>
export default {
  name : 'ListDriver',
  props : ['auto'],
  data : function(){
    return {
      load : false,
      name : 'driver',
      grid : {
        pagination : {
          show : 'none',
          total : 0,
          changeSize : function(value){

          }.bind(this),
          changePage : function(value){

          }.bind(this)
        },
        context : [
          {
            name : 'Открепить от авто',
            function : (row) => {
              this.$confirm(`Вы уверены, что хотите открепить водителя - ${row.driver[0].value} от ${this.$store.getters.component_params.auto_brand[0].value} - ${this.$store.getters.component_params.registration_number[0].value} ?`).then(() => {
                this.removeDriver(row);
              }).catch(() => {});
            }
          },
        ],
        header : {
          id : {
            name : 'ID',
            width : 80
          },
          driver : {
            name : 'ФИО',
            width : 350,
            child : ['driver_charter','driver_phone']
          },
          driver_charter : {
            name : 'Водительское удостоверение',
            width : 350,
          },
          driver_phone : {
            name : 'Телефон водителя',
            width : 350,
          },
          comments : {
            name : 'Примечания',
            width : 350,
          },

        },
        elements : []
        }
      }
  },
  methods : {
    removeDriver(row){
      console.log(`надо просто удалить водителя ${row.id[0].value} у машины ${this.auto}`)
    },
    async getData(){
      this.$store.commit('setLoading',true);
      let result = await this.$store.dispatch('query',{url : '/grid/driver-list',data : {
          auto : this.auto,
        }});

      if(result.status == 'success') {
        this.$grid.commit('normalizeElement',{name : this.name,data : {elements : result.data}});
      }else
        this.$notify.error({title : 'Возникла проблема' , message :  'Некорректный ответ сервера'});
      this.$store.commit('setLoading',false);
    },
  },
  created : function(){
    this.load = this.$grid.dispatch('createGrid', {name : this.name, data : this.grid});
    this.getData();
  },
}
</script>
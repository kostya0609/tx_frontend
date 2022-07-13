<template>
  <div>
    <el-select @change="changeCity" v-model="city" placeholder="Укажите город">
      <el-option
          v-for="(item,i) in cities"
          :key="i"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>

    <template v-if="city">
      <portal to="grid-button-main">
        <div class="button_wrapper">
          <el-button @click="openModal.addAuto = true">Добавить авто</el-button>
        </div>
      </portal>

      <Grid :name="grid_name" v-if="create_grid"/>

      <el-dialog title="Добавить авто" :visible.sync="openModal.addAuto" width="40%" >
        <AddAuto @customModal="showModal" :city="city" :cities="cities"/>
      </el-dialog>

      <el-dialog :title="'Добавить водителя : ' + modal.title" :visible.sync="openModal.addDriver" width="50%" @closed="nextModal = null">
        <AddDriver @customModal="showModal" :auto="auto"/>
      </el-dialog>
      <el-dialog :title="'Список водителей : ' + modal.title" :visible.sync="openModal.listDriver" width="80%" @closed="nextModal = null">
        <ListDriver :auto="auto"  v-if="openModal.listDriver"/>
      </el-dialog>

      <el-dialog :title="'Добавить техосмотр : ' + modal.title" :visible.sync="openModal.addTechnicalCard" width="40%" @closed="nextModal = null">
        <AddTechnicalCard @customModal="showModal" :auto="auto"/>
      </el-dialog>
      <el-dialog :title="'Техосмотр : ' + modal.title" :visible.sync="openModal.listTechnicalCard" width="40%" @closed="nextModal = null">
        <ListTechnicalCard :auto="auto"  v-if="openModal.listTechnicalCard"/>
      </el-dialog>

      <el-dialog :title="'Добавить лицензию : ' + modal.title" :visible.sync="openModal.addLicense" width="40%" @closed="nextModal = null">
        <AddLicense @customModal="showModal" :auto="auto"/>
      </el-dialog>
      <el-dialog :title="'Лицензия : ' + modal.title" :visible.sync="openModal.listLicense" width="40%" @closed="nextModal = null">
        <ListLicense :auto="auto"  v-if="openModal.listLicense"/>
      </el-dialog>

      <el-dialog :title="'Добавить договор : ' + modal.title" :visible.sync="openModal.addContract" width="40%" @closed="nextModal = null">
        <AddContract @customModal="showModal" :auto="auto"/>
      </el-dialog>
      <el-dialog :title="'Договор : ' + modal.title" :visible.sync="openModal.listContract" width="40%" @closed="nextModal = null">
        <ListContract :auto="auto"  v-if="openModal.listContract"/>
      </el-dialog>

      <el-dialog :title="'Добавить задание : ' + modal.title" :visible.sync="openModal.addTask" width="40%" @closed="nextModal = null">
        <AddTask @customModal="showModal" :auto="auto"/>
      </el-dialog>
      <el-dialog :title="'Задание : ' + modal.title" :visible.sync="openModal.listTask" width="40%" @closed="nextModal = null">
        <ListTask :auto="auto"  v-if="openModal.listTask"/>
      </el-dialog>

      <el-dialog :title="'Добавить комментарий : ' + modal.title" :visible.sync="openModal.addComments" width="40%" @closed="nextModal = null">
        <AddComments @customModal="showModal" :auto="auto"/>
      </el-dialog>
      <el-dialog :title="'Комментарий : ' + modal.title" :visible.sync="openModal.listComments" width="40%" @closed="nextModal = null">
        <ListComments :auto="auto"  v-if="openModal.listComments"/>
      </el-dialog>

      <el-dialog :title="modal.prefix + modal.title" :visible.sync="openModal.listButton" width="30%" @closed="openNextModal">
        <el-button class="dialog-button-list" @click="setButtonList('driver')"          >Водитель    </el-button>
        <el-button class="dialog-button-list" @click="setButtonList('technicalCard')"   >Техосмотр   </el-button>
        <el-button class="dialog-button-list" @click="setButtonList('license')"         >Лицензия    </el-button>
        <el-button class="dialog-button-list" @click="setButtonList('contract')"        >Договор     </el-button>
        <el-button class="dialog-button-list" @click="setButtonList('task')"            >Задача      </el-button>
        <el-button class="dialog-button-list" @click="setButtonList('comments')"        >Комментарий </el-button>
      </el-dialog>

    </template>
  </div>
</template>
<script>
import AddAuto    from './add/auto'

import AddDriver  from './add/driver'
import ListDriver  from './list/driver'

import AddTechnicalCard  from './add/technicalCard'
import ListTechnicalCard from './list/technicalCard'

import AddLicense from './add/license'
import ListLicense from './list/license'

import AddContract from './add/contract'
import ListContract from './list/contract'

import AddTask from './add/task'
import ListTask from './list/task'

import AddComments from './add/comments'
import ListComments from './list/comments'

export default {
  components : {AddAuto, AddDriver, ListDriver, AddTechnicalCard, ListTechnicalCard, AddLicense, ListLicense, AddContract, ListContract, AddTask, ListTask, AddComments, ListComments},
  data : function(){
    return {
      auto        : null,
      cities      : [],
      city        : 15,
      grid_name   : 'main',
      create_grid : false,
      nextModal   : null,
      modal       : {
        title  : '',
        prefix : '',
        event  : 'add'
      },
      openModal   : {
        addAuto           : false,
        listButton        : false,
        addDriver         : false,
        listDriver        : false,
        addTechnicalCard  : false,
        listTechnicalCard : false,
        addLicense        : false,
        listLicense       : false,
        addContract       : false,
        listContract      : false,
        addTask           : false,
        listTask          : false,
        addComments       : false,
        listComments      : false,
      },

      grid : {
        context : [
          {
            name : 'Добавить',
            function : (row) => {
              this.$store.commit('setComponent_params', row)
              this.openModal.listButton = true;
              this.modal.prefix = 'Добавить : ';
              this.modal.title = row.auto_brand[0].value + ' - ' + row.registration_number[0].value;
              this.modal.event = 'add';
              this.auto = row.id;
            }
          },
          {
            name : 'Список',
            function : (row) => {
              this.$store.commit('setComponent_params', row)
              this.openModal.listButton = true;
              this.modal.prefix = 'Добавить : ';
              this.modal.title = row.auto_brand[0].value + ' - ' + row.registration_number[0].value;
              this.modal.event = 'Список';
              this.auto = row.id;
            }
          },
          {
            name : 'Деактивировать',
            function : (row) => {
              console.log(row);
            }
          }
        ],
        pagination : {
          total : 0,
          changeSize : function(value){
            this.$grid.getters['pagination'](this.grid_name).defaultSize = value;
            this.getData();
          }.bind(this),
          changePage : function(value){
            this.$grid.getters['pagination'](this.grid_name).page = value;
            this.getData();
          }.bind(this)
        },
        filter : {
          show : false,
        },
        header : {
          number : {
            name : '№',
            width : 80
          },
          task : {
            name : 'Задачи',
            width : 150,
          },
          registration_number : {
            name : 'Гос номер',
            width : 350,
          },
          auto_brand : {
            name : 'Марка авто',
            width : 350,
            child : ['owner','driver','technical_card','number_license','contract','pay_month','comments']
          },
          owner : {
            name : 'Владелец',
            width : 350,
            child : ['owner_phone']
          },
          owner_phone : {
            name : 'Телефон владельца',
            width : 350,
          },
          driver : {
            name : 'Водитель',
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
          technical_card : {
            name : 'Номер техосмотра',
            width : 350,
            child : ['start_technical_card','finish_technical_card','status_technical_card']
          },
          start_technical_card : {
            name : 'Дата выдачи техосмотра',
            width : 350,
          },
          finish_technical_card : {
            name : 'Дата окончания техосмотра',
            width : 350,
          },
          status_technical_card : {
            name : 'До окончания техосмотра (дней)',
            width : 350,
          },
          number_license : {
            name : 'Номер разрешения',
            width : 350,
            child : ['start_license','start_license_to_drive']
          },
          start_license : {
            name : 'Дата выдачи разрешения',
            width : 350,
          },
          start_license_to_drive : {
            name : 'Дата передачи разрешения водителю',
            width : 350,
          },
          contract : {
            name : 'Номер договора',
            width : 350,
          },
          pay_month : {
            name : 'Месяц оплаты',
            width : 350,
            child : ['pay_sum']
          },
          pay_sum : {
            name : 'Сумма оплаты',
            width : 350,
          },
          comments : {
            name : 'Примечания',
            width : 350,
          },

        },
        elements : [],
      },
    }
  },
  methods : {

    setButtonList : function(key){
      switch(key){
        case 'driver' :
          this.openModal.listButton = false;
          if(this.modal.event == 'add')
            this.nextModal = 'addDriver';
          else
            this.nextModal = 'listDriver';
          break;

        case 'technicalCard' :
          this.openModal.listButton = false;
          if(this.modal.event == 'add')
            this.nextModal = 'addTechnicalCard';
          else
            this.nextModal = 'listTechnicalCard';
          break;

        case 'license' :
          this.openModal.listButton = false;
          if(this.modal.event == 'add')
            this.nextModal = 'addLicense';
          else
            this.nextModal = 'listLicense';
          break;

        case 'contract' :
          this.openModal.listButton = false;
          if(this.modal.event == 'add')
            this.nextModal = 'addContract';
          else
            this.nextModal = 'listContract';
          break;

        case 'task' :
          this.openModal.listButton = false;
          if(this.modal.event == 'add')
            this.nextModal = 'addTask';
          else
            this.nextModal = 'listTask';
          break;

        case 'comments' :
          this.openModal.listButton = false;
          if(this.modal.event == 'add')
            this.nextModal = 'addComments';
          else
            this.nextModal = 'listComments';
          break;
      }
    },
    openNextModal : function(){
      if(this.nextModal)
         this.openModal[this.nextModal] = true;
    },

    showModal : function(e){
      this.openModal[e.key] = e.value;
      if (e.update) this.getData();
    },

    getCity : async function(){
      this.$store.commit('setLoading', true);
      let result = await this.$store.dispatch('query', {url: '/main/city', data: {}});
      if (result.status == 'success') {
        this.cities = result.data;
      }
      this.$store.commit('setLoading',false);
      await this.changeCity();
    },

    getData : async function(){
      this.$store.commit('setLoading',true);
      let result = await this.$store.dispatch('query',{url : '/grid/get',data : {
          total : this.$grid.getters['pagination'](this.grid_name).defaultSize,
          page : this.$grid.getters['pagination'](this.grid_name).page,
          city : this.city
        }});
      if(result.status == 'success') {
        this.$grid.getters['pagination'](this.grid_name).total = result.pagination.total;
        this.$grid.commit('normalizeElement',{name : this.grid_name,data : {elements : result.data}});
      }else
        this.$notify.error({title : 'Возникла проблема' , message :  'Некорректный ответ сервера'});
      this.$store.commit('setLoading',false);

    },

    changeCity : async function(){
      this.$store.commit('setLoading',true);
      this.create_grid = await this.$grid.dispatch('createGrid', {name : this.grid_name, data : this.grid});
      await this.getData()
      this.$store.commit('setLoading',false);
    }
  },

  created : function(){
    this.getCity();
  }
}
</script>
<template>
  <div>
    <div class="add-form-row">
      <div class="add-form-fields two_fields">
        <el-button @click="story = false" :type="!story ? 'primary' : ''">Новый</el-button>
        <el-button @click="story = true"  :type="story  ? 'primary' : ''">Существующий</el-button>
      </div>
    </div>
    <template v-if="!story">
      <div class="add-form-row">
        <label class="add-form-label">ФИО водителя</label>
        <div class="add-form-fields three_fields">
          <el-input placeholder="Фамилия" v-model="driver.last" :class="errors.last  ? 'invalid' : ''"/>
          <el-input placeholder="Имя" v-model="driver.first"    :class="errors.first ? 'invalid' : ''"/>
          <el-input placeholder="Отчество" v-model="driver.second"/>
        </div>
        <small v-if="errors.last">{{errors.last}}</small>
        <small v-if="errors.first">{{errors.first}}</small>
      </div>
      <div class="add-form-row">
        <label class="add-form-label">Телефон водителя</label>
        <div class="add-form-fields multiple-value" v-for="(phone,item) in driver.phone">
          <span class="multiple-element">{{phone}}</span>
          <el-button :class="'hide-fields'" icon="el-icon-close" @click="driver.phone.splice(item,1)" />
        </div>
        <div class="add-form-fields multiple-value">
          <el-input v-mask="'+7-###-###-##-##'" @blur="addDriverPhone" v-model="driver.phoneInput" :class="errors.phone ? 'invalid' : ''" placeholder="Телефон водителя"/>
          <el-button :class="'hide-fields'" icon="el-icon-plus" @click="addDriverPhone" />
        </div>
        <small v-if="errors.phone">{{errors.phone}}</small>
      </div>
      <div class="add-form-row">
        <label class="add-form-label">Водительское удостоверение</label>
        <div class="add-form-fields three_fields">
          <el-input v-model="driver.license.number" :class="errors.license.number ? 'invalid' : ''" placeholder="Номер удостоверения"/>
          <el-date-picker
              v-model="driver.license.date_start"
              :class="errors.license.date_start ? 'invalid' : ''"
              :placeholder="'Введите значение'"
              type="date"
              format="dd.MM.yyyy"
              value-format="dd.MM.yyyy"
              :style="'width: 100%;'"
          ></el-date-picker>
          <el-date-picker
              v-model="driver.license.date_final"
              :class="errors.license.date_final ? 'invalid' : ''"
              :placeholder="'Введите значение'"
              type="date"
              format="dd.MM.yyyy"
              value-format="dd.MM.yyyy"
              :style="'width: 100%;'"
          ></el-date-picker>
        </div>
        <small v-if="errors.license.number">{{errors.license.number}}</small>
        <small v-if="errors.license.date_start">{{errors.license.date_start}}</small>
        <small v-if="errors.license.date_final">{{errors.license.date_final}}</small>
      </div>
    </template>
    <template v-else>
      <div class="add-form-row">
        <label class="add-form-label">Укажите  ФИО</label>
        <div class="add-form-fields">
          <el-select
              v-model="driver_id"
              filterable
              remote
              placeholder="ФИО водителя"
              reserve-keyword
              :remote-method="search"
              :loading="loading"
              @change="clearSelectSearch"
              :ref="'search'"
              :class="['change-fields-list', errors.driver_id ? 'invalid' : '']"
          >
            <el-option
                v-for="item in drivers"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <small v-if="errors.driver_id">{{errors.driver_id}}</small>
        <template v-if="driver_id && driver.first">
          <br>
          <div class="add-form-row">
            <label class="add-form-label">ФИО :</label><br>
              {{driver.last}} {{driver.first}} {{driver.second}}
          </div>
          <div class="add-form-row">
            <label class="add-form-label">Телефон :</label><br>
              <span v-for="(item,key) in driver.phone" :key="key">{{item}} <br></span>
          </div>
          <div class="add-form-row">
            <label class="add-form-label">Удостоверение :</label><br>
              <span v-for="(item,key) in driver.charter" :key="key">Номер : {{item.number}}<br>Срок действия : {{item.date_start}} - {{item.date_final}} <br><br></span>
          </div>
          <br>
        </template>
      </div>
    </template>
    <div class="add-form-row">
      <el-button style="width:100%" @click="addDriver">Добавить</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name : 'AddDriver',
  props : ['auto'],
  data : function(){
    return {
      story     : false,
      loading   : false,
      driver_id : '',
      drivers : [],
      driver  : {
        last        : '',
        first       : '',
        second      : '',
        phoneInput  : '',
        phone       : [],
        license     : {
          number : '',
          date_start : '',
          date_final : ''
        }
      },
      errors  : {
        driver_id   : null,
        last        : null,
        first       : null,
        phone       : null,
        license     : {
          number     : null,
          date_start : null,
          date_final : null
        }
      },
    }
  },
  methods : {
    addDriverPhone(){
      if (this.driver.phoneInput)
        if (this.driver.phoneInput.length === 16) {
          this.driver.phone.push(this.driver.phoneInput);
          this.driver.phoneInput = '';
        } else this.driver.phoneInput = '';
    },

    clearSelectSearch : async function(value){
      let result = await this.$store.dispatch('query',{url : '/main/get-driver',data : {id : value}});
      this.driver.last = result.data.last;
      this.driver.first = result.data.first;
      this.driver.second = result.data.second;
      this.driver.phone = result.data.phone;
      this.driver.charter = result.data.charter;
    },

    search : async function(query){
      this.loading = true;
      new Promise((res,rej) => {
        setTimeout((query) => {
          if(query == this.$refs['search'].query)
            res();
        },1000,query)
      }).then(async () => {
        let result = await this.$store.dispatch('query',{url : '/main/get-driver',data : {q : query}});
        this.drivers = result.data;
        this.loading = false;
      })
    },

    addDriver : async function(){
      if (this.story && !this.driver_id)   return this.errors.driver_id = 'Необходимо указать водителя';
      if (!this.driver.last)               return this.errors.last = 'Необходимо ввести фамилию';
      if (!this.driver.first)              return this.errors.first = 'Необходимо ввести имя';
      if (this.driver.phone.length === 0)  return this.errors.phone = 'Необходимо ввести телефон';
      if (!this.driver.license.number)     return this.errors.license.number = 'Необходимо ввести номер удостоверения';
      if (!this.driver.license.date_start) return this.errors.license.date_start = 'Необходимо ввести дату выдачи удостоверения';
      if (!this.driver.license.date_final) return this.errors.license.date_final = 'Необходимо ввести дату окончания срока действия удостоверения';

      this.$store.commit('setLoading',true);

      let result = await this.$store.dispatch('query',{url : '/grid/add-driver',data : {
          auto        : this.auto,
          story       : this.story ? 1 : 0,
          driver_id   : this.driver_id,
          ...this.driver,
        }
      });
      if(result.status == 'success' || result.status == 'info'){
        this.driver   = {
          last        : '',
          first       : '',
          second      : '',
          phoneInput  : '',
          phone       : [],
          license     : {
            number : '',
            date_start : '',
            date_final : ''
          }
        };
        await this.$emit('customModal',{key : 'addDriver',value : false});
      }else{
        await this.$emit('customModal',{key : 'addDriver',value : true});
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
    }
  },
  watch : {
    story : function(){
      this.driver   = {
        last        : '',
        first       : '',
        second      : '',
        phoneInput  : '',
        phone       : [],
        license     : {
          number : '',
          date_start : '',
          date_final : ''
        }
      };
    },
    'driver_id': function () {
      this.errors.driver_id = null;
    },
    'driver.last': function () {
      this.errors.last = null;
    },
    'driver.first': function () {
      this.errors.first = null;
    },
    'driver.phone': function () {
      this.errors.phone = null;
    },
    'driver.license.number': function () {
      this.errors.license.number = null;
    },
    'driver.license.date_start': function () {
      this.errors.license.date_start = null;
    },
    'driver.license.date_final': function () {
      this.errors.license.date_final = null;
    },
  },

}
</script>
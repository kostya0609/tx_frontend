<template>
  <div>
<!--    выбор города-->
    <div class="add-form-row">
      <label class="add-form-label">Город</label>
      <div class="add-form-fields">
        <el-select v-model="localCity" :style="'width: 100%;'">
          <el-option
              v-for="(item,i) in cities"
              :key="i"
              :label="item.label"
              :value="item.value">
          </el-option>
      </el-select>
      </div>
    </div>

<!--    собственник-->
    <div class="add-form-row">
      <label class="add-form-label">ФИО собственника</label>
      <div class="add-form-fields three_fields">
        <el-input placeholder="Фамилия" v-model="owner.last" :class="errors.owner.last  ? 'invalid' : ''"/>
        <el-input placeholder="Имя" v-model="owner.first" :class="errors.owner.first  ? 'invalid' : ''"/>
        <el-input placeholder="Отчество" v-model="owner.second"/>
      </div>
      <small v-if="errors.owner.last">{{errors.owner.last}}</small>
      <small v-if="errors.owner.first">{{errors.owner.first}}</small>
    </div>
    <div class="add-form-row">
      <label class="add-form-label">Паспортные данные собственника</label>
      <div class="add-form-fields three_fields">
        <el-input placeholder="Серия" v-model="owner.passport.series" :class="errors.owner.passport.series  ? 'invalid' : ''"/>
        <el-input placeholder="Номер" v-model="owner.passport.number" :class="errors.owner.passport.number  ? 'invalid' : ''"/>
        <el-date-picker
            v-model="owner.passport.birthday"
            :class="errors.owner.passport.birthday  ? 'invalid' : ''"
            placeholder="Дата рождения"
            type="date"
            format="dd.MM.yyyy"
            value-format="dd.MM.yyyy"
            :style="'width: 100%;'"
        ></el-date-picker>
      </div>
      <small v-if="errors.owner.passport.series">{{errors.owner.passport.series}}</small>
      <small v-if="errors.owner.passport.number">{{errors.owner.passport.number}}</small>
      <small v-if="errors.owner.passport.birthday">{{errors.owner.passport.birthday}}</small>
    </div>
    <div class="add-form-row">
      <label class="add-form-label">Телефон собственника</label>
      <div class="add-form-fields multiple-value" v-for="(phone,item) in owner.phone">
        <span class="multiple-element">{{phone}}</span>
        <el-button :class="'hide-fields'" icon="el-icon-close" @click="owner.phone.splice(item,1)" />
      </div>
      <div class="add-form-fields multiple-value">
        <el-input v-mask="'+7-###-###-##-##'" @blur="addOwnerPhone" v-model="owner.phoneInput" :class="errors.owner.phone  ? 'invalid' : ''"/>
        <el-button :class="'hide-fields'" icon="el-icon-plus" @click="addOwnerPhone" />
      </div>
      <small v-if="errors.owner.phone">{{errors.owner.phone}}</small>
    </div>

<!--    водитель = собственник-->
    <div class="add-form-row">
      <el-checkbox class="add-form-label"  v-model="ownerIsDriver">Водитель = Собственник</el-checkbox>
    </div>

<!--    водитель-->
    <div class="add-form-row" v-if="!ownerIsDriver">
      <label class="add-form-label">ФИО водителя</label>
      <div class="add-form-fields three_fields">
        <el-input placeholder="Фамилия" v-model="driver.last" :class="errors.driver.last  ? 'invalid' : ''"/>
        <el-input placeholder="Имя" v-model="driver.first" :class="errors.driver.first  ? 'invalid' : ''"/>
        <el-input placeholder="Отчество" v-model="driver.second"/>
      </div>
      <small v-if="errors.driver.last">{{errors.driver.last}}</small>
      <small v-if="errors.driver.first">{{errors.driver.first}}</small>
    </div>
    <div class="add-form-row" v-if="!ownerIsDriver">
      <label class="add-form-label">Паспортные данные водителя</label>
      <div class="add-form-fields three_fields">
        <el-input placeholder="Серия" v-model="driver.passport.series" :class="errors.driver.passport.series  ? 'invalid' : ''"/>
        <el-input placeholder="Номер" v-model="driver.passport.number" :class="errors.driver.passport.number  ? 'invalid' : ''"/>
        <el-date-picker
            v-model="driver.passport.birthday"
            :class="errors.driver.passport.birthday  ? 'invalid' : ''"
            placeholder="Дата рождения"
            type="date"
            format="dd.MM.yyyy"
            value-format="dd.MM.yyyy"
            :style="'width: 100%;'"
        ></el-date-picker>
      </div>
      <small v-if="errors.driver.passport.series">{{errors.driver.passport.series}}</small>
      <small v-if="errors.driver.passport.number">{{errors.driver.passport.number}}</small>
      <small v-if="errors.driver.passport.birthday">{{errors.driver.passport.birthday}}</small>
    </div>
    <div class="add-form-row" v-if="!ownerIsDriver">
      <label class="add-form-label">Телефон водителя</label>
      <div class="add-form-fields multiple-value" v-for="(phone,item) in driver.phone">
        <span class="multiple-element">{{phone}}</span>
        <el-button :class="'hide-fields'" icon="el-icon-close" @click="driver.phone.splice(item,1)" />
      </div>
      <div class="add-form-fields multiple-value">
        <el-input v-mask="'+7-###-###-##-##'" @blur="addDriverPhone" v-model="driver.phoneInput" :class="errors.driver.phone  ? 'invalid' : ''"/>

        <el-button :class="'hide-fields'" icon="el-icon-plus" @click="addDriverPhone" />
      </div>
      <small v-if="errors.driver.phone">{{errors.driver.phone}}</small>
    </div>

<!--    вод. удостоверение-->
    <div class="add-form-row">
      <label class="add-form-label">Водительское удостоверение</label>
      <div class="add-form-fields three_fields">
        <el-input placeholder="Номер" v-model="driver.license.number" :class="errors.driver.license.number  ? 'invalid' : ''"/>
        <el-date-picker
            v-model="driver.license.date_start"
            :class="errors.driver.license.date_start  ? 'invalid' : ''"
            :placeholder="'Дата выдачи'"
            type="date"
            format="dd.MM.yyyy"
            value-format="dd.MM.yyyy"
            :style="'width: 100%;'"
        ></el-date-picker>
        <el-date-picker
            v-model="driver.license.date_final"
            :class="errors.driver.license.date_final  ? 'invalid' : ''"
            :placeholder="'Действительно до'"
            type="date"
            format="dd.MM.yyyy"
            value-format="dd.MM.yyyy"
            :style="'width: 100%;'"
        ></el-date-picker>
      </div>
      <small v-if="errors.driver.license.number">{{errors.driver.license.number}}</small>
      <small v-if="errors.driver.license.date_start">{{errors.driver.license.date_start}}</small>
      <small v-if="errors.driver.license.date_final">{{errors.driver.license.date_final}}</small>
    </div>

<!--    Авто-->
    <div class="add-form-row">
      <label class="add-form-label">Авто</label>
      <div class="add-form-fields three_fields">
        <el-input placeholder="Марка" v-model="brand" :class="errors.brand  ? 'invalid' : ''"/>
        <el-input placeholder="Модель" v-model="model" :class="errors.model  ? 'invalid' : ''"/>
        <el-input placeholder="Гос номер" v-model="number" :class="errors.number  ? 'invalid' : ''"/>
      </div>
      <small v-if="errors.brand">{{errors.brand}}</small>
      <small v-if="errors.model">{{errors.model}}</small>
      <small v-if="errors.number">{{errors.number}}</small>
    </div>

<!--    кнопка добавить-->
    <div class="add-form-row">
      <el-button style="width:100%" @click="addAuto">Добавить</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name : 'AddAuto',
  props : ['city','cities'],
  data : function(){
    return {
      localCity     : this.city,
      ownerIsDriver : false,

      owner         : {
        last        : '',
        first       : '',
        second      : '',
        passport    : {
          series   : '',
          number   : '',
          birthday : '',
        },
        phoneInput  : '',
        phone       : []
      },

      driver        : {
        last        : '',
        first       : '',
        second      : '',
        phoneInput  : '',
        phone       : [],
        passport    : {
          series   : '',
          number   : '',
          birthday : '',
        },
        license     : {
          number      : '',
          date_start  : '',
          date_final  : ''
        }
      },

      brand         : '',
      model         : '',
      number        : '',

      errors        : {
        owner         : {
          last        : null,
          first       : null,
          second      : null,
          passport    : {
            series   : null,
            number   : null,
            birthday : null,
          },
          phone       : null,
        },
        driver        : {
          last        : null,
          first       : null,
          second      : null,
          phone       : null,
          passport    : {
            series   : null,
            number   : null,
            birthday : null,
          },
          license     : {
            number      : null,
            date_start  : null,
            date_final  : null,
          }
        },
        brand         : null,
        model         : null,
        number        : null,
      },
    }
  },
  methods : {
    addOwnerPhone(){
      if (this.owner.phoneInput)
        if (this.owner.phoneInput.length === 16) {
          this.owner.phone.push(this.owner.phoneInput);
          this.owner.phoneInput = '';
        } else this.owner.phoneInput = '';
    },
    addDriverPhone(){
      if (this.driver.phoneInput)
        if (this.driver.phoneInput.length === 16) {
          this.driver.phone.push(this.driver.phoneInput);
          this.driver.phoneInput = '';
        } else this.driver.phoneInput = '';
    },
    addAuto : async function(){
      if (!this.owner.last) return this.errors.owner.last = 'Необходимо ввести фамилию собственника';
      if (!this.owner.first) return this.errors.owner.first = 'Необходимо ввести имя собственника';
      if (!this.owner.passport.series) return this.errors.owner.passport.series = 'Необходимо ввести серию паспорта собственника';
      if (!this.owner.passport.number) return this.errors.owner.passport.number = 'Необходимо ввести номер паспорта собственника';
      if (!this.owner.passport.birthday) return this.errors.owner.passport.birthday = 'Необходимо ввести дату рождения собственника';
      if (this.owner.phone.length === 0) return this.errors.owner.phone = 'Необходимо ввести телефон собственника';

      if (!this.driver.last && !this.ownerIsDriver) return this.errors.driver.last = 'Необходимо ввести фамилию водителя';
      if (!this.driver.first && !this.ownerIsDriver) return this.errors.driver.first = 'Необходимо ввести имя водителя';
      if (!this.driver.passport.series && !this.ownerIsDriver) return this.errors.driver.passport.series = 'Необходимо ввести серию паспорта водителя';
      if (!this.driver.passport.number && !this.ownerIsDriver) return this.errors.driver.passport.number = 'Необходимо ввести номер паспорта водителя';
      if (!this.driver.passport.birthday && !this.ownerIsDriver) return this.errors.driver.passport.birthday = 'Необходимо ввести дату рождения водителя';
      if (this.driver.phone.length === 0 && !this.ownerIsDriver) return this.errors.driver.phone = 'Необходимо ввести телефон водителя';

      if (!this.driver.license.number) return this.errors.driver.license.number = 'Необходимо ввести номер водительского удостоверения';
      if (!this.driver.license.date_start) return this.errors.driver.license.date_start = 'Необходимо ввести дату выдачи водительского удостоверения';
      if (!this.driver.license.date_final) return this.errors.driver.license.date_final = 'Необходимо ввести срок действия водительского удостоверения';

      if (!this.brand) return this.errors.brand = 'Необходимо ввести марку автомобиля';
      if (!this.model) return this.errors.model = 'Необходимо ввести модель автомобиля';
      if (!this.number) return this.errors.number = 'Необходимо ввести государственный номер автомобиля';

      this.$store.commit('setLoading',true);

      if (this.ownerIsDriver) this.driver = {...this.driver, ...this.owner};

      let result = await this.$store.dispatch('query',{url : '/grid/add-auto',data : {
          city_id   : this.city,
          brand     : this.brand,
          model     : this.model,
          number    : this.number,
          owner     : this.owner,
          driver    : this.driver,
        }
      });
      if(result.status == 'success'){
        this.owner    = {
          last        : '',
          first       : '',
          second      : '',
          phoneInput  : '',
          phone       : [],
          passport    : {
            series   : '',
            number   : '',
            birthday : '',
          },
        };
        this.driver   = {
          last        : '',
          first       : '',
          second      : '',
          phoneInput  : '',
          phone       : [],
          passport    : {
            series   : '',
            number   : '',
            birthday : '',
          },
          license     : {
            number      : '',
            date_start  : '',
            date_final  : ''
          }
        };
        this.brand    = '';
        this.model    = '';
        this.number   = '';
        this.$emit('customModal',{key : 'addAuto',value : false, update : true});
      }else{
        this.$emit('customModal',{key : 'addAuto',value : true, update : false});
      }

      await this.$store.commit('setLoading',false);
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
    'owner.last': function () {
      this.errors.owner.last = null;
    },
    'owner.first': function () {
      this.errors.owner.first = null;
    },
    'owner.passport.series': function () {
      this.errors.owner.passport.series = null;
    },
    'owner.passport.number': function () {
      this.errors.owner.passport.number = null;
    },
    'owner.passport.birthday': function () {
      this.errors.owner.passport.birthday = null;
    },
    'owner.phone': function () {
      this.errors.owner.phone = null;
    },
    'driver.last': function () {
      this.errors.driver.last = null;
    },
    'driver.first': function () {
      this.errors.driver.first = null;
    },
    'driver.passport.series': function () {
      this.errors.driver.passport.series = null;
    },
    'driver.passport.number': function () {
      this.errors.driver.passport.number = null;
    },
    'driver.passport.birthday': function () {
      this.errors.driver.passport.birthday = null;
    },
    'driver.phone': function () {
      this.errors.driver.phone = null;
    },
    'driver.license.number': function () {
      this.errors.driver.license.number = null;
    },
    'driver.license.date_start': function () {
      this.errors.driver.license.date_start = null;
    },
    'driver.license.date_final': function () {
      this.errors.driver.license.date_final = null;
    },
    'brand': function () {
      this.errors.brand = null;
    },
    'model': function () {
      this.errors.model = null;
    },
    'number': function () {
      this.errors.number = null;
    },
  },



}
</script>

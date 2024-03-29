<template>
  <form-field-template :name="name" :label="label" :hint="hint" :required="required" :labelStyle="labelStyle" :isInlineForm="isInlineForm"  :tipRule="tipRule">
    <ValidationProvider :name="name" :rules="rules" class="row" tag="div">
      <template slot-scope="{ failed, errors, classes, }">
        <div class="col-md-4 form-checkbox" v-for="option in options" :key="option.id">
          <label class="control-label">
            <input type="checkbox" :id="option.form_identifier" v-model="selectedValue" :value="option" :name="getUniqueName(option.form_identifier)" @change="onInput(selectedValue)" :class="classes">
        
          {{option.label}}</label>
        </div>
        <div v-show="failed" class="error-block is-danger col-md-12">{{errors[0]}}</div>
      </template>
    </ValidationProvider>
  </form-field-template>
</template>

<script>
import FormFieldTemplate from 'components/MiniComponent/FormField/FormFieldTemplate'
import { boolean } from 'helpers/extraLogics';

export default {

  name: 'checkbox-field',

  props: {
    name: { type: String, required: true },

    label: { type: String, required: true },

    hint: { type: String, default: '' },

    options: { type: Array, required: true },

    required: { type: Boolean, default: false },

    onChange: { type: Function, Required: true },

    value: { type: Array | String, default: '' },

    labelStyle: { type: Object, default: () => {} },

    isInlineForm: { type: Boolean, default: false },

    rules: { type: String, default: '' },

    from: { type: String, default: '' },

    //FOR TOOLTIP POSITION
    tipRule : { type : Number | Boolean, default : false }
  },

  data: () => {
    return {
      selectedValue: []
    }
  },

  mounted() {
    this.selectedValue = boolean(this.value) ? this.value : []
  },

  watch: {
    value(newVal) {
      this.selectedValue = boolean(newVal) ? newVal : []
    }
  },

  methods: {
    getUniqueName (id = '') {
      return id + '__' + Math.floor(Math.random() * 100000);
    },

    onInput(value){
      if(this.from){
        this.onChange(value, this.name)
      } else {
        this.onChange(value, this.label)
      }
    }
  },

  components: {
    'form-field-template': FormFieldTemplate,
  }
};
</script>

<style scoped>
  .form-checkbox > label {
    font-weight: 400;
    cursor: pointer;
  }
</style>

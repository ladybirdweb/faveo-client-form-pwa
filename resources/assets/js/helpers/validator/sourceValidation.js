import {store} from "store";

import {Validator} from 'easy-validator-js';

import {lang} from 'helpers/extraLogics';

export function validateSourceSettings(data){

    const { name, display_as, description, icon } = data;

    let validatingData = {

        name: [name, 'isRequired', { 'max(20)' : 'The name should be less than 20 characters.'}],

        icon: [icon, 'isRequired'],
        
        display_as: [display_as, 'isRequired', { 'max(20)' : 'The display as should be less than 20 characters.'}],

        description: [description,{ 'max(100)' : 'The descripton should be less than 100 characters.'}]
    };
    
    const validator = new Validator(lang);

    const {errors, isValid} = validator.validate(validatingData);

    store.dispatch('setValidationError', errors);
  
    return {errors, isValid};
};
import {store} from "store";

import {Validator} from 'easy-validator-js';

import {lang} from 'helpers/extraLogics';

export function validateTagSettings(data){

    const { name, description, visible_to } = data;

    let validatingData = {

        name: [name, 'isRequired', { 'max(20)' : 'The name should be less than 20 characters.'}],

        visible_to: [visible_to, 'isRequired'],
        
        description: [description,{ 'max(50)' : 'The descripton should be less than 50 characters.'}]
    };
    
    const validator = new Validator(lang);

    const {errors, isValid} = validator.validate(validatingData);

    store.dispatch('setValidationError', errors);
  
    return {errors, isValid};
};
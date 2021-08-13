import {store} from "store";

import {Validator} from 'easy-validator-js';

import {lang} from 'helpers/extraLogics';

export function validateLabelSettings(data){

    const { title, order, color, visible_to } = data;

    let validatingData = {

        title: [title, 'isRequired'],
        
        color: [color, 'isRequired'],

      visible_to: [visible_to, 'isRequired'],

        order: [order, 'isRequired', { 'minValue(1)' : 'Invalid input.'}],
    };
    
    const validator = new Validator(lang);

    const {errors, isValid} = validator.validate(validatingData);

    store.dispatch('setValidationError', errors);
  
    return {errors, isValid};
};
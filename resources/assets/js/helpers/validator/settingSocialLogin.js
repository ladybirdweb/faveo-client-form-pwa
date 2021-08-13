import {store} from 'store'

import { Validator } from 'easy-validator-js';

import { lang } from 'helpers/extraLogics';

export function validateSettingSocialLogin(data) {

  const { client_id, client_secret, redirect, status } = data

  var validatingData = {

    client_id: [client_id, 'isRequired'],

    client_secret: [client_secret, 'isRequired'],

    redirect: [redirect, 'isRequired'],

    status: [status, 'isRequired'],

  };

  const validator = new Validator(lang);

  const { errors, isValid } = validator.validate(validatingData);

  store.dispatch('setValidationError', errors); //if component is valid, an empty state will be sent

  return { errors, isValid };
}
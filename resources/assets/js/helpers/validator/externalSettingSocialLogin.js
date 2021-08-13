import {store} from 'store'

import { Validator } from 'easy-validator-js';

import { lang } from 'helpers/extraLogics';

export function validateExternalSettingSocialLogin(data) {

  const { validate_token_api, validate_api_parameter, redirect_unauthenticated_users_to, allow_external_login,  allow_users_to_access_system_url } = data

  var validatingData = {

    validate_token_api: [validate_token_api, 'isRequired'],

    validate_api_parameter: [validate_api_parameter, 'isRequired'],

    redirect_unauthenticated_users_to: [redirect_unauthenticated_users_to, 'isRequired'],

    allow_external_login: [allow_external_login, 'isRequired'],

    allow_users_to_access_system_url: [allow_users_to_access_system_url, 'isRequired'],

  };

  const validator = new Validator(lang);

  const { errors, isValid } = validator.validate(validatingData);

  store.dispatch('setValidationError', errors); //if component is valid, an empty state will be sent

  return { errors, isValid };
}
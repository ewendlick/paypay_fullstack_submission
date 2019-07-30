import Vue from 'vue'
import VeeValidate from 'vee-validate'

const config = {
  aria: true,
  classNames: {},
  classes: false,
  delay: 0,
  dictionary: null,
  errorBagName: 'errors',
  events: 'input|blur',
  fieldsBagName: 'fields',
  i18n: null,
  i18nRootKey: 'validations',
  inject: true,
  validity: false,
  useConstraintAttrs: true
}

Vue.use(VeeValidate, config)

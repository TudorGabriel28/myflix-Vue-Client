<template lang="pug">
.row
  .center-container.col-10.offset-1.col-sm-8.offset-sm-2.col-md-6.offset-md-3.col-xl-4.offset-xl-4
    .form-container.px-5.py-5
      h4(data-test-id='title').h4.title It happens from time to time
      p.mb-3 Enter your email address used to create your account and we will send you instructions for resetting your password.
      form(@submit.prevent='sendForgotPasswordEmail')
        input.input.last-input(type='text', placeholder='Email address', v-model='email', data-test-id="forgot-password-email-input")
        span.red(data-test-id="forgot-password-email-error") {{emailError}}
        button.button(type='submit') Reset Password
      .form-message
        p Remembered your password?
          router-link(:to='{ name: "Login" }') Log in
</template>

<script>

import { accountService } from '../services/accountService'
import { useField, useForm } from 'vee-validate';
import {emailValidation} from '../utils/validations'

export default {
  setup() {
    const { handleSubmit } = useForm();

    const { errorMessage: emailError, value: email } = useField(
      'email', emailValidation
    );

    const sendForgotPasswordEmail = handleSubmit(async (email) => {
      try {
        await accountService.sendForgotPasswordEmail(email)
      } catch(error) {
        console.log(error)
      }

    })

    return {
      email,
      emailError,
      sendForgotPasswordEmail
    }
  }
}
</script>

<style scoped lang="stylus">

p.mb-3
  color: #d9d9d9

</style>


<template lang="pug">
.row.align-items-center
  .center-container.col-10.offset-1.col-sm-8.offset-sm-2.col-md-6.offset-md-3.col-xl-4.offset-xl-4
    .form-container.px-5.py-5
      h3.h3.title(data-test-id='title') Sign Up
      form(@submit.prevent='registerUser')
        input.input(
          type='text',
          placeholder='First Name',
          v-model='firstname',
          data-test-id='register-first-name-input'
        )
        span.red(data-test-id='register-first-name-error') {{ firstNameError }}
        input.input(
          type='text',
          placeholder='Last Name',
          v-model='lastname',
          data-test-id='register-last-name-input'
        )
        span.red(data-test-id='register-last-name-error') {{ lastNameError }}
        input.input(
          type='text',
          placeholder='Nickname',
          v-model='nickname',
          data-test-id='register-nickname-input'
        )
        input.input(
          type='text',
          placeholder='Email address',
          v-model='email',
          data-test-id='register-email-input'
        )
        span.red(data-test-id='register-email-error') {{ emailError }}
        input.input(
          type='password',
          placeholder='Password',
          v-model='password',
          data-test-id='register-password-input'
        )
        span.red(data-test-id='register-password-error') {{ passwordError }}
        input.input(
          type='password',
          placeholder='Confirm password',
          v-model='confirmPassword',
          data-test-id='register-confirm-password-input'
        )
        span.red(data-test-id='register-confirm-password-error') {{ confirmPasswordError }}
        .pt-5
          button.button(type='submit') Sign Up
      .form-message
        p Already signed up? Use your email and password to
          router-link(:to='{ name: "Login" }') log in
</template>

<script>
import { ref } from 'vue';
import { accountService } from '../services/accountService';
import { useField, useForm } from 'vee-validate';
import {
  nameValidation,
  emailValidation,
  passwordValidation
} from '../utils/validations';
import { Toast } from '../utils/toastAlert';

export default {
  setup() {
    const nickname = ref('');
    const { handleSubmit } = useForm();

    const { errorMessage: firstNameError, value: firstname } = useField(
      'firstname',
      nameValidation
    );
    const { errorMessage: lastNameError, value: lastname } = useField(
      'lastname',
      nameValidation
    );
    const { errorMessage: emailError, value: email } = useField(
      'email',
      emailValidation
    );
    const { errorMessage: passwordError, value: password } = useField(
      'password',
      passwordValidation
    );

    const { errorMessage: confirmPasswordError, value: confirmPassword } =
      useField('confirmPassword', function (value) {
        if (value !== password.value) {
          return 'Passwords are not the same.';
        }
        return true;
      });

    const registerUser = handleSubmit(
      async ({ firstname, lastname, email, password, confirmPassword }) => {
        try {
          await accountService.registerUser({
            firstname,
            lastname,
            nickname: nickname.value,
            email,
            password,
            confirmPassword,
            acceptTerms: true
          });

          Toast.fire({
            icon: 'success',
            title: 'Register complete'
          });
        } catch (error) {
          Toast.fire({
            icon: 'error',
            title: 'Something went wrong'
          });
        }
      }
    );

    return {
      registerUser,
      firstname,
      lastname,
      nickname,
      email,
      password,
      confirmPassword,
      firstNameError,
      lastNameError,
      emailError,
      passwordError,
      confirmPasswordError
    };
  }
};
</script>

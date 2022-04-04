<template lang="pug">
.row.align-items-center
  .center-container.col-10.offset-1.col-sm-8.offset-sm-2.col-md-6.offset-md-3.col-xl-4.offset-xl-4
    .form-container.px-5.py-5
      h3.h3.title(data-test-id='title') Sign Up
      form(@submit.prevent='registerUser')
        input.input(type='text', placeholder='Name', v-model='name', data-test-id="register-name-input")
        span.red(data-test-id='register-name-error') {{nameError}}
        input.input(type='text', placeholder='Email address', v-model='email', data-test-id="register-email-input")
        span.red(data-test-id='register-email-error') {{emailError}}
        input.input(type='password', placeholder='Password', v-model='password', data-test-id="register-password-input")
        span.red(data-test-id='register-password-error') {{passwordError}}
        input.input(type='password', placeholder='Confirm password', v-model='confirmPassword', data-test-id="register-confirm-password-input")
        span.red(data-test-id='register-confirm-password-error') {{confirmPasswordError}}
        .pt-5
          button.button(type='submit' ) Sign Up
      .form-message
        p Already signed up? Use your email and password to
          router-link(:to='{ name: "Login" }') log in
</template>

<script>
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
    const { handleSubmit } = useForm();

    const { errorMessage: nameError, value: name } = useField(
      'name',
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

    const registerUser = handleSubmit(async ({ name, email, password }) => {
      try {
        await accountService.registerUser({
          name,
          email,
          password
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
    });

    return {
      registerUser,
      name,
      nameError,
      email,
      emailError,
      password,
      passwordError,
      confirmPassword,
      confirmPasswordError
    };
  }
};
</script>

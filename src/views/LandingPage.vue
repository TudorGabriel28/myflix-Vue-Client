<template lang="pug">
.center-container.col-10.offset-1.col-sm-8.offset-sm-2.col-md-6.offset-md-3.col-xl-6.offset-xl-3
    h1.h1 Your movies. Your shows. Your way.
    h4.h4 Your personal database for movies and TV shows
    .mt-4.mb-5
      button.button.py-3.h4(@click='register') Register Now
</template>

<script>
import { useRouter } from 'vue-router';
export default {

  setup() {
    const router = useRouter();

    const register = () => {
      router.push({name: 'Register'})
    }

    return { register };
  }
}
</script>

<style lang="stylus">

</style>
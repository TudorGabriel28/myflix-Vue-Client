<template lang="pug">
NavigationBar
router-view
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import { apiClient } from './utils/apiClient';

export default {
  components: {
    NavigationBar
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      this.$store.dispatch('setToken', token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
};
</script>

<style lang="stylus">

@require "./assets/styles/colors.styl"
@require "./assets/styles/utils.styl"
@require "./assets/styles/typography.styl"
@require "./assets/styles/links.styl"
@require "./assets/styles/buttons.styl"
@require "./assets/styles/inputs.styl"



*
  box-sizing border-box
  padding 0
  margin 0
  max-width: 100%

#app
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color $text-white
  overflow-x: hidden

body
  background-image: url("./assets/images/landingpage-background.png")

.title
  margin-bottom remify(32px) !important

.last-input
  margin-bottom remify(48px) !important

.form-message
  border-top 1px solid #9092984D
  padding-top remify(16px)
  margin-top remify(32px)
  a
    margin-left remify(5px)
    font-size remify(13px)
  p
    font-size remify(13px)

.red
  color $primary-red
  font-size remify(12px)

.form-container
  background: rgba(#161616, 0.85)
</style>

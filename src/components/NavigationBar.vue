<template lang="pug">
.navbar.pt-4.pb-5
  .navbar-brand.mx-4
    img(src='../assets/images/myflix.png')

  .navbar-nav.me-auto.mb-2.mb-lg-0.flex-row.ms-5(v-if='isLoggedIn')
    router-link.nav-item.me-3(:to='{ name: "HomePage" }') Home
    router-link.nav-item.me-3(:to='{ name: "HomePage" }') Categories
    router-link.nav-item.me-3(:to='{ name: "HomePage" }') Friends
    router-link.nav-item.me-3(:to='{ name: "HomePage" }') Add Movie

  Search(@searchKeyword='searchInput' v-if='isLoggedIn')

  .dropdown(v-if='isLoggedIn' @click='toggleDropdown' v-click-outside='removeDropdown')
    i.fas.fa-user-circle.mx-4(type='button' data-bs-toggle='dropdown' aria-expanded='false')
    ul#dropdown-menu.dropdown-menu(aria-labelledby='dropdownMenuButton1' )
      li
        router-link.dropdown-item(:to='{ name: "Login" }') Edit profile
      li
        router-link.dropdown-item(:to='{ name: "Login" }') Inventory
      li
        hr.dropdown-divider
      li
        button.dropdown-item(@click='logout') Logout

</template>

<script>
import Search from './Search.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { computed } from 'vue';
import { clickOutside } from '../directives/clickOutside'
import { ref, watch } from 'vue';
import { movieService } from '../services/movieService';
export default {
  name: 'NavigationBar',
  components: { Search },
  directives: {
    clickOutside
  },
  setup() {

    const store = useStore();
    const router = useRouter();

    const logout = () => {
      store.dispatch('logout')
      router.push({name: 'Login'})
    }

    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    const toggleDropdown = () => {
      document.getElementById('dropdown-menu').classList.toggle('show')
    }
    const removeDropdown = () => {
      document.getElementById('dropdown-menu').classList.remove('show')
    }

    const searchInput = async (keyword) => {
      router.push({name: 'MovieList', query: {title: keyword}});
    }

    return {
      logout,
      isLoggedIn,
      toggleDropdown,
      removeDropdown,
      searchInput
    }
  }

};

</script>

<style lang="stylus" scoped>
@require "../assets/styles/colors.styl"
@require "../assets/styles/utils.styl"

i
  font-size 36px
.dropdown-menu
  left -34px
.dropdown-item
  color $text-black !important
.dropdown-item:active
  background-color $primary-blue;
  border-color: #fff;

.navbar
  padding: 0 10rem

.nav-item
  text-decoration: none
  color $text-white !important
  font-size remify(17px)

</style>

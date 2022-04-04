<template lang="pug">
.full-container
  .col(v-for='(movieList, index) in movieLists', :key='index')
    MovieListPreview(:movieList="movieList")
</template>

<script>
import { onMounted, ref, onBeforeMount } from 'vue';
import {wishListService} from '../services/wishListService.js';
import {watchedListService} from '../services/watchedListService.js';
import {movieService} from '../services/movieService.js';
import MovieListPreview from '../components/MovieListPreview.vue';

export default {
  components: { MovieListPreview },
  setup() {
    var movieLists = ref([]);
    onMounted(async () => {
      var response = await wishListService.getWishList({pageSize: 8});
      movieLists.value.push({items: response.data, pageSize: 8 , titleList: "My wishlist", isWishList: true});

      response = await watchedListService.getWatchedList({pageSize: 8});
      movieLists.value.push({items: response.data, pageSize: 8 , titleList: "Watched Movies", isWatchedList: true});

      response = await movieService.getMovies({pageSize: 8})
      movieLists.value.push({items: response.data, pageSize: 8  , titleList: "Recent added on Myflix"});

      response = await movieService.getMovies({pageSize: 8, genre: 'Action'})
      movieLists.value.push({items: response.data, pageSize: 8, genre: 'Action' , titleList: "Recent added in Action"});
    });

    onBeforeMount(() => {
      document.querySelector('body').setAttribute('style', 'background: #282828')
    });

    return {
      movieLists
    };
  }
};
</script>

<style lang="stylus" scoped>
  .full-container
    padding: 0 7rem
</style>

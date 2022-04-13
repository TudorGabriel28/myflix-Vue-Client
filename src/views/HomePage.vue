<template lang="pug">
.col-md-10.offset-md-1
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
      var response = await wishListService.getWishList({pageSize: 9});
      movieLists.value.push({items: response.data, pageSize: 9 , titleList: "My wishlist", isWishList: true});

      response = await watchedListService.getWatchedList({pageSize: 9});
      movieLists.value.push({items: response.data, pageSize: 9 , titleList: "Watched Movies", isWatchedList: true});

      response = await movieService.getMovies({pageSize: 9})
      movieLists.value.push({items: response.data, pageSize: 9  , titleList: "Recent added on Myflix"});

      response = await movieService.getMovies({pageSize: 9, genre: 'Action'})
      movieLists.value.push({items: response.data, pageSize: 9, genre: 'Action' , titleList: "Recent added in Action"});
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

</style>

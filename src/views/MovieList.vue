<template lang="pug">
.full-container
  h3.h3.mb-4 {{ titleList }}
  .d-flex.flex-row.flex-wrap
    .me-3.my-3(v-for='(movie, index) in movies', :key='index')
      router-link.router-link(:to='{ path: `/movie/${movie.id}` }')
        img.movie-img(:src='movie.primaryImage.url', width='165', height='244')
        p.movie-title.mt-1 {{ movie.title }}
  Pagination(
    @currentPage='changeCurrentPage',
    :paginationParams='paginationParams'
  )
</template>

<script>
import { onMounted, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { wishListService } from '../services/wishListService';
import { watchedListService } from '../services/watchedListService';
import { movieService } from '../services/movieService';
import { ref, watch } from 'vue';
import Pagination from '../components/Pagination.vue';

export default {
  components: { Pagination },
  setup() {
    const route = useRoute();
    const titleList = route.query.titleList;
    const paginationParams = ref({});
    const movies = ref([]);
    let movieParams = ref({ pageSize: 30, currentPage: 1 });
    if (route.query.pageSize) {
      movieParams.value['pageSize'] = route.query.pageSize;
    }
    if (route.query.genre) {
      movieParams.value['genre'] = route.query.genre;
    }
    if (route.query.title) {
      movieParams.value['title'] = route.query.title;
    }

    onMounted(async () => {
      var response;
      if (route.query.isWishlist) {
        response = await wishListService.getWishList(movieParams.value);
      } else if (route.query.isWatchedList) {
        response = await watchedListService.getWatchedList(movieParams.value);
      } else {
        response = await movieService.getMovies(movieParams.value);
      }
      paginationParams.value = response.headers['x-pagination'];
      movies.value = response.data;
    });

    watch(movieParams, async () => {
      var response;
      if (route.query.isWishlist) {
        response = await wishListService.getWishList(movieParams.value);
      } else if (route.query.isWatchedList) {
        response = await watchedListService.getWatchedList(movieParams.value);
      } else {
        response = await movieService.getMovies(movieParams.value);
      }
      paginationParams.value = response.headers['x-pagination'];
      movies.value = response.data;
    });

    const changeCurrentPage = () => {
      movieParams.value.currentPage += 1;
    };

    onBeforeMount(() => {
      document
        .querySelector('body')
        .setAttribute('style', 'background: #282828');
    });

    return {
      titleList,
      movies,
      paginationParams,
      changeCurrentPage
    };
  }
};
</script>

<style lang="stylus" scoped>
@require "../assets/styles/colors.styl"

.full-container
  padding: 0 5rem

.movie-title
  max-width: 165px
  font-weight: bold

.router-link
  color: $text-white !important
  text-decoration: none

</style>
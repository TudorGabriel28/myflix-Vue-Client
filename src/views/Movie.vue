<template lang="pug">
.row
  .col-4
    img.rounded.mx-auto.d-block(
      :src='movie.primaryImage.url',
      width='300',
      height='450'
    )
  .info.col-8
    h3.h3 {{ movie.title }}
    h6.fst-italic {{ movie.titleType }}
    .d-flex.my-2
      h5.me-4 Genres:
      p.px-2(v-for='(genre, index) in movie.genres', :key='index') {{ genre.name }}
    h5.my-0 Plot:
    p.mb-4 {{ movie.plot }}
    h6.mb-2 Runtime: {{ movie.runtimeSeconds }} seconds
    h6.mb-2 Released at: {{ movie.releaseDate }}
    .d-flex.mt-5
      .wishlist.me-4
        h5 Wishlist:
        button.button-small(v-if='!movie.inWishList', @click='addWishlist') Add
        button.button-small(v-else, @click='removeWishlist') Remove
      .watched
        h5 Watched:
        button.button-small(
          v-if='!movie.inWatchedList',
          @click='addWatchedList'
        ) Add
        button.button-small(v-else, @click='removeWatchedList') Remove
</template>

<script>
import { ref } from 'vue';
import { onBeforeMount, onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { movieService } from '@/services/movieService';
import { wishListService } from '@/services/wishListService';
import { watchedListService } from '@/services/watchedListService';
export default {
  setup() {
    const route = useRoute();
    const movie = ref({});

    onBeforeMount(async () => {
      const response = await movieService.getMovie(route.params.id);
      movie.value = response.data;

      document
        .querySelector('body')
        .setAttribute('style', 'background: #282828');
    });

    const addWishlist = async () => {
      await wishListService.addMovie(movie.value.id);
      movie.value.inWishList = true;
    };

    const removeWishlist = async () => {
      await wishListService.removeMovie(movie.value.id);
      movie.value.inWishList = false;
    };

    const addWatchedList = async () => {
      await watchedListService.addMovie(movie.value.id);
      movie.value.inWatchedList = true;
    };

    const removeWatchedList = async () => {
      await watchedListService.removeMovie(movie.value.id);
      movie.value.inWatchedList = false;
    };

    return {
      movie,
      addWishlist,
      removeWishlist,
      addWatchedList,
      removeWatchedList
    };
  }
};
</script>

<style>
</style>
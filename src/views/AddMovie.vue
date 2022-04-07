<template lang="pug">
.row.pt-5.mt-5
  h4.h4.offset-3 Extract the movie's id from IMDb and create the movie instantly.
  .col-4.offset-3
    input.input.mt-0(
      type='text',
      placeholder='Paste IMDb movie id here',
      v-model='imdbId'
    )
  .col-2
    button.button(@click='addMovie') Create
.offset-3.py-5
  h4.h4.font-italic Copy this part from the url:
  img(src='../assets/images/imdb_url.png')
</template>

<script>
import { movieService } from '@/services/movieService';
import { ref, onBeforeMount } from 'vue';
import { Toast } from '../utils/toastAlert';

export default {
  setup() {
    const imdbId = ref('');

    const addMovie = async () => {
      try {
        const movie = await movieService.addMovie({ imdbId: imdbId.value });
        Toast.fire({
          icon: 'success',
          title: 'Movie added successfully'
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: 'Id not valid or movie is already in myflix database'
        });
      }
    };

    onBeforeMount(() => {
      document
        .querySelector('body')
        .setAttribute('style', 'background: #282828');
    });

    return {
      addMovie,
      imdbId
    };
  }
};
</script>

<style lang="stylus" scoped>
@require "../assets/styles/colors.styl"

.input
  background $background-white-input
  color $text-black

input::placeholder
 color $text-gray


</style>
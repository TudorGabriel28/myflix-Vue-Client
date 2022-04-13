<template lang="pug">
h4.h4.my-3 {{ movieList.titleList }}
.row
  p.mb-4(v-if='!movieList.items[0]') No movies added in this list so far.
  .scroll-list(v-else)
    router-link.movie-preview.align-top(:to='{ path: `/movie/${movie.id}` }', v-for='(movie, index) in movieList.items', :key='index')
      img.movie-img.mx-1(
        :src='movie.primaryImage.url',
        width='165',
        height='244',
      )
      p.movie-title-preview.mt-1 {{ movie.title }}
  router-link.view-more(:to='{ name: "MovieList", query: queryParams }') View More
</template>

<script>
export default {
  name: 'MovieListPreview',
  props: ['movieList'],
  setup(props) {
    var queryParams = { pageSize: 30, titleList: props.movieList.titleList };
    if (props.movieList.genre) {
      queryParams['genre'] = props.genre;
    }
    if (props.movieList.isWishList) {
      queryParams['isWishList'] = true;
    }
    if (props.movieList.isWatchedList) {
      queryParams['isWatchedList'] = true;
    }

    return { queryParams };
  }
};
</script>

<style lang="stylus" scoped>
@require "../assets/styles/colors.styl"

.scroll-list
  overflow: auto
  white-space: nowrap

.scroll-list::-webkit-scrollbar
  display: none
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;

.view-more
  text-align: right


</style>

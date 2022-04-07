<template lang="pug">
h4.h4.my-3 {{ movieList.titleList }}
.row
  p.mb-4(v-if='!movieList.items[0]') No movies added in this list so far.
  .d-flex.flex-row(v-else)
    .px-2(v-for='(movie, index) in movieList.items', :key='index')
      img.movie-img(:src='movie.primaryImage.url', width='165', height='244')
    router-link.d-flex.align-items-end(
      :to='{ name: "MovieList", query: queryParams }'
    ) View More
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

</style>

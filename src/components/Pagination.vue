<template lang="pug">
.row.mt-3.mb-5
  .col-1.offset-5.pointer(@click='back' v-if='paginationParams.HasPrevious')
    i.fas.fa-angle-double-left
    span.mx-1 Back
  .col-1.pointer(@click='next' v-if='paginationParams.HasNext')
    span.mx-1 Next
    i.fas.fa-angle-double-right
</template>

<script>
export default {
  name: 'Pagination',
  props: ['paginationParams'],
  emits: ['currentPage'],
  setup(props, context) {

    var currentPage = props.paginationParams.CurrentPage;

    const back = () => {
      if (currentPage > 0) {
        currentPage--;
      }
      context.emit('currentPage', parseInt(currentPage.value))
    };

    const next = () => {
      if (currentPage < props.paginationParams.TotalCount) {
        currentPage ++;
      }
      context.emit('currentPage', parseInt(currentPage.value))
    };

    return {
      next,
      back
    }
  }
}
</script>

<style lang="stylus" scoped>
.pointer
  cursor pointer

</style>
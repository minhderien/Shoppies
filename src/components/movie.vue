<template>
  <div>
    <h3>{{this.movie.Title}}</h3>
    <button @click="onButtonClicked">{{buttonMessage}}</button>
  </div>
</template>

<script>
export default {
    name: 'Movie',
    props: [
      'movie',
      'isResult',
      'isNominated'
    ],
    computed: {
      buttonMessage() {
          return this.isResult ? 'Nominate' : (this.isNominated ? 'Remove' : '');
      }
    },
    methods: {
      onButtonClicked() {
        if (this.isResult) this.$emit('nominated', this.movie);
        else this.$emit('removed', this.movie);
      }
    }
}
</script>

<style lang="scss" scoped>


</style>
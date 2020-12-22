<template>
  <div class="card--empty">
    <img class="card__add-icon" src="../assets/add_icon.svg" width="64" height="64"/>
  </div>
</template>

<script>
import addIcon from '../assets/add_icon.svg';

export default {
    name: 'EmptyMovie',
    data() {
      return {
        addIcon: addIcon
      }
    }
}
</script>

<style lang="scss" scoped>

.card {
  $height: 232px;

  &--empty {
    border-radius: 4px;
    border-style: dashed;
    border-color: #2c3e50;
    box-shadow: 0.2rem 0.2rem 1rem #888888;
    display: block;
    height: $height;
    margin-bottom: 12px;
    position: relative;
    width: 152px;
    text-align: center;
  }

  &__add-icon {
    padding-top: calc(#{$height} / 3);
  }
}

</style>
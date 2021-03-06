<template>
  <div class="card" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onClicked">
    <img class="card__image" :src="imageSource">
    <div class="card__footer">{{this.movie.Title}}</div>
    <div v-if="!this.isMouseOver" class="card__overlay">
      <div class="card-badge">
        <span class="card-badge card-badge__year">{{this.movie.Year}}</span>
      </div>
    </div>
    <div 
      v-if="this.isMouseOver && (!isNominated || !isResult)"
      class="card__overlay card__overlay--nominate fade-in"
    >
      <img v-if="!isNominated" src="../assets/nominate_icon.svg" width="88" height="88">
      <img v-else-if="isNominated && !isResult" src="../assets/remove_icon.svg" width="88" height="88">
    </div>
    <div 
      v-if="isNominated && isResult"
      class="card__overlay card__overlay--nominate"
      :disabled="true"
    >
    <img src="../assets/nominate_icon.svg" width="88" height="88">
    <h2>Nominated</h2>

    </div>
  </div>
</template>

<script>
import imagePlaceholder from '../assets/img_placeholder.png';

export default {
    name: 'Movie',
    props: [
      'movie',
      'isResult',
      'isNominated'
    ],
    data() {
      return {
        imagePlaceholder: imagePlaceholder,
        isMouseOver: false,
        isNominateIconMouseOver: false
      }
    },
    computed: {
      /** Computed getter to return the appropriate image source */
      imageSource() {
        return this.movie.Poster === 'N/A' ? imagePlaceholder : this.movie.Poster;
      }
    },
    methods: {
      /** Handle when the movie is clicked. */
      onClicked() {
        if (!this.isNominated) this.$emit('nominated', this.movie);
        else this.$emit('removed', this.movie);
      },
      /** Handle when the movie is being hovered. */
      onMouseEnter() {
        this.isMouseOver = true;
      },
      /** Handle when the cursor quits the movie area. */
      onMouseLeave() {
        this.isMouseOver = false;
      },
    }
}
</script>

<style lang="scss" scoped>

.card {
  box-shadow: 0.2rem 0.2rem 1rem #888888;
  margin-bottom: 12px;
  height: 312px;
  position: relative;
  width: 208px;
  border-radius: 4px;
  cursor: pointer;

  &__image {
    border-radius: 4px 4px 0 0;
    height: 288px;
    width: 208px;
  }

  &__footer {
    line-height: 24px;
    font-size: 16px;
    margin-top:-2px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__overlay {
    border-radius: 4px;
    bottom: 0;
    left: 0;
    position:absolute;
    right: 0;
    top: 0;

    &--nominate {
      background-color: rgba(0,0,0,.4);
      color: white;
      display: block;
      padding-top:32px;
      text-align: center;
    }
  }
}

.card-badge {
  border-radius: 4px;
  display: inline-block;
  padding: 6px 6px;
  text-align: left;
  

  &__year {
    color: #fff;
    font-size: 12px;
    background-color: rgba(0,0,0,.4);
  }
}

.fade-in {
	opacity: 1;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 0.5s;
}

@keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

[disabled="disabled"] {
  pointer-events: none !important;
}


</style>
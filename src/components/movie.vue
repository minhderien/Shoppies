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
      v-if="this.isMouseOver"
      class="card__overlay card__overlay--nominate fade-in"
    >
      <img src="../assets/nominate_icon.svg" width="64px" height="64px">
    </div>
  </div>
</template>

<script>
import imagePlaceholder from '../assets/img_placeholder.png';
import nominateIcon from '../assets/nominate_icon.svg';

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
        nominateIcon: nominateIcon,
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
        if (this.isResult) this.$emit('nominated', this.movie);
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
  height: 232px;
  position: relative;
  width: 152px;
  border-radius: 4px;
  cursor: pointer;

  &__image {
    border-radius: 4px 4px 0 0;
    height: 216px;
    width: 152px;
    
  }

  &__footer {
    font-size: 12px;
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
      display: block;
      padding-top:32px;
      text-align: center;
    }
  }
}

.card-badge {
  border-radius: 4px;
  display: inline-block;
  padding: 4px 4px;
  text-align: center;
  

  &__year {
    color: #fff;
    font-size: 10px;
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

</style>
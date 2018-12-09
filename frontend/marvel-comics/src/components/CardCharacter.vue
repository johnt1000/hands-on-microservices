<template>
  <md-card>
    <md-card-media-cover md-solid>
      <md-card-media md-ratio="1:1">
        <img
          :src="personage.thumbnail.path + '.' + personage.thumbnail.extension"
          :alt="personage.name"
        >
      </md-card-media>

      <md-card-area>
        <md-card-header>
          <span class="md-title">{{ personage.name }}</span>
        </md-card-header>

        <md-card-actions>
          <router-link :to="'/character/' + personage.id">
            <md-button class="md-icon-button">
              <md-icon>arrow_forward_ios</md-icon>
            </md-button>
          </router-link>
        </md-card-actions>
      </md-card-area>
    </md-card-media-cover>
  </md-card>
</template>

<script>
export default {
  name: 'CardCharacter',
  props: {
    personage: Object
  }
}
</script>

<style scoped>
  .md-card {
    width: 30%;
    margin: 1%;
    /* display: inline-block; */
    vertical-align: top;
    float: left;
  }
</style>

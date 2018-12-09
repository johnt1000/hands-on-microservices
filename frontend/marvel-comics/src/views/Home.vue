<template>
  <div class="card-expansion">
    <div v-for="character in characters" :key="character.id">
      <CardCharacter :personage="character" />
    </div>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import CardCharacter from '@/components/CardCharacter.vue'
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: 'home',
  components: {
    InfiniteLoading,
    CardCharacter,
  },
  data () {
    return {
      page: 1,
      characters: []
    }
  },
  methods: {
    infiniteHandler($state) {
      let uri = process.env.VUE_APP_ENDPOINT_CHARACTER_LIST + '/p/' + this.page
      this.$http.get(uri).then(response => {
        // console.log(response.body.data.results);
        if (response.body.data.results.length) {
          this.page += 1;
          this.characters.push(...response.body.data.results);
          $state.loaded();
        } else {
          $state.complete();
        }
      }, response => {
        // error callback
        console.log(response);
      });

    }
  }
}
</script>
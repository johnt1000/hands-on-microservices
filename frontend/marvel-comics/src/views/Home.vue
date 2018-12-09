<template>
  <md-content>
    <div class="row search">
      <md-field>
        <label>Character's name</label>
        <md-input v-model="searchName"></md-input>
      </md-field>
      <md-button @click="search" class="md-raised md-primary">
        <md-icon>search</md-icon> Search
      </md-button>
    </div>
    <div class="row">
      <div v-for="character in characters" :key="character.id">
        <CardCharacter :personage="character" />
      </div>
    </div>
    <div class="row">
      <md-button class="md-primary" @click="more">More</md-button>
    </div>
  </md-content>
</template>

<script>
import CardCharacter from '@/components/CardCharacter.vue'
// import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'home',
  components: {
    // InfiniteLoading,
    CardCharacter,
  },
  data () {
    return {
      page: 1,
      characters: [],
      searchName: null
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let uri = process.env.VUE_APP_ENDPOINT_CHARACTER_LIST + '/p/' + this.page
      this.$http.get(uri).then(response => {
        // console.log(response.body.data.results);
        if (response.body.data.results.length) {
          this.characters.push(...response.body.data.results)
        }
      }, response => {
        // error callback
        console.log(response)
      });

    },
    search() {
      let uri = process.env.VUE_APP_ENDPOINT_CHARACTER_SEARCH + '/name/' + this.searchName
      console.log(uri)
      this.$http.get(uri).then(response => {
        if (response.body.data.results.length) {
          this.characters = response.body.data.results
        } else {
          alert('Search with no results')
        }
      }, response => {
        // error callback
        console.log(response)
      });

    },
    more() {
      this.page += 1
      this.getList()
    }
  }
}
</script>

<style scope>
.row {
  width: 100%;
  overflow: hidden;
  text-align: center;
}
.row.search {
  width: 96%;
  margin: 0 auto;
}
.md-button {
  clear: both;
}
.md-app-content {
  height: auto !important;
}
.md-field {
  width: 77% !important;
  float: left;
}
.row.search .md-button {
  width: 20% !important;
}
</style>

<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="overlap">
      
      <md-app-toolbar class="md-primary md-large">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <span class="md-title" style="flex: 1">Marvel Comics</span>
          </div>
          <div class="md-toolbar-section-end">
            <md-button class="md-dense md-raised" @click="getNews">
              News Comics
            </md-button>
          </div>
        </div>
      </md-app-toolbar>

      <md-app-content>
        <md-dialog :md-active.sync="showDialog">
          <md-dialog-title>News Comics</md-dialog-title>

          <md-table>
            <md-table-row>
              <md-table-head md-numeric>Diamond ID</md-table-head>
              <md-table-head>Title</md-table-head>
              <md-table-head>Price</md-table-head>
            </md-table-row>

            <md-table-row v-for="comic in comics" :key="comic.title" v-if="comic.publisher = 'MARVEL COMICS'">
              <md-table-cell md-numeric>{{ comic.diamond_id }}</md-table-cell>
              <md-table-cell>{{ comic.title }}</md-table-cell>
              <md-table-cell>{{ comic.price }}</md-table-cell>
            </md-table-row>
          </md-table>

          <md-dialog-actions>
            <md-button class="md-primary" @click="showDialog = false">Close</md-button>
          </md-dialog-actions>
        </md-dialog>

        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<style scoped>
  .md-app {
    /* max-height: 400px; */
    /* border: 1px solid rgba(#000, .12); */
    overflow: hidden;
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
  .md-app-toolbar {
    background: url(http://i.annihil.us/u/prod/marvel/i/mg/8/e0/52bdf830aa094.jpg);
  }
</style>

<script>
export default {
  name: 'Overlap',
  data: () => ({
    showDialog: false,
    comics: {}
  }),
  mounted() {
    // this.getNews()
  },
  methods: {
    getNews() {
      let uri = process.env.VUE_APP_ENDPOINT_COMICS_NEWS
      this.$http.get(uri).then(response => {
          this.comics = response.body.comics
          this.showDialog = true
      }, response => {
        alert("erro: " + response)
        console.log(response)
      });
    },
  }
}
</script>

<style scoped>
</style>
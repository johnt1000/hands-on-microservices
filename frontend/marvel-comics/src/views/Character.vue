<template>
    <div>

        <img
            :src="personage.thumbnail.path + '.' + personage.thumbnail.extension"
            :alt="personage.name"
        >

        <router-link to="/">
        <md-button class="md-icon-button md-fab md-primary">
            <md-icon>arrow_back</md-icon>
        </md-button>
        </router-link>

        <div class="viewport">
            <md-toolbar :md-elevation="1">
                <span class="md-title">
                    <md-icon>info</md-icon> Info
                </span>
            </md-toolbar>
            <md-list>
                <md-list-item>
                    <md-icon>vpn_key</md-icon>
                    <span class="md-list-item-text">{{ personage.id }}</span>
                </md-list-item>
                <md-list-item>
                    <md-icon>perm_identity</md-icon>
                    <span class="md-list-item-text">{{ personage.name }}</span>
                </md-list-item>
            </md-list>
        </div>

        <div class="viewport">
            <md-toolbar :md-elevation="1">
                <span class="md-title">
                    <md-icon>description</md-icon> Description
                </span>
            </md-toolbar>

            <md-content>
                <p>{{ personage.description }}</p>
            </md-content>
        </div>

        <div class="viewport">
            <md-toolbar :md-elevation="1">
                <span class="md-title">
                    <md-icon>chrome_reader_mode</md-icon> Comics
                </span>
            </md-toolbar>
            <md-list>
                <md-list-item v-for="comic in personage.comics.items" :key="comic.name">
                    <md-icon>send</md-icon>
                    <span class="md-list-item-text">{{ comic.name }}</span>
                </md-list-item>
            </md-list>
        </div>

    </div>
</template>

<script>

export default {
    name: 'character',
    props: ['id'],
    components: {
    },
    mounted() {
        this.getPersonage();
    },
    data () {
        return {
            personage: null
        }
    },
    methods: {
        getPersonage() {
            let uri = process.env.VUE_APP_ENDPOINT_CHARACTER_FIND + '/id/' + this.id
            this.$http.get(uri).then(response => {
            this.personage = response.body.data.results[0]
            console.log(this.personage)
            }, response => {
                console.log(response)
        });
        }
    }
}
</script>

<style scope>
img {
    width: 25%;
    /* float: left; */
    margin-right: 1%;
    margin-bottom: 3%;
}
.md-card {
    height: auto;
}
.md-icon-button {
    float: right;
}
</style>

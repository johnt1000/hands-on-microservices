<template>
    <div>

        <img
            :src="personage.thumbnail.path + '.' + personage.thumbnail.extension"
            :alt="personage.name"
        >

        <md-button @click="getPrint(personage)" class="md-icon-button md-fab md-primary">
            <md-icon>print</md-icon>
        </md-button>

        <router-link to="/">
            <md-button class="md-icon-button md-fab md-primary">
                <md-icon>arrow_back</md-icon>
            </md-button>
        </router-link>

        <div class="viewport">
            <md-toolbar :md-elevation="2">
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
            <md-toolbar :md-elevation="2">
                <span class="md-title">
                    <md-icon>description</md-icon> Description
                </span>
            </md-toolbar>

            <md-content>
                <p class="description">{{ personage.description }}</p>
            </md-content>
        </div>

        <div class="viewport">
            <md-toolbar :md-elevation="2">
                <span class="md-title">
                    <md-icon>star</md-icon> Powers
                </span>
            </md-toolbar>
            <md-list>
                <md-list-item v-for="power in powers.powers" :key="power.name">
                    <md-icon>star_border</md-icon>
                    <span class="md-list-item-text">{{ power.name }}</span>
                </md-list-item>
            </md-list>
        </div>

        <div class="viewport">
            <md-toolbar :md-elevation="2">
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
            personage: null,
            powers: null
        }
    },
    methods: {
        getPersonage() {
            let uri = process.env.VUE_APP_ENDPOINT_CHARACTER_FIND + '/id/' + this.id
            this.$http.get(uri).then(response => {
                this.personage = response.body.data.results[0]
                this.getPowers(this.personage.name)
            }, response => {
                console.log(response)
            });
        },
        getPowers(name) {
            let uri = process.env.VUE_APP_ENDPOINT_CHARACTER_POWERS + '/' + name
            this.$http.get(uri).then(response => {
                this.powers = response.body
            }, response => {
                console.log(response)
            });
        },
        getPrint(obj) {
            var FileSaver = require('file-saver')

            let uri = process.env.VUE_APP_ENDPOINT_CHARACTER_PRINT + '?id=' + obj.id + '&name=' + obj.name + '&description=' + obj.description
            this.$http.get(uri).then(response => {
                var data = JSON.parse(response.bodyText.toString())
                var oReq = new XMLHttpRequest();
                // The Endpoint of your server 
                var URLToPDF = data.data.url;

                // Configure XMLHttpRequest
                oReq.open("GET", URLToPDF, true);

                // Important to use the blob response type
                oReq.responseType = "blob";

                // When the file request finishes
                // Is up to you, the configuration for error events etc.
                oReq.onload = function() {
                    // Once the file is downloaded, open a new window with the PDF
                    // Remember to allow the POP-UPS in your browser
                    var file = new Blob([oReq.response], { 
                        type: 'application/pdf' 
                    });
                    
                    // Generate file download directly in the browser !
                    FileSaver.saveAs(file, "ficha.pdf");
                };

                oReq.send();
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
.description {
    margin-left: 1%;
}
.viewport {
    margin-bottom: 2%;
}
a {
    float: right;
}
</style>

<template>
    <div>
        <div>
            <img
            :src="personage.thumbnail.path + '.' + personage.thumbnail.extension"
            :alt="personage.name"
            >
            <div class="details">
                <p><b>ID:</b> {{ personage.id }}</p>
                <p><b>Name:</b> {{ personage.name }}</p>
                <p><b>Description:</b> {{ personage.description }}</p>
            </div>
        </div>

        <div class="viewport">
            <md-toolbar :md-elevation="1">
                <span class="md-title">Inset</span>
            </md-toolbar>

            <md-list>
                <md-list-item>
                <md-icon>move_to_inbox</md-icon>
                <span class="md-list-item-text">Inbox</span>
                </md-list-item>

                <md-list-item>
                <md-icon>send</md-icon>
                <span class="md-list-item-text">Sent Mail</span>
                </md-list-item>

                <md-list-item>
                <md-icon>delete</md-icon>
                <span class="md-list-item-text">Trash</span>
                </md-list-item>

                <md-list-item>
                <md-icon>error</md-icon>
                <span class="md-list-item-text">Spam</span>
                </md-list-item>

                <md-divider class="md-inset"></md-divider>

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
        float: left;
        margin-right: 1%;
        margin-bottom: 3%;
    }
    .details {
        width: 70%;
        float: left;
    }
    .md-app-content {
        /* overflow: hidden; */
    }
</style>

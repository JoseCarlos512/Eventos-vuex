<template>
    <div>
        <h1>Eventos para {{ user.user.name }}</h1>
        <EventCart v-for="event in event.events" :key="event.id" :objeto_evento="event"/>
        <template v-if="page != 1">
          <router-link :to="{ name: 'Lista', query: { page: page - 1 } }" rel="prev">Prev Page</router-link> | 
        </template>
        <template v-if="event.mIntTotal > page * 3">
            <router-link :to="{ name: 'Lista', query: { page: page + 1 } }">Next Page</router-link>
        </template>
        
    </div>
</template>

<script>
import EventCart from "@/components/EventCard.vue";
import { mapState } from 'vuex'

export default {
    name: 'EventList',
    
    components: {
        EventCart
    },
    computed: {
        ...mapState(['event', 'user']),
        page() {
            return parseInt(this.$route.query.page) || 1
        }
    },
    beforeCreate() {
        //alert('No se ha ejecutado nada todavía')
    },
    created() {
        this.$store.dispatch("event/fetchEvents", {
            perPage: 3,
            page: this.page
        });
        // console.log(parseInt(this.$route.query.page)); // Te trae el numero de pagina que aparece en la ruta
    }
}
</script>
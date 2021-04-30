<template>
    <div>
        <form @submit.prevent="createEvent">
          <label>Select a category</label>
          <select v-model="event.category">
            <option v-for="cat in categories" :key="cat">{{ cat }}</option>
          </select>
          <h3>Name & describe your event</h3>
          <div class="field">
            <label>Title</label>
            <input v-model="event.title" type="text" placeholder="Add an event title"/>
          </div>
          <div class="field">
            <label>Description</label>
            <input v-model="event.description" type="text" placeholder="Add a description"/>
          </div>
          <h3>Where is your event?</h3>
          <div class="field">
            <label>Location</label>
            <input v-model="event.location" type="text" placeholder="Add a location"/>
          </div>
          <h3>When is your event?</h3>
          <div class="field">
            <label>Date</label>
            <datepicker v-model="event.date" placeholder="Select a date"/>
          </div>
          <div class="field">
            <label>Select a time</label>
            <select v-model="event.time">
              <option v-for="time in times" :key="time">{{ time }}</option>
            </select>
          </div>
          <input type="submit" class="button -fill-gradient" value="Submit"/>
        </form>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
    name: 'EventCreate',
    components: {
        Datepicker
    },
    data() {
        const times = []
        for (let i = 1; i <= 24; i++) {
          times.push((i.toString().length == 1? "0" + i : i) + ':00')
        }
        return {
            incrementBy: 1,
            event: this.createFreshEvent(),
            times: times,
            categories: this.$store.state.categories
        }
    },
    computed: {
        
    },
    methods: {
        incrementCount() {
            //this.$store.commit('INCREMENT_COUNT', this.incrementBy) //Mutacion
            this.$store.dispatch('updateCount', this.incrementBy) //Accion
        },
        createFreshEvent() {
          const user = this.$store.state.user.user
          const id = Math.floor(Math.random() * 10000000)
          return {
            id: id,
            category: '',
            organizer: user,
            title: '',
            description: '',
            location: '',
            date: '',
            time: '',
            attendees: []
          }
        },
        createEvent() {
        this.$store
            .dispatch('event/createEvent', this.event)
            .then(() => {
            this.$router.push({ name: 'event-show', params: { id: this.event.id }});
            this.event = this.createFreshEventObject()
            })
            .catch(() => {
            console.log('There was a problem creating your event.')
            })
        }
    },
}
</script>
import EventService from '@/services/EventService.js'

export default {
    namespaced : true,
    state: {
        events: [],
        event: {},
        mIntTotal: 0
      },
      mutations: {
        INCREMENT_COUNT(state, valor) {
          state.count += valor
        },
        ADD_EVENT(state, event) {
          state.events.push(event)
        },
        SET_EVENTS(state, events) {
          state.events = events
        },
        SET_EVENT(state, event) {
          state.event = event
        }
      },
      actions: {
        updateCount({state, commit}, incrementBy){
            if (state.user) {
                commit("INCREMENT_COUNT", incrementBy);
            }
        },
        createEvent({ commit, dispatch }, event) {
          return EventService.postEvent(event).then( () => {
              commit('ADD_EVENT', event.data)
              const notification = {
                type: 'success',
                message: 'Your event has been created!'
              }
              dispatch('notification/add', notification, { root: true });
            })
            .catch(error => {
              const notification = {
                type: 'error',
                message: 'There was a problem creating your event: ' + error.message
              }
              dispatch('notification/add', notification, { root: true });
              throw error
            })
        },
        fetchEvents({ commit, state }, {perPage, page}) {
          EventService.getEvents(perPage, page)
            .then(response => {
              //console.log('Total events are ' + response.headers['x-total-count']) //Calcula la cantidad de eventos que tengo en la lista
              state.mIntTotal = response.headers['x-total-count'];
              commit('SET_EVENTS', response.data)
            })
            .catch(error => {
              const notification = {
                type: 'error',
                message: 'There was a problem fetching events: ' + error.message
              }
              dispatch('notification/add', notification, { root: true }) // root: true -> Quiere decir que busca desde la raiz hasta donde se indica
            })
        },
        fetchEvent({ commit, getters}, id) {
          alert(id);
          var event = getters.getEventById(id)
          alert(event);
          if (event) { // Se ejecuta o carga la data si llego desde el click de la lista y accedo a event-show
            alert("entro");
            alert(event)
            commit('SET_EVENT', event)
          } else { // El else se ejecuta si recargo la pagina, porque se pierde la data que se trajo de la lista y se ejecuta la llamada api
            EventService.getEvent(id)
            .then(response => {
              alert(response.data);
              commit('SET_EVENT', response.data)

            })
            .catch(error => {
              const notification = {
                type: 'error',
                message: 'There was a problem fetching an event: ' + error.message
              }
              dispatch('notification/add', notification, {
                root: true
              })
            })
          }
        },
      },
      getters: {                                                  
        /*catLength: state => {
          return state.categories.length
        }*/
        catLength(state) {                                              
          return state.categories.length                                  
        },
        /*realizados: (state) => {
          return state.todos.filter(todo => todo.done)
        },*/
        realizados(state){
          return state.todos.filter(
            function filtrando(value) {
              if (value.done == true) {
                return value 
              }
            }
          )
        },    
        // 2 maneras de realizar el conteo
        conteoFaltantes1(state) {   //utilizando length directo a un filtro (falso) del retorno del array 
          return state.todos.filter(element => !element.done).length
        },
        conteoFaltantes2: (state, getters) => {   //utilizando state (todos) y getter realizados , al restarlo = faltantes 
          return state.todos.length - getters.realizados.length
        },
        
        // 2 maneras de realizar getter dinamicos
        getTodosById: (state) => (id) => {
          return state.todos.find(event => event.id === id)
        },
    
        getEventById: state => id => {
          return state.events.find(event => event.id === id)
        }
                                                  
      }   
}
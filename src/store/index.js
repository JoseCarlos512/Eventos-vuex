import Vue from "vue";
import Vuex from "vuex";
import * as user from '@/store/modules/user.js' 
import event from '@/store/modules/event.js' // Existen 2 maneras de importar export default o export con constantes *
import notification from '@/store/modules/notification.js'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,  // Modulo incluido
    event,
    notification
  },
  state : {
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false }
    ],
    count: 0
  }                                                    
});

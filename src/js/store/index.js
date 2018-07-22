import Vue from 'vue'
import Vuex from 'vuex'
import f from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        //categories: f('Categories')
    }
})

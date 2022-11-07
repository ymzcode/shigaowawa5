import Vue from 'vue'
import Vuex from 'vuex'

import comment from '@/store/modules/comment.js'
import tabbar from '@/store/modules/tabbar.js'

Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		comment,
		tabbar
	}
})

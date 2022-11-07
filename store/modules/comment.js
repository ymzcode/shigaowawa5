export default {
	namespaced: true,
	state: {
		// 是否是回复状态
		reply: false,
		// 点击回复按钮传递的信息
		replyData: {},
		// 回复的信息内容
		replyContent: ''
	},
	getters: {
		reply: state => state.reply,
		replyData: state => staet.replyData
	},
	mutations: {
		SET_REPLY_DATA(state, data) {
			state.replyData = Object.assign({}, data)
			state.reply = true
		},
		SET_REPLY_CONTENT(state, data) {
			state.replyContent = data
		}
	},
	actions: {
		setReplyData({ commit }, data) {
			commit('SET_REPLY_DATA', data)
		},
		setReplyContent({ commit }, data) {
			commit('SET_REPLY_CONTENT', data)
		}
	}
}

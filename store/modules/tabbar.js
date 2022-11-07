export default {
	namespaced: true,
	state: {
		tabbarIconArr: [],
		selectIcon: []
	},
	getters: {
		tabbarIconArr: state => state.tabbarIconArr
	},
	mutations: {
		SET_TABBAR_ICON_ARR(state, data) {
			state.tabbarIconArr = data
		},
		SET_SELECT_ICON(state, data) {
			state.selectIcon[data.index] = data._id
		}
	},
	actions: {
		setTabbarIconArr({ commit, dispatch }, data) {
			return uniCloud.callFunction({
				name: 'get-tabbar-icon'
			}).then(res => {
				if (res.result.code === 0) {
					commit('SET_TABBAR_ICON_ARR', res.result.data)
					dispatch('changeTabbarIcon', data)
				}
			})
		},
		// 更换tabbar菜单图标
		changeTabbarIcon({state, commit, dispatch}, data) {
			if (!data) {
				return
			}
			if (state.tabbarIconArr.length === 0) {
				dispatch('setTabbarIconArr', data)
			} else {
				const arr = state.tabbarIconArr.filter(item => state.selectIcon.indexOf(item._id) === -1)
				const num = Math.round(Math.random()* (arr.length - 1))
				// console.log('dadadsadasdasdsad', arr);
				const rd_icon = arr[num]
				// console.log('123123123123123', rd_icon, num);
				const selectedIconPath = rd_icon.icon
				
				commit('SET_SELECT_ICON', {
					index: data.index,
					_id: rd_icon._id
				})
				
				uni.setTabBarItem({
					index: data.index,
					selectedIconPath: selectedIconPath
				})
				
				uni.vibrateShort({})
			}
		}
	}
}

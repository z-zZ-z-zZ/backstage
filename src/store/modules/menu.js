//引入封装好的接口
import { getMenuList } from '../../utils/axios'

//state
const state = {
    menuList: []
}

//getters
const getters = {
    getMenuList(state) {
        return state.menuList
    }
}

//mutations
const mutations = {
    /* 修改state中的数据 */
    REQ_MENULIST(state, payload) {
        state.menuList = payload
    }
}

//actions
const actions = {
    /* 获取数据 */
    getMenuListAction({ commit }) {
        getMenuList({
            istree: true
        })
            .then(res => {
                if (res.data.code == 200) {
                    commit("REQ_MENULIST", res.data.list)
                }
            })
            .catch(err => {
                console.log(err, '错误响应')
            })
    }
}


//默认导出所有的内容
export default {
    state,
    getters,
    mutations,
    actions,
    //命名空间
    namespaced: true
}
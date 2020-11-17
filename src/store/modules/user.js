import { getUserList, getUserCount } from '../../utils/axios';

const state = {
    userList: [],
    size: 2,/* 每个组件渲染的数据数量 */
    page: 1, /* 页数 */
    total: 0/*  总条数 */
}

const getters = {
    getUserList() {
        return state.userList
    },
    getUserCount() {
        return state.total;
    },
    getUserSize() {
        return state.size
    }
}

const mutations = {
    /* 管理员数据 */
    REQ_USERLIST(state, payload) {
        state.userList = payload
    },
    /* 管理员总数 */
    REQ_USERCOUNT(state, payload) {
        state.total = payload
    },
    REQ_PAGE(state, payload) {
        state.page = payload
    }
}

const actions = {
    /* 获取管理员数据 */
    getUserAction(context) {
        getUserList({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            if (res.data.code == 200) {
                context.commit("REQ_USERLIST", res.data.list)
                let data = res.data.list ? res.data.list : []

                if (context.state.page != 1 && data.length == 0) {
                    //重新调取修改页码的行动
                    context.dispatch('changePageAction', context.state.page - 1)
                    //重新调取列表
                    context.dispatch('getUserAction')
                    return
                }
            }
        })
    },
    /* 获取总条数 */
    getCountAction({ commit }) {
        getUserCount().then(res => {
            if (res.data.code == 200) {
                commit("REQ_USERCOUNT", res.data.list[0].total)
            }
        })
    },
    /* 修改page */
    changePageAction(context, payload) {
        context.commit('REQ_PAGE', payload)
        context.dispatch('getUserAction')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
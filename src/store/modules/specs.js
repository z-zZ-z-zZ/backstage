import { getSpecsList, getSpecsCount } from '../../utils/axios';

const state = {
    specsList: [],
    size: 2,
    page: 1,
    total: 0
}

const getters = {
    getSpecsList(){
        return state.specsList
    },
    getSpecsCount(){
        return state.total
    },
    getSpecsSize(){
        return state.size
    }
}
const mutations = {
    /* 管理员数据 */
    REQ_SPECSLIST(state, payload) {
        state.specsList = payload
    },
    /* 管理员总数 */
    REQ_SPECSCOUNT(state,payload){
        state.total = payload
    },
    REQ_PAGE(state,payload){
        state.page = payload
    }
}

const actions = {
    /* 获取管理员数据 */
    getSpecsAction(context) {
        getSpecsList({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            if (res.data.code == 200) {
                context.commit("REQ_SPECSLIST", res.data.list)
            }
        })
    },
    /* 获取总条数 */
    getCountAction({commit}){
        getSpecsCount().then(res=>{
            if (res.data.code == 200) {
                commit("REQ_SPECSCOUNT", res.data.list[0].total)
            }
        })
    },
    /* 修改page */
    changePageAction(context,payload){
        context.commit('REQ_PAGE',payload)
        context.dispatch('getSpecsAction')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
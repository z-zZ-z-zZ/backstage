import { getGoodsList,getGoodsCount } from '../../utils/axios';

const state = {
    goodsList: [],
    size: 2,/* 每个组件渲染的数据数量 */
    page: 1, /* 页数 */
    total: 0/*  总条数 */
}

const getters = {
    getGoodsList() {
        return state.goodsList
    },
    getGoodsCount() {
        return state.total;
    },
    getGoodsSize() {
        return state.size
    }
}

const mutations = {
    /* 管理员数据 */
    REQ_GOODSLIST(state, payload) {
        state.goodsList = payload
    },
    /* 管理员总数 */
    REQ_GOODSCOUNT(state,payload){
        state.total = payload
    },
    REQ_PAGE(state,payload){
        state.page = payload
    }
}

const actions = {
    /* 获取管理员数据 */
    getGoodsAction(context) {
        getGoodsList({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            if (res.data.code == 200) {
                context.commit("REQ_GOODSLIST", res.data.list)
            }
        })
    },
    /* 获取总条数 */
    getCountAction({commit}){
        getGoodsCount().then(res=>{
            if (res.data.code == 200) {
                commit("REQ_GOODSCOUNT", res.data.list[0].total)
            }
        })
    },
    /* 修改page */
    changePageAction(context,payload){
        context.commit('REQ_PAGE',payload)
        context.dispatch('getGoodsAction')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
import { getBannerList } from '../../utils/axios';

const state = {
    bannerList: [ ]
}

const getters = {
    getBannerList(state){
        return state.bannerList
    }
}

const mutations = {
    REQ_BANNERLIST(state,payload){
        state.bannerList = payload
    }
}

const actions = {
    getBannerListAction({commit}){
        getBannerList()
        .then(res=>{
            if(res.data.code==200){
                commit("REQ_BANNERLIST",res.data.list)
                console.log(res.data.list)
            }
        })
        .catch(err=>{
           console.log(err,'发生了错误')
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
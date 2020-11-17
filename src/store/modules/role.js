import {getRoleList} from '../../utils/axios';

const state = {
    roleList:[]
}

const getters = {
    getRoleList(state){
        return state.roleList
    }
}

const mutations = {
    REQ_ROLELIST(state,payload){
        state.roleList = payload
    }
}

const actions = {
    getRoleListAction({commit}){
        getRoleList({})
        .then(res=>{
            if(res.data.code===200){
                commit("REQ_ROLELIST",res.data.list)
            }
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
import { getMemberList } from '../../utils/axios';

const state = {
    memberList: [ ]
}

const getters = {
    getMemberList(state){
        return state.memberList
    }
}

const mutations = {
    REQ_MEMBERLIST(state,payload){
        state.memberList = payload
    }
}

const actions = {
    getMemberListAction({commit}){
        getMemberList()
        .then(res=>{
            if(res.data.code==200){
                commit("REQ_MEMBERLIST",res.data.list)
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
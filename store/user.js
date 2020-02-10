// return a object
export const state = () => ({
    userInfo: {
        token: '',
        user: {}
    }
})
export const mutations= {
    setUserInfo(state,data){
        state.userInfo=data
    },
    cleanUserInfo(state,info){
        if(process.browser){
            localStorage.removeItem('userInfo')
        }
        state.userInfo={}
    }
}
export const actions= {
    login({commit},data){
        return this.$axios({
            url:'/accounts/login',
            method:'POST',
            data:data
        }).then(res=>{
             const data=res.data;
             commit('setUserInfo',data);
             return data
        })
    }
}
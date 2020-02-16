export const state = () => ({
    // 历史查询
    history:[],
    // 订单详细信息
    orderDetail:{
        // 避免模板报错，创建一个空对象
        seat_infos:{}
    },
    // 总价格
    allPrice:0   
})

export const mutations= {
    // 把传入的表单数据存储到history
    setHistory(state,data){
        // 把最近的搜索记录添加到数组第一位，以显示在最上面
        state.history.unshift(data)
        // 截取数组长度为5，state.history.slice(0,6)
        if(state.history.length>5){
            state.history.length=5
        }
    },
    // 修改orderDetail的数据
    setOrderDetail(state,data){
        state.orderDetail=data
    },
    // 保存总价格
    setAllPrice(state,data){
        state.allPrice=data
    }

}
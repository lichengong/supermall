import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem('car') || '[]')
var user = JSON.parse(localStorage.getItem('user') || '[]')
const store = new Vuex.Store({
  state: {  //this.$store.state.***
    car: car,
    user:user 
  },
  mutations: {  //this.$store.commit('方法名称','传递唯一参数')
    addToCar(state, goodsinfo) {
      //点击加入购物车 把商品信息保存到store中的car上
      //分析:如果购物车中，之前就已经有这个对应的商品，那么，只需要更新数量
      //如果没有，则直接把商品数据 push到car中即可
      //假设在购物车中没有找到对应的商品
      var flag = false
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += 1
          flag = true
          return true
        }
      })
      if (!flag) {
        state.car.push(goodsinfo)
      }
      //当更新car之后，把car数组存储到本地的localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updatedGoods(state, goodsinfo) {
      //修改购物车中商品的数量
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    //根据传过来的id删除购物车中对应的商品
    removeFormCar(state, id) {
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    //同步开关状态
    updatedselectedChanged(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  actions: {

  },
  getters: {  //this.$store.getters.***
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0,
        Amount: 0
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.Amount += item.price * item.count
        }
      })
      return o
    },
    getUserInfo(state){
      return state.user.nickname
    }
  }
})

export default store

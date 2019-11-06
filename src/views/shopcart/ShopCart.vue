<template>
  <div class="shopcar-container">
    <navbar class="shopcar-nav"/>
    <!-- 商品列表区域 -->
    <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-switch
            v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
          ></mt-switch>
          <img :src="item.image" alt />
          <div class="info">
            <h1>{{item.title}}</h1>
            <p>
              <span class="price">{{item.price}}</span>
              <!-- 我们可以创建一个空对象，然后循环遍历购物车中的所有商品数据
              把当前循环这条商品的idz作为对象的属性名，count作为对象的属性值
              这样，当把所有的商品循环一遍，就好得到一个对象:{ 88:2, 89:1, 90:4}-->
              <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
              <a href="#" @click.prevent="remove(item.id,i)">删除</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计(不含运费)</p>
            <p>
              已勾选商品
              <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价
              <span class="red">￥{{$store.getters.getGoodsCountAndAmount.Amount}}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import numbox from "views/shopcart/shopcar_numbox.vue";
import navbar from "views/shopcart/shopcar_navbar.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      goodslist: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    //获取购物车商品列表
    getGoodsList() {
      var carInfo = JSON.parse(localStorage.getItem("car"));
      this.goodslist = carInfo;
      if (!carInfo) {
        Toast("购物车为空...");
      }
    },
    remove(id, index) {
      //点击删除，把商品从store中根据传递的id删除
      //同时，把当前组件中的goodslist中对应要删除的那个商品，使用index来删除
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFormCar", id);
    },
    selectedChanged(id, val) {
      //每当点击开关把最新的开关状态同步到store中去
      this.$store.commit("updatedselectedChanged", { id, selected: val });
    }
  },
  components: {
    navbar,
    numbox
  }
};
</script>

<style scoped>
.shopcar-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
}
.mui-card-content-inner {
  display: flex;
  align-items: center;
}
img {
  width: 60px;
  height: 60px;
}
.info p {
  display: flex;
  margin: 0;
  padding-top: 10px;
}
.info h1 {
  font-size: 17px;
  margin: 0;
}
.info .price {
  color: red;
  font-weight: bold;
}

.jiesuan {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.red {
  color: red;
  font-weight: bold;
  font-size: 16px;
}
</style>
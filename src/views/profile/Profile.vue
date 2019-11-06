<template>
  <div class="profile">
    <div class="header">
      <div class="top">我的档案</div>
      <div class="header-info">
        <img src="~assets/img/profile/avatar.svg" alt class="avatar" />
        <div class="info-account">
          <div class="log-res" v-if="$store.getters.getUserInfo">{{$store.getters.getUserInfo}}</div>
          <div class="log-res" @click="$router.push('/login')" v-else>登陆/注册</div>
          <div class="tel-text">
            <img src="~assets/img/profile/phone.svg" alt class="phone" />暂无绑定手机
          </div>
        </div>
        <img src="~assets/img/common/back.svg" alt class="back" @click="back" />
      </div>
    </div>
    <div class="wallet">
      <div class="money">
        <span class="text">0.00</span>
        <span>元</span>
        <div>我的余额</div>
      </div>
      <div class="youhui">
        <span class="text">0</span>
        <span>个</span>
        <div>我的优惠</div>
      </div>
      <div class="jifen">
        <span class="text">0</span>
        <span>分</span>
        <div>我的积分</div>
      </div>
    </div>
    <div class="list-one">
      <div>
        <img src="~assets/img/profile/message.svg" alt />
        <span>我的消息</span>
      </div>
      <div>
        <img src="~assets/img/profile/pointer.svg" alt />
        <span>积分商城</span>
      </div>
      <div>
        <img src="~assets/img/profile/vip.svg" alt />
        <span>会员卡</span>
      </div>
    </div>
    <div class="list-one">
      <div>
        <router-link to="/shopcart">
          <img src="~assets/img/profile/cart.svg" alt />
          <span>我的购物车</span>
        </router-link>
      </div>
      <div>
        <img src="~assets/img/profile/shopping.svg" alt />
        <span>下载购物APP</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.back();
    }
  },
  computed:{
    user(){
      return localStorage.getItem('userinfo')
    }
  },
};
</script>

<style scoped>
a{
  color: #8b8389;
}
.profile {
  padding: 6px;
}
.header {
  background-color: var(--color-tint);
  color: #fff;
}
.top {
  padding-top: 8px;
  text-align: center;
  font-size: 20px;
}
.header-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 20px 15px 15px 15px;
}
.header-info .avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.header-info .back {
  transform: rotate(180deg);
}
.info-account .log-res {
  font-size: 18px;
  text-indent: 1em;
}
.info-account .tel-text {
  font-size: 14px;
}
.info-account img {
  width: 18px;
  height: 18px;
  vertical-align: middle;
}
.info-account {
  display: inline-block;
  margin-left: 15px;
  flex: 1;
}

.wallet {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px;
  text-align: center;
  color: #8b8389;
}
.wallet .text {
  color: red;
  font-size: 28px;
}
.list-one {
  margin: 15px 0;
  padding: 8px 0 8px 10px;
  color: #8b8389;
  background-color: #fff;
}
.list-one span {
  display: inline-block;
  text-indent: 5px;
}
.list-one div {
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
}
.list-one img {
  width: 28px;
  height: 28px;
  vertical-align: top;
  margin-top: 3px;
}
</style>
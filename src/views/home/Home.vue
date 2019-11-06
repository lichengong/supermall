<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <swiper :lunbotuList="banners" :isfull="true" @swipeImageLoad="swipeImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="goods[currentType].list" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShow" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import RecommendView from "views/home/childComps/RecommendView";
import FeatureView from "views/home/childComps/FeatureView";
import { Mixin } from "common/mixin";
import { debounce } from "common/utils";
import {baseUrl} from "network/baseUrl"
export default {
  name: "Home",
  mixins: [Mixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 300);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  methods: {
    getHomeMultidata() {
      this.axios.get(baseUrl+"/home/multidata").then(res => {
        // this.result = res;
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    //获取商品
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      this.axios
        .get(baseUrl+"/home/data", {
          params: { type, page }
        })
        .then(res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1;
          this.$refs.scroll.refresh();
        });
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    contentScroll(position) {
      //滚动距离大于1000显示返回顶部按钮
      this.listenShowBackTop(position);
      //滚动距离大于tabControl2的offsetTop时tabControl1就盖上原来的tabControl
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    //上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    //轮播图图片加载完成时获取offsetTop才准确
    swipeImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  },
  //进入活跃时滚动到记录的位置
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  //页面跳转时记录之前滚动的位置y值
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y;
  },

  components: {
    NavBar,
    TabControl,
    RecommendView,
    FeatureView
  }
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 9;
}
.swiper {
  width: 100%;
}
#home {
  height: 100vh;
  position: relative;
  background-color: #fff;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
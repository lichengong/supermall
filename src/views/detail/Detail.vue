<template>
  <div id="detail">
    <detail-nav-bar class="navbar" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <swiper :lunbotuList="topImages" :isfull="true" setHeight="300px" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-image-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad" />
      <detail-param-info ref="param" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>
    <detail-bottom-bar @addtoCar="addtoCar" />
    <back-top @click.native="backClick" v-show="isShow" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailImageInfo from "./childComps/DetailImageInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import {Goods} from "network/detail";
import { Mixin } from "common/mixin";
import { Toast } from "mint-ui";
import { debounce } from "common/utils";
import {baseUrl} from "network/baseUrl"
export default {
  name: "Detail",
  mixins: [Mixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themetops: [],
      getThemeTop: null,
      currentIndex: 0
    };
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid;
    //根据iid请求详情数据
    this.axios
      .get(baseUrl+"/detail", {
        params: {
          iid: this.iid
        }
      })
      .then(res => {
        //获取顶部轮播图数据
        const data = res.data.result;
        this.topImages = data.itemInfo.topImages;
        //获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        //获取商家信息
        this.shop = data.shopInfo;
        //获取商品详情图片
        this.detailInfo = data.detailInfo;
        //获取商品参数信息
        this.paramInfo = data.itemParams;
        //获取用户评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
        //根据最新的数据，对应的DOM是已经被渲染出来
        //但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片）.
        //offsetTop值不对的时候，都是因为图片的问题
        //   this.$nextTick(() => {
        //     this.themetops = [];
        //     this.themetops.push(0);
        //     this.themetops.push(this.$refs.param.$el.offsetTop);
        //     this.themetops.push(this.$refs.comment.$el.offsetTop);
        //     this.themetops.push(this.$refs.recommend.$el.offsetTop);
        //     console.log(this.themetops);
        //   });
      });
    //请求推荐数据
    this.axios.get(baseUrl+"/recommend").then(res => {
      this.recommend = res.data.data.list;
    });
    this.getThemeTop = debounce(() => {
      this.themetops = [];
      this.themetops.push(0);
      this.themetops.push(this.$refs.param.$el.offsetTop);
      this.themetops.push(this.$refs.comment.$el.offsetTop);
      this.themetops.push(this.$refs.recommend.$el.offsetTop);
      this.themetops.push(Number.MAX_VALUE);
    }, 100);
  },
  methods: {
    swipeImageLoad() {
      this.$refs.scroll.refresh();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themetops[index], 200);
    },
    detailImageLoad() {
      const refresh = debounce(this.$refs.scroll.refresh, 300);
      refresh();
      this.getThemeTop();
    },
    contentScroll(position) {
      // 1.获取y值
      let positionY = -position.y;
      //2.positoiny和主题中值进行对比
      //[e，7938，9120，9452]
      //positoiny在0和7938之间，index=0
      //positoinY在=7938和9120之间，index=1
      //positoinY在9120和9452之间，index=2
      //positoiny 大于等于9120值，index=3
      let length = this.themetops.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          (positionY >= this.themetops[i] && positionY < this.themetops[i + 1])
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.listenShowBackTop(position);
    },
    addtoCar() {
      //拼接出一个保存到store中car数组里的商品信息对象
      var goodsinfo = {
        id: this.iid,
        image: this.topImages[0],
        title: this.goods.title,
        desc: this.goods.desc,
        price: this.goods.newPrice.substring(1),
        count: 1,
        selected: true
      };
      //调用mutations中的方法加入购物车
      this.$store.commit("addToCar", goodsinfo);
      Toast("加入购物车成功");
    }
  },
  components: {
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
/* .navbar{
    position: relative;
    z-index: 9;
    background-color: #fff;
}  */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
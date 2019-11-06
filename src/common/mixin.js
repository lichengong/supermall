//混入
import BackTop from 'components/content/backTop/BackTop'
import swiper from "components/common/swiper/swiper";
import { Toast } from "mint-ui";
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import { debounce } from "common/utils";
export const Mixin={
    components:{
        BackTop,
        swiper,
        Scroll,
        GoodsList
    },
    data(){
        return{
            isShow: false //是否显示返回顶部按钮
        }
    },
    methods:{
        //返回页面顶部
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
          },
        //滚动距离大于1000显示返回顶部按钮
        listenShowBackTop(position){
            this.isShow = -position.y > 1000;
        }
    }
}
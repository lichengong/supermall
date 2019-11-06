<template>
    <div class="tabbar-item" @click="itemClick">
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
        <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>   
</template>

<script>
export default {
    data(){
        return{
            // isActive:false
        }
    },
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'red'
        }
    },
    methods:{
        itemClick(){
            this.$router.push(this.path)
        }
    },
    computed:{
        isActive(){
            return this.$route.path.indexOf(this.path) !==-1
        },
        activeStyle(){
            return this.isActive ? {color:this.activeColor} : {}
        }
    }
}
</script>

<style scoped>
.tabbar-item{
  flex:1;
  text-align: center;
  height: 49px; /*no*/
  font-size: 14px;
}

.tabbar-item img{
  font-size: 25px;
  width: 25px;
  height: 25px;
}

</style>
<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import { log } from 'util';
export default {
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{ 
            scroll:null
        }
    },
    mounted(){
         this.scroll = new BScroll(this.$refs.wrapper,{
            click:true,
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad
        })

        this.scroll.on('scroll',(position)=>{
            this.$emit('scroll',position)
        })
        this.scroll.on('scrollEnd',()=>{
            this.$emit('pullingUp')
        })
    },
    methods:{
        scrollTo(x,y,time=800){
             this.scroll && this.scroll.scrollTo(x,y,time)
        },
        refresh(){
            this.scroll && this.scroll.refresh()
        }
    }
}
</script>

<style scoped>

</style>
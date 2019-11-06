<template>
  <div :style="Height">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.image || item" alt :class="{'full':isfull}" @load="swipeImageLoad" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  props: {
      lunbotuList:{
          type:Array
      },
      isfull:{
          type:Boolean
      },
      setHeight:{
          type:String,
          default:'200px'
      }
  },
  data() {
    return {
      isLoad: false
    };
  },
  methods: {
    swipeImageLoad() {
      if (!this.isLoad) {
        this.$emit("swipeImageLoad");
        this.isLoad = true;
      }
    }
  },
  computed: {
    Height() {
      return { height: this.setHeight};
    }
  }
};
</script>
<style scoped>

.mint-swipe-item {
  text-align: center;
}
img {
  height: 100%;
}
.full {
  width: 100%;
}
</style>

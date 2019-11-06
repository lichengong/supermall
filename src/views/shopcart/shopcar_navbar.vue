<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center">购物车</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  data() {
    return {
    };
  },
  components: {
    NavBar
  },
  methods: {
    backClick() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.back {
  margin-top: 7px;
}
</style>
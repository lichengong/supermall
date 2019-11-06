<template>
    <div id="tabbar">
        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#tabbar{
  display: flex;
  position:fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -2px 0px rgba(100, 100, 100, 0.1);
  
}

</style>
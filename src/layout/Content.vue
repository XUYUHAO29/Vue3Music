<template>
  <div id="routerContent">
    <canvas id="canvas"></canvas>
    <div id="backdrop"></div>
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import "../static/css/canvasBackground.css"
import "../static/js/canvasBackground.js"
export default defineComponent({
  name: "va-content",
});
</script>

<style scoped>
#routerContent {
  width: 100%;
  margin-top: 8vh;
  /* background-color: red; */
  overflow-y: hidden;
}
</style>
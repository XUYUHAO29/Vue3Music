<template>
  <div id="defaultLayout">
    <va-top-bar class="va-top-bar"/>
    <va-content class="va-content">
      <slot></slot>
    </va-content>
    <va-bottom-bar class="va-bottom-bar"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import VaTopBar from './TopNavigationBar';
import VaContent from './Content';
import VaBottomBar from './BottomMusicStatusBar.vue';
export default defineComponent({
  name: 'defaultLayout',
  components:{ 
    "va-top-bar": VaTopBar,
    "va-content": VaContent,
    "va-bottom-bar": VaBottomBar
  }
})
</script>

<style scoped>
.va-top-bar{
  position: fixed;
  top: 0;
  z-index: 99;
}
.va-bottom-bar{
  position: fixed;
  bottom: 0;
}
</style>
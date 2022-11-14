<template>
  <defaultLayout>
    <router-view></router-view>
  </defaultLayout>
</template>

<script>
import { defineComponent } from "vue";
import defaultLayout from "./defaultLayout"
export default defineComponent({
  components:{ defaultLayout }
})
</script>

<style>

</style>
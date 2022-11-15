<template>
  <div id="top-bar">
    <div class="top-bar-items d-flex justify-content-between">
      <div class="leftItem d-flex">
        <div
          v-for="item in state.itemLists.leftLists"
          :key="item.itemId"
          @click.stop="routerTo(item)"
        >
          <span> {{ item.itemName }}</span>
        </div>
      </div>
      <div class="rightItem d-flex">
        <div
          v-for="item in state.itemLists.rightLists"
          :key="item.itemId"
          @click.stop="routerTo(item)"
        >
          {{ item.itemName }}
        </div>
        <div @click.stop="routerTo(user)">
          <div class="userHeader-imgs"> 
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted , watch, reactive} from "vue";
import { useTopItemLists } from "../stores/topItems";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "va-top-bar",
  setup() {
    let state = reactive({
      itemLists:{}
    })
    const TopItems = useTopItemLists()
    onMounted(() => {
      initData()
    })
    const initData=()=>{
      TopItems.getTopItemlists()
    }
    watch(()=>TopItems.getterTopItemlists,(val)=>{
      state.itemLists = Object.assign({},val)
    })
    const router = useRouter();
    const routerTo = (item) => {
      router.push({
        name: item.router_name,
      });
    };
    return {
      state,
      routerTo,
    };
  },
});
</script>

<style scoped>
#top-bar {
  width: 100vw;
  height: 63px;
  background-color: #623162f5;
  font-size: 1vw;
}
.leftItem,
.rightItem {
  line-height: calc(63px - 0px);
  margin: 0 20px;
  /* border: 1px solid black; */
}
.leftItem > div,
.rightItem > div {
  cursor: pointer;
  /* border: 1px solid black; */
  color: wheat;
  padding: 0 20px;
}
.leftItem > div:hover,
.rightItem > div:hover {
  color:white;
  background-color: rgb(131, 57, 122);

}
.userHeader-imgs{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top:calc(50%);
  background-color: rgb(131, 57, 122);
}
</style>


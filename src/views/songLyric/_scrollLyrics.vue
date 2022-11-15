<template>
  <div class="lyrics">
      <div v-for="(item, index) in lyricList" :key="index">
          {{ item }}
      </div>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import { useSongLists } from "../../stores/songlists"
export default defineComponent({
    name:"scrollLyrics",
    setup(){
        const api  = useSongLists()
        let lyric = api.currentLyric.lrc.lyric
        let timeList = []
        let lyricList = []
        // watch(
        //     ()=>api.currentTime,
        //     (val)=>{
        //         lyric = val.lrc.lyric
        //         handlerlyric(lyric)
        //     }
        // )
        function handlerlyric(lyric){
            let lyricArray = lyric.split("\n")
            for(let index in lyricArray){
                let leftIndex, rightIndex, time, lyric
                leftIndex = lyricArray[index].indexOf("[")
                rightIndex = lyricArray[index].indexOf("]")

                time = lyricArray[index].substring(leftIndex+1, rightIndex)
                lyric = lyricArray[index].substring(rightIndex+1, lyricArray[index].length)

                if(time.length > 0) {
                    timeList.push(time)
                    lyricList.push(lyric)
                    console.log(timeList[index]+"-----"+lyricList[index])
                }
              
            }
        }
        handlerlyric(lyric)
        return{
            lyricList
        }
    }
})
</script>

<style scoped>
.lyrics{
    z-index: 4;
}
.lyrics > div{
    line-height: 60px;
    border:inset 1px solid red;
}
</style>
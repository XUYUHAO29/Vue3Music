<template>
  <div ref="lyrics" class="lyrics">
      <div v-for="(item, index) in lyricList" :key="index">
          {{ item }}
      </div>
  </div>
</template>

<script>
import { defineComponent, watch, getCurrentInstance} from "vue"
import { useSongLists } from "../../stores/songlists"
export default defineComponent({
    name:"scrollLyrics",
    setup(){
        const api  = useSongLists()
        const instance = getCurrentInstance()
        let lyric = api.currentLyric.lrc.lyric
        let timeList = []
        let lyricList = []
        let curIndex = 0
        watch(
            ()=>api.currentTime,
            (val)=>{
                handlerScroll(val)
            }
        )
        function handlerlyric(lyric){
            let lyricArray = lyric.split("\n")
            for(let index in lyricArray){
                let leftIndex, rightIndex, time, lyric
                leftIndex = lyricArray[index].indexOf("[")
                rightIndex = lyricArray[index].indexOf("]")

                time = lyricArray[index].substring(leftIndex+1, rightIndex)
                lyric = lyricArray[index].substring(rightIndex+1, lyricArray[index].length)

                if(time.length > 0) {
                    let arr = time.split(":"),
                        second
                    arr[0] = parseInt(arr[0]) * 60
                    arr[1] = parseFloat(arr[1])
                    second = parseFloat((arr[0] + arr[1]).toFixed(3))

                    timeList.push(second)
                    lyricList.push(lyric)
                    console.log(timeList[index]+"-----"+lyricList[index])
                }
            }
        }
        function handlerScroll(currentTime){
            let cur
            cur = parseFloat(currentTime.toFixed(3))
            if(cur > timeList[curIndex]){
                instance.refs.lyrics.scrollTo({
                    top: curIndex > 4 ? (curIndex - 4)*60 : 0,
                    behavior: 'smooth'
                })
                curIndex > 0 ? instance.refs.lyrics.children[curIndex - 1].classList.remove("highlight") : 0
                instance.refs.lyrics.children[curIndex].classList.add("highlight")
                curIndex++
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
    /* margin-top:-120px; */
}
.lyrics > div{
    line-height: 60px;
    border:inset 1px solid aqua;
    /* margin-top:-20px; */
}
.highlight{
    color: aqua;
}
</style>
<template>
    <div class="content d-flex flex-row">
      <div class="ml-30 mt-30">
        <va-single-songList 
        :height="'240px'"
        :width="'240px'"
        :imageUrl="playlistDetail.coverImgUrl"
        :playlistDescription="''"
        class="playlistimg" 
        /> 
      </div>
      <textarea
      class="description ml-30 mt-30 d-flex align-items-center"
      readonly
      disabled
      v-model="playlistDetail.description"
      />
    </div>
    <div class="tableContent margin-center mt-30">
        <div class="table">
            <div ref="tbody" class="tbody">
                <div class="tr table-thead-fix">
                    <div class="th">歌曲名</div>
                    <div class="th">歌手</div>
                    <div class="th">出自专辑</div>
                </div>
                <div 
                    class="tr heightColor" 
                    v-for="(item,index) in state.singleListDetail" 
                    :key="item.id"
                    @click="playmusic(item, index+1)"
                >
                    <div class="td">{{ item.name }}</div>
                    <div class="td">{{ item.ar[0].name }}</div>
                    <div class="td">{{ item.al.name }}</div>
                </div>          
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, watch, reactive, getCurrentInstance, onMounted } from "vue"
import { useSongLists } from "../../stores/songlists"
export default defineComponent({
    name:"songdetail",
    setup(){
        const api = useSongLists()
        const playlistDetail = api.currentPlaylist
        const instance = getCurrentInstance()
        const state = reactive({
            singleListDetail:{}
        })
        onMounted(()=>{
            // 获取当前被选中的歌单的详细的歌曲
            api.getDetail_async({id:api.currentPlaylist.id})
        })
        watch(
            () => api.singleListDetail,
            (val) => {
                state.singleListDetail = JSON.parse(JSON.stringify(val.songs))
            }
        )
        function playmusic(item, index){
            api.checkMusic({id:item.id}).then(response => {
                if(response.success){
                    let songUrl = api.getSongUrl({id:item.id})
                    api.currentSongPic = JSON.parse(JSON.stringify(item))
                    let songLyric = api.getLyric({id:item.id})
                    api.historySongs.push({
                        songUrl:songUrl,
                        songPic:api.currentSongPic,
                        songLyric:songLyric
                    })
                    console.log(api.historySongs)
                }
                isSelected(index)
            })
        }
        let preNode = 0
        function isSelected(index){
            instance.refs.tbody.children[preNode].classList.remove("isSelected")
            instance.refs.tbody.children[index].classList.add("isSelected")
            preNode = index
        }
        return{
            playlistDetail,
            state,
            playmusic
        }
    }
})
</script>

<style scoped>
    .content{
        width: 100%;
    }
    .playlistimg{
        color: #fff;
        text-align: center;
        font-size: 28px;
    }
    .description{
        height: 250px;
        width: 75%;
        background-color: transparent;
        backdrop-filter: blur(10px);
        /* text-align: center; */
        overflow-x:hidden;
        /* word-wrap:break-word;    */
        color: #fff;
        font-size: 15px;
        border: none;
        resize: none;
        font-family: Micrsoft YaHei;
    }

    .tableContent{
        color: #fff;
        backdrop-filter: blur(10px);
        width: 80%;
        height: 300px;
        overflow-x:hidden;
        text-indent: 8px;
    }
    .heightColor:hover{
        color: aqua;
        cursor: pointer;
    }
    .table{
        width: 100%;
        height: 300px;
        margin: 0 auto;
        overflow-x: hidden;
        background-color:transparent;
        backdrop-filter: blur(10px);
        /* border: 1px solid white; */
    }
    .tbody{
        width: 100%;
        text-align: left;
        position: relative;
        z-index: 2;
    }
    .tr{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 50px;
        color: #fff;
    }
    .th{
        font-size: 24px;
        font-weight: 500;
        cursor:pointer;
    }
    .tr > div{
        width: 33.3%;
        flex-shrink: 0;
        border-bottom:1px solid white ;
        display: flex;
        align-items: center;
    }
    .table-thead-fix{
        position: sticky;
        top: 0;
        z-index: 99;
        background-color: rgb(136 89 203);
    }
    .isSelected{
        color: aqua;
        background-color: rgb(132 43 226 / 30%);
    }

    .table::-webkit-scrollbar,.description::-webkit-scrollbar{
        /* display: none; */
        background-color: transparent;
        width: 10px;
    }
    .table::-webkit-scrollbar-thumb,.description::-webkit-scrollbar-thumb{
        background-color: rgb(203, 89, 176);
        border-radius: 25px;
    }
</style>
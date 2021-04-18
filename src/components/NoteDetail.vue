<template>
  <div id="noteDetail">
    <div class="msgList">
      <div class="recommendTitle">推荐</div>
      <div v-for="(v, index) in noteRecommends" v-bind:key="index" class="titleList">
        <router-link :to="'/detail/' + v[0] + '/'" data-toggle="tooltip" data-placement="right" title="">{{ v[1] }}</router-link>
      </div>
    </div>
    <div class="oneNote">
      <div class="noteDetailTitle">
        <h3>{{ noteDetailInfo.noteTitle }}</h3>
        <p><span>{{ noteDetailInfo.createTime }}</span><span style="color: #54acd2">作者: hello</span><span>阅读数：{{ noteDetailInfo.readNum }}</span>
          <span id="upRi" class="up-ri"><a href="">修改</a></span></p>
      </div>
      <div class="noteDetailLabel">
        <span v-for="(v, i) in noteDetailInfo.noteLabel" class="myLabel" v-bind:key="i"
              style="">{{ v }}</span>
      </div>
      <div class="specDescription">
        <h4>笔记说明</h4>
        <p>{{ noteDetailInfo.instruction }}</p>
      </div>
      <div class="straightLine">

      </div>
      <div class="note-con">
        <mavon-editor v-model="noteDetailInfo.content" :subfield="prop.subfield" :defaultOpen="prop.defaultOpen" :toolbarsFlag="prop.toolbarsFlag" :editable="prop.editable" :scrollStyle="prop.scrollStyle" :boxShadow="prop.boxShadow" ref=md />
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'noteDetail',
  data () {
    return {
      noteRecommends: [],
      noteDetailInfo: {
        noteTitle: '',
        createTime: '',
        noteLabel: [],
        readNum: 0,
        instruction: '',
        content: ''
      }
    }
  },
  computed: {
    prop () {
      return {
        subfield: false, // 单双栏模式
        defaultOpen: 'preview', // edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: false,
        boxShadow: false // 边框
      }
    }
  },
  methods: {
    setRecommendInfo (response) {
      this.noteRecommends.length = 0
      let noteRecommendsObj = response.data.note_title
      for (let i = 0; i < noteRecommendsObj.length; i++) {
        this.noteRecommends.push(noteRecommendsObj[i])
      }
      let noteDetailObj = response.data.note_det
      this.noteDetailInfo.noteTitle = noteDetailObj[1]
      this.noteDetailInfo.createTime = noteDetailObj[2]
      this.noteDetailInfo.readNum = noteDetailObj[6]
      this.noteDetailInfo.noteLabel = noteDetailObj[3].split('|').map(el => el.trim()).filter(item => item.trim() !== '')
      this.noteDetailInfo.instruction = noteDetailObj[4]
      this.noteDetailInfo.content = noteDetailObj[5]
    }
  },
  mounted () {
    this.common.getFunc('/detail/' + this.$route.params.id + '/', this.setRecommendInfo)
  }
}
</script>

<style scoped>

</style>

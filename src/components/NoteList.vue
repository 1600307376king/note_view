<template>
  <div id="noteList">
    <div id="listContainer">
        <div id="labelListBox">
          <div id="line">
            <div id="redLine"></div>
          </div>
          <div id="labelInnerBox">
            <ul id="navMenu">
              <li v-for="(item) in noteFirstMenu" v-bind:key="item[0]">
                <a v-on:click="rotation">
                  <img v-bind:src="'/static/images/icon/' + item[0] + '.png'" alt="图片加载失败">
                  <span class="firstMenu">{{ item[0] }}</span>
                  <span class="arrow"></span>

                </a>
                <ul class="subMenu">
                  <li class="one" v-for="(v) in item[1]" v-bind:key="v" v-on:click="secondaryMenuFilter">
                    <a href="#"><span>{{ v }}</span></a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div id="noteListBox">
          <div id="sortNoteBox">
            <ul>
              <li v-for="(v, index) in sortBar" v-bind:class="v.isActive ? 'filter-col active' : 'filter-col'"
                  v-bind:key="index" v-on:click="sortNotes">{{ v.name }}</li>
            </ul>
            <div id="searchBox">
              <label>
                <input type="text" placeholder="">
              </label>
              <button id="searchBtn" v-on:click="searchNotes">搜索</button>
            </div>
          </div>
          <ul id="notes">

            <li v-for="(note) in noteMsg" v-bind:key="note[0]" class="oneNotes" >
              <div class="listDetail">
                <div class="noteTitle">
                  <div class="titleLink">
                    <router-link :to="'/detail/' + note[0] + '/'">{{ note[1] }}</router-link>
                  </div>

                  <div class="editNote">
                    <span><router-link :to="'/modification/' + note[0] + '/'">修改</router-link></span>
                    <span class="vLine">|</span>
                    <span><a class="deleteNote">删除</a></span>
                  </div>
                </div>
                <div class="noteFooter">
                  <span >
                    <img src="static/images/icon/label-icon.png" alt="图片加载失败">
                  </span>
                  <div class="footLabels">
                    <span v-for="(v, i) in note[2]" v-bind:key="i">{{ v }}</span>
                  </div>
                  <div class="footClick">
                    <span>阅读数：</span>
                    <span class="num">{{ note[4] }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div id="pagingBox">
            <ul class="pagination">
              <li class="pagingBtn pagingPre" v-on:click="getPrePage"><a href="#">&laquo;</a></li>
              <li v-for="(p, index) in pages" v-bind:class="p.isActive ? 'pagingBtnActive': 'pagingBtn'" v-on:click="choosePage" v-bind:key="index">
                <a href="#">{{ p.num }}</a></li>

              <li class="pagingBtn pagingNext" v-on:click="getNextPage"><a href="#">»</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'noteList',

  data () {
    return {
      sortBar: [{name: '推荐', isActive: true}, {name: '最新添加', isActive: false}],
      noteFirstMenu: [],
      noteMsg: [],
      pages: [],
      curPage: 1,
      keyword: '',
      generalScreen: 'recommend',
      secondaryClass: ''
    }
  },
  methods: {
    setPaging (pages) {
      // 设置分页状态
      this.pages.length = 0
      for (let j = 1; j < pages + 1; j++) {
        this.pages.push({num: j, isActive: false})
      }
      this.pages[this.curPage - 1].isActive = true
    },
    getNotesInfo (response) {
      // 设置当前页笔记信息
      this.noteFirstMenu = response.data.top_categorys
      let noteMsg = response.data.note_msg
      this.noteMsg.length = 0
      for (let i = 0; i < noteMsg.length; i++) {
        let labels = noteMsg[i][2].split('|').map(el => el.trim()).filter(item => item.trim() !== '')
        this.noteMsg.push([noteMsg[i][0], noteMsg[i][1], labels, noteMsg[i][3], noteMsg[i][4]])
      }
      this.setPaging(response.data.pages)
    },
    changeCondition (p, k, g, s) {
      this.curPage = p
      this.keyword = k
      this.generalScreen = g
      this.secondaryClass = s
    },
    rotation (e) {
      if (e.currentTarget.nextElementSibling.style.display !== 'block') {
        for (let i = 0; i < e.currentTarget.parentElement.parentElement.childNodes.length; i++) {
          e.currentTarget.parentElement.parentElement.childNodes[i].lastElementChild.style.display = 'none'
          e.currentTarget.parentElement.parentElement.childNodes[i].firstElementChild.lastElementChild.className = 'arrow'
        }
        e.currentTarget.nextElementSibling.style.display = 'block'
        e.currentTarget.lastElementChild.className = 'arrow arrowOpen'
      } else {
        e.currentTarget.nextElementSibling.style.display = 'none'
        e.currentTarget.lastElementChild.className = 'arrow'
      }
      // console.log(e.currentTarget)
    },
    flushNote () {
      // 刷新当前笔记列表
      this.common.postFunc(
        '/api/filter_col/',
        {
          curPage: this.curPage,
          keyword: this.keyword,
          generalScreen: this.generalScreen,
          secondaryClass: this.secondaryClass
        },
        this.getNotesInfo
      )
    },
    choosePage (e) {
      // 点击分页按钮
      this.changeCondition(e.target.innerText, '', 'recommend', '')
      this.flushNote()
    },
    getPrePage () {
      // 获取上一页
      if (this.curPage > 1) {
        this.curPage -= 1
        this.flushNote(this.curPage)
      }
    },
    getNextPage () {
      // 获取下一页
      if (this.curPage < this.pages.length) {
        this.curPage += 1
        this.flushNote(this.curPage)
      }
    },
    secondaryMenuFilter (e) {
      // 根据标签筛选笔记
      this.changeCondition(1, '', 'recommend', e.currentTarget.innerText)
      this.flushNote()
    },
    sortNotes (e) {
      // 点击排序条件进行排序
      for (let i = 0; i < this.sortBar.length; i++) {
        this.sortBar[i].isActive = this.sortBar[i].name === e.currentTarget.innerText
      }
      if (e.currentTarget.innerText === '推荐') {
        this.changeCondition(1, '', 'recommend', '')
      } else if (e.currentTarget.innerText === '最新添加') {
        this.changeCondition(1, '', 'latest', '')
      }
      this.flushNote()
    },
    searchNotes (e) {
      // 关键字搜索笔记
      let inputValObj = document.getElementById('searchBox')
      this.changeCondition(1, inputValObj.childNodes[0].childNodes[0].value, 'recommend', '')
      this.flushNote()
    }
  },
  mounted () {
    this.common.getFunc('/api/', this.getNotesInfo)
  }
}
</script>

<style scoped>

</style>

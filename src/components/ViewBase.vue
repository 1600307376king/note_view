<template>
  <div id="viewBase">
    <div id="topNav">
      <div id="topContainer">
        <div id="menuBlock">
          <ul>
            <li><a href="/">首页</a></li>
            <li><router-link :to="'/add/'">添加笔记</router-link></li>
            <li><a href="">我的计划</a></li>
            <li><a href="">标签管理</a></li>
          </ul>
        </div>

        <div id="loginBlock">
          <a href="">未登录</a>
        </div>

      </div>
    </div>
    <div id="allContent">
      <router-view/>
    </div>
    <div id="myFooter">
      <div id="filingNumber">
        <a href="http://www.beian.miit.gov.cn">浙ICP备19037818号-1</a>
      </div>
    </div>
  </div>
</template>

<script>
import NoteList from './NoteList'
import NoteDetail from './NoteDetail'
export default {
  name: 'viewBase',
  components: {NoteList, NoteDetail}
}
</script>

<style scoped>

</style>

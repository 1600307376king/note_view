<template>
  <div id="addNote" class="midContent">
    <div class="oneNote">
      <div class="noteProperty">
        <div class="propertyName">标题</div>
        <div class="propertyInput">
          <label>
            <input id="addNoteTitle" type="text" v-model="note_data.note_title">
          </label>
        </div>
      </div>
      <div class="noteProperty">
        <div class="propertyName">标签</div>
        <div class="propertyInput">
          <treeselect
            :default-expand-level="1"
            :multiple="true"
            :options="note_data.selectLabel"
            :flat="true"
            placeholder="请选择标签"
            style="width: 300px"/>
        </div>
      </div>
      <div class="noteProperty">
        <div class="propertyName">简介</div>
        <div class="propertyInput">
          <label>
            <textarea id="addInstructions" v-on:input="changeInputLen" v-model="note_data.note_instrument"></textarea>
          </label>
          <span class="maxInputText">{{ maxInputInstrument }}/200</span>
        </div>
      </div>
      <div id="addEditor" class="noteEditor">
        <mavon-editor style="min-height: 500px;z-index: 100" v-model="note_data.note_content" :toolbars="toolbars" ref=md />
      </div>
      <button id="addFootButton" class="FootButton" v-on:click="saveNote" type="button">保存</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addNote',
  data () {
    return {
      note_data: {
        note_title: '',
        note_labels: [],
        note_instrument: '',
        note_content: '',
        selectLabel: []
      },
      maxInputInstrument: 0,
      toolbars: {
        height: '800px',
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  methods: {
    saveNote () {
      let existsLabels = document.getElementsByClassName('vue-treeselect__multi-value-label')
      let tempLabels = []
      for (let i = 0; i < existsLabels.length; i++) {
        tempLabels.push(existsLabels[i].innerText)
      }
      this.note_data.note_labels = tempLabels
      this.note_data.note_content = this.$refs.md.d_render
      if (this.note_data.note_title !== '' &&
        (this.note_data.note_labels.length > 0 || this.note_data.note_instrument.length > 0) &&
        this.note_data.note_content !== '') {
        this.common.postFunc(
          '/add/',
          {
            note_title: this.note_data.note_title,
            existing_label: this.note_data.note_labels,
            note_instructions: this.note_data.note_instrument,
            str_content: this.note_data.note_content
          },
          this.common.clearInput
        )
      } else {
        alert('输入信息不完整，请重新确认')
      }
    },
    changeInputLen () {
      this.maxInputInstrument = this.note_data.note_instrument.length
    }
  },
  mounted () {
    this.common.getFunc('/add/', this.common.setSelectList, this.note_data.selectLabel)
  }
}
</script>

<style scoped>

</style>

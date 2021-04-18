<template>
  <div id="modificationNote" class="midContent">
    <div class="oneNote">
      <div class="noteProperty">
        <div class="propertyName">标题</div>
        <div class="propertyInput">
          <label>
            <input id="modNoteTitle" type="text" v-model="note_data.note_title">
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
        <div id="labelBar">
          <div class="newLabel" v-for="(v, i) in note_data.note_labels" v-bind:key="i">
            <span class="labelText">{{ v }}</span>
            <div v-on:click="removeCurLabel" class="closeSymbol">x</div>
          </div>
        </div>
      </div>
      <div class="noteProperty">
        <div class="propertyName">简介</div>
        <div class="propertyInput">
          <label>
            <textarea v-on:input="changeInputLen" id="modInstructions" v-model="note_data.note_introduction"></textarea>
          </label>
          <span class="maxInputText">{{ maxInputIntroduction }}/200</span>
        </div>
      </div>

      <div id="ModEditor" class="noteEditor">
        <!-- Tips: Editor.md can auto append a `<textarea>` tag -->
        <mavon-editor style="min-height: 500px;z-index: 100" v-model="note_data.note_content" :toolbars="toolbars" ref=md />
      </div>
      <button id="modFootButton" v-on:click="saveNote" class="FootButton" type="button">保存</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modificationNote',
  data () {
    return {
      note_data: {
        note_title: '',
        note_labels: [],
        note_introduction: '',
        note_content: '',
        selectLabel: []
      },
      maxInputIntroduction: 0,
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
    removeCurLabel (e) {
      this.note_labels.splice(this.note_labels.indexOf(e.currentTarget.previousElementSibling.innerHTML),
        1)
    },
    saveNote () {
      let existsLabels = document.getElementsByClassName('vue-treeselect__multi-value-label')
      let tempLabels = []
      for (let i = 0; i < existsLabels.length; i++) {
        tempLabels.push(existsLabels[i].innerText)
      }
      console.log(this.note_data.note_labels)
      this.note_data.note_labels = this.note_data.note_labels.concat(tempLabels)
      this.note_data.note_content = this.$refs.md.d_render
      if (this.note_data.note_title !== '' &&
        (this.note_data.note_labels.length > 0 || this.note_data.note_introduction.length > 0) &&
        this.note_data.note_content !== '') {
        this.common.postFunc(
          '/modification/' + this.$route.params.id + '/',
          {
            note_title: this.note_data.note_title,
            existing_label: this.note_data.note_labels,
            note_instructions: this.note_data.note_introduction,
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
    this.common.getFunc('/modification/' + this.$route.params.id + '/',
      this.common.setModificationInfo, this.note_data)
  }
}
</script>

<style scoped>

</style>

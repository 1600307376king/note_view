import axios from 'axios'

let tools = {}
tools.addNum = function (x, y) {
  return x * y
} // 还可以在这个文件里面添加多个函数

const getCookie = function (cname) {
  let name = cname + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim()
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
  }
  return ''
}

const postFunc = function (specialUrl, data, specialFunc) {
  // post请求
  axios({
    method: 'post',
    url: specialUrl,
    headers: {'X-CSRFToken': this.getCookie('csrf_token')},
    data: data
  })
    .then(response => {
      specialFunc(response)
    })
    .catch(function (error) { // 请求失败处理
      console.log(error)
    })
}

const clearInput = function () {
  alert('保存成功')
  location.reload()
}

const setSelectList = function (labelData, selectLabel) {
  let labels = labelData.data.category
  for (let i = 0; i < labels.length; i++) {
    let childLs = []
    for (let j = 0; j < labels[i].subs.length; j++) {
      childLs.push({
        id: labels[i].subs[j].id,
        label: labels[i].subs[j].title
      })
    }
    selectLabel.push({
      id: labels[i].id,
      label: labels[i].title,
      children: childLs
    })
  }
}

const setModificationInfo = function (res, setData) {
  setSelectList(res, setData.selectLabel)
  setData.note_title = res.data.note_cur_msg[0]
  setData.note_labels = res.data.note_cur_msg[1].split('|').map(el => el.trim()).filter(item => item.trim() !== '')
  setData.note_instrument = res.data.note_cur_msg[2]
  setData.note_content = res.data.note_cur_msg[3]
}

const getFunc = function (specialUrl, specialFunc, obj) {
  // get请求
  axios
    .get(specialUrl)
    .then(response => {
      specialFunc(response, obj)
    })
    .catch(function (error) { // 请求失败处理
      console.log(error)
    })
}

const printOne = function () {
  console.log(1)
}

export default {
  getFunc,
  postFunc,
  getCookie,
  printOne,
  setSelectList,
  setModificationInfo,
  clearInput
}

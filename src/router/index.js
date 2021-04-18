import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import ViewBase from '../components/ViewBase'
import NoteDetail from '../components/NoteDetail'
import NoteList from '../components/NoteList'
import AddNote from '../components/AddNote'
import ModificationNote from '../components/ModificationNote'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ViewBase',
      component: ViewBase,
      children: [
        {
          path: '/',
          name: 'NoteList',
          component: NoteList
        },
        {
          path: '/detail/:id(\\d+)/',
          name: 'NoteDetail',
          component: NoteDetail
        },
        {
          path: '/add/',
          name: 'AddNote',
          component: AddNote
        },
        {
          path: '/modification/:id(\\d+)/',
          name: 'modificationNote',
          component: ModificationNote
        }
      ]
    }
  ]
})

import Hello from '@/components/Hello'
import p1vue from '@/components/p1vue'

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },{
      path: '/p1vue',
      name: 'p1vue',
      component: p1vue
    }
  ]
})
import Vue from 'vue'
import App from './App'

import chat from './pages/chat/chat.vue'
Vue.component('chat',chat)

import contacts from './pages/contacts/contacts.vue'
Vue.component('contacts',contacts)

import discover from './pages/discover/discover.vue'
Vue.component('discover',discover)

import profile from './pages/profile/profile.vue'
Vue.component('profile',profile)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

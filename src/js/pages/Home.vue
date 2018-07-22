<template>
    <main class="home">
        <div class="form">
            <sidebar>
                <search @change="search"/>
               <contact @click="changeActive(c)" v-for="c in filteredContacts" :key="c.email" :contact="c" :active="active && c.id === active.id"/>
            </sidebar>
            <div class="chat" v-if="active">
                <v-header :contact="active"/>
                <div class="chat__messages-box">
                    <template v-if="active.messages">
                        <message v-for="m, index in active.messages" :message="m" :key="`message${index}`"/>
                    </template>
                </div>
                <v-textarea @send="send"/>
            </div>
        </div>
    </main>
</template>

<script>
    import Sidebar from '../components/Sidebar'
    import Contact from '../components/Contact'
    import Search from '../components/Search'
    import VHeader from '../components/Header'
    import Message from '../components/Message'
    import VTextarea from '../components/Textarea'

    import io from 'socket.io-client'

    export default {
        components: {
            Sidebar,
            Contact,
            Search,
            VHeader,
            Message,
            VTextarea
        },
        data() {
            return {
                socket: io('localhost:3000'),
                active: null,
                contacts: [],
                filteredContacts: [],
                filter: ''
            }
        },
        async mounted() {
            this.socket.emit('conn', localStorage.getItem('id'))
            this.socket.on('conn', ({user_id, sockets, socket_id}) => {
                this.$auth.user.socket_id = socket_id
                // const contact = this.contacts.find(c => c.id === parseInt(user_id))
                // if (contact) {
                //     contact.online = true
                //     contact.socket_id = socket_id
                // }
                sockets.forEach(s => {
                    const cont = this.contacts.find(c => c.socket_id === s)
                    console.log(cont)
                    if (cont)
                        cont.online = true
                })
                this.search()
            })
            this.socket.on('connected', ({user_id, socket_id}) => {
                const contact = this.contacts.find(c => c.id ===  parseInt(user_id))
                contact.online = true
                contact.socket_id = socket_id
                this.search()
            })
            this.socket.on('disconnected', user_id => {
                const contact = this.contacts.find(c => c.id === parseInt(user_id))
                if (contact) {
                    contact.online = false
                    contact.last_seen = Date.now()
                    this.search()
                }
            })
            this.socket.on('message', msg => {
                const contact = this.contacts.find(c => c.id === msg.from_id)
                if (!contact.messages) contact.messages = []
                contact.messages = [...contact.messages, msg]
                this.search()
                if (this.active.id === contact.id)
                    this.active = {...contact}
            })
            this.socket.on('messages', ({from_id, to_id, messages}) => {
                if (from_id !== this.$auth.user.id) return
                this.contacts.find(c => c.id === to_id).messages = messages
                this.active = {...this.active}
            })
            try {
                const { data } = await this.$axios.get('/api/users')
                // user не всегда успевает прийти
                this.contacts = data.filter(c => c.email !== this.$auth.user.email)
                this.search()
            } catch (e) {
                console.error(e)
            }
        },
        methods: {
            send(text) {
                if (!this.active.messages)
                    this.active.messages = []
                const from_id = this.$auth.user.id
                const to_id = this.active.id
                this.active.messages = [...this.active.messages, {
                    text,
                    from_id,
                    to_id,
                    created_at: Date.now()
                }]
                this.search()
                this.socket.emit('message', ({msg: text, from_id, to_id}))
                this.active = {...this.active}
                // const chatEl = document.getElementsByClassName('chat__messages-box')[0]
                // chatEl.scrollTop = chatEl.scrollHeight
            },
            search(v) {
                if (v)
                    this.filter = v.toLowerCase()
                else if (v !== undefined)
                    this.filter = ''
                this.filteredContacts = this.contacts.filter(c => c.name.toLowerCase().startsWith(this.filter))
            },
            changeActive(contact) {
                this.active = contact
                this.socket.emit('getMessages', {from_id: this.$auth.user.id, to_id: this.active.id})
            }
        }
    }
</script>

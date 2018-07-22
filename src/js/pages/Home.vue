<template>
    <main class="home">
        <div class="form">
            <sidebar>
                <search @change="search"/>
               <contact @click="active = c" v-for="c in filteredContacts" :key="c.email" :contact="c" :active="c === active"/>
            </sidebar>
            <div class="chat" v-if="active">
                <v-header :contact="active"/>
                <div class="chat__messages-box">
                    <template v-if="active.messages">
                        <message v-for="m, index in active.messages" :message="{sender: m.sender, text: m.text}" :key="`message${index}`"/>
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
            this.socket.on('message', ({msg, email}) => {
                const contact = this.contacts.find(c => c.email === email)
                if (!contact.messages) contact.messages = []
                contact.messages = [...contact.messages, {
                    text: msg,
                    sender: email
                }]
                this.search()
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
                this.active.messages = [...this.active.messages, {
                    text,
                    sender: this.$auth.user.email
                }]
                this.search()
                this.socket.emit('message', ({msg: text, email: this.$auth.user.email}))
            },
            search(v) {
                if (v)
                    this.filter = v.toLowerCase()
                else if (v !== undefined)
                    this.filter = ''
                this.filteredContacts = this.contacts.filter(c => c.name.toLowerCase().startsWith(this.filter))
            }
        }
    }
</script>

<template>
    <main class="home">
        <div class="form">
            <sidebar>
                <search />
               <contact @click="active = index" v-for="c, index in contacts" :key="c.email" :contact="c" :active="index === active"/>
            </sidebar>
            <div class="chat" v-if="contacts[active]">
                <v-header :contact="contacts[active]"/>
                <div class="chat__messages-box">
                    <template v-if="contacts[active].messages">
                        <message v-for="m, index in contacts[active].messages" :message="{sender: m.sender, text: m.text}" :key="`message${index}`"/>
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
                active: 0,
                contacts: []
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
                this.contacts = [...this.contacts]
            })
            try {
                const { data } = await this.$axios.get('/api/users')
                this.contacts = data
            } catch (e) {
                console.error(e)
            }
        },
        methods: {
            send(text) {
                const contact = this.contacts[this.active]
                if (!contact.messages)
                    contact.messages = []
                contact.messages = [...contact.messages, {
                    text,
                    sender: this.$auth.user.email
                }]
                this.contacts = [...this.contacts]
                this.socket.emit('message', ({msg: text, email: this.$auth.user.email}))
            }
        }
    }
</script>

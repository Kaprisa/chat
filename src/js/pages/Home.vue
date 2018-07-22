<template>
    <main class="home">
        <div class="form">
            <sidebar>
                <search />
               <contact @click="active = index" v-for="c, index in contacts" :key="c.name" :contact="c" :active="index === active"/>
            </sidebar>
            <div class="chat">
                <v-header :contact="contacts[active]"/>
                <div class="chat__messages-box">
                    <message v-for="m, index in messages" :message="{sender: m.sender, text: m.text}" :key="`message${index}`"/>
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
                contacts: [],
                messages: []
            }
        },
        async mounted() {
            this.socket.on('message', (text) => {
                this.messages.push({
                    text,
                    sender: 'other'
                })
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
                this.messages.push({
                    text,
                    sender: 'i'
                })
                this.socket.emit('message', text)
            }
        }
    }
</script>

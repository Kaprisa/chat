<template>
    <form class="form auth">
        <h2 class="title">{{ isLogin ? 'Авторизация' : 'Регистрация'}}</h2>
        <photo-uploader v-if="!isLogin" @upload-file="f => user.image = f" :filename="user.image"/>
        <form-field placeholder="Введите ваше имя" v-if="!isLogin" :value="user.email" @value-change="v => user.name = v" />
        <form-field placeholder="Введите ваш E-Mail" :value="user.email" @value-change="v => user.email = v" />
        <form-field placeholder="Введите ваш пароль" type="password" :value="user.password" @value-change="v => user.password = v" />
        <button @click.prevent="submit" class="btn">{{ isLogin ? 'Войти' : 'Зарегистрироваться'}}</button>
        <span @click="$router.push(`/${isLogin ? 'register' : 'login'}`)" class="auth__bottom-text">{{ isLogin ? 'Еще не зарегистрированы? Тогда вам на страницу регистрации.' : 'Уже зарегистрированы? Тогда вам на страницу авторизации.'}}</span>
        <snackbar @change-visible="snackbar.visible = !snackbar.visible" :options="snackbar"/>
    </form>
</template>

<script>
    import FormField from '../components/FormField'
    import Snackbar from '../components/Snackbar'
    import PhotoUploader from '../components/PhotoUploader'
    export default {
        components: {
            FormField,
            Snackbar,
            PhotoUploader
        },
        data() {
            return {
                isLogin: this.$route.meta.type === 'login',
                user: {
                    image: 'person.jpeg'
                },
                snackbar: {},
                emailValidator: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            }
        },
        methods: {
            async submit() {
                if (this.$route.meta.type === 'register') {
                    const invalid = this.check()
                    if (invalid) {
                        this.snackbar = {
                            visible: true,
                            text: invalid,
                            error: true
                        }
                        return
                    }
                }
               try {
                   const msg = await this.$auth.auth(this.user, this.$route.meta.type)
                   this.snackbar = {
                       visible: true,
                       text: msg,
                       error: false
                   }
                   setTimeout(_ => this.$router.push(`/${this.$route.meta.redirect}`), 1000)
               } catch (e) {
                   this.snackbar = {
                       visible: true,
                       text: e,
                       error: true
                   }
               }
                // const snack = await wrap(this.$axios.post, `/api/${this.$route.meta.type}`, this.user)
                // this.snackbar = snack[0]
                // if (snack.length > 1) {
                //     this.clear()
                //     if (snack[1].token)
                //         localStorage.setItem('token', snack[1].token)
                //     setTimeout(_ => this.$router.push(`/${this.$route.meta.redirect}`), 1000)
                // }
            },
            clear() {
                this.user = {}
            },
            checkEmpty(field) {
                return !field || field === ''
            },
            check() {
                const { password, email, name } = this.user
                if ([password, email, name].some(f => this.checkEmpty(f)))
                    return 'Все поля обязательны для заполнения'
                if (password.length < 5)
                    return 'Пароль должен содержать не менее 5 символов'
                if (!this.emailValidator.test(email))
                    return 'Невалидный E-Mail'
                return null
            }
        }
    }
</script>

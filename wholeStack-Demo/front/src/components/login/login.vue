<template>
    <div class="player">
        <div class="username">
            <span>用户名：</span>
            <input type="text">
        </div>
        <div class="password">
            <span>密码    ：</span>
            <input type="text">
        </div>
        <div>
            <button @click="login">登录</button>
        </div>
        <div>-------------------------------------------------</div>
        <div class="username">
            <span>用户名：</span>
            <input v-model="username" type="text">
        </div>
        <div class="password">
            <span>密码    ：</span>
            <input v-model="password" type="text">
        </div>
        <div>
            <button @click="register">注册</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login() {
                console.log('登录')
            },
            register() {
                // console.log('注册被点击了')
                this.$http({
                    method: 'post',
                    url: this.$util.baseUrl + '/users/userRegister',
                    data: {
                        username: this.username.trim(),
                        userpwd: this.password.trim()
                    }
                }).then(res => {
                    console.log(res)
                    if(res.data.code === '80000'){
                        this.$toast(res.data.mess)
                    }
                })
                // console.log('注册')
            }
        },
        watch: {
            username(newId) {
                console.log(newId)
            }
        }
    }
</script>


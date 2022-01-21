<script setup lang="ts">
import Input from '@/components/form/input.vue'
import Checkbox from '@/components/form/checkbox.vue'
import { useStore } from 'vuex'
import { LoginError, LoginForm } from '@/api/auth'
import { AxiosResponse } from 'axios'
import { reactive } from 'vue'
import router from '@/router'

const store = useStore()

const form: LoginForm = {
    email: '',
    password: '',
    remember_me: false
}

const state = reactive({
    loading: false
})

const loadInputs = () => {
    const inputs = {
        email: {
            id: 'login-input-email',
            name: 'email',
            type: 'text',
            placeholder: 'Enter your email',
            value: '',
            error: false,
            message: ''
        },
        password: {
            id: 'login-input-password',
            name: 'password',
            type: 'password',
            placeholder: 'Enter your password',
            value: '',
            error: false,
            message: ''
        },
        remember_me: {
            id: 'login-input-remember-me',
            name: 'remember_me',
            label: 'Remember me',
            value: false,
            error: false,
            message: ''
        }
    }

    return inputs;
}

const inputs = reactive(loadInputs());

const login = () => {
    store.dispatch('loginUser', form);
    state.loading = true;
    store.subscribe(mutation => {
        if (mutation.type === 'setLogin') {
            state.loading = false;
            router.push('/');
            store.dispatch('getContextUser');
        }
        if (mutation.type === 'setLoginError') {
            const { data } = mutation.payload as AxiosResponse<LoginError>;
            state.loading = false;
            if (data.email) {
                inputs.email = {
                    ...inputs.email,
                    error: true,
                    message: data.email[0],
                }
            }
            if (data.password) {
                inputs.password = {
                    ...inputs.password,
                    error: true,
                    message: data.password[0],
                }
            }

            if (data.non_field_errors) {

            }
        }
    })
}


store.commit('setLogout');

</script>

<template>
    <div class="container" style="max-width:30rem">
        <div class="card">
            <div class="card-content">
                <h3 class="title is-3">Login</h3>
                <Input :config="inputs.email" v-model="form.email" />
                <Input :config="inputs.password" v-model="form.password" />
                <div class="columns">
                    <div class="column">
                        <Checkbox :config="inputs.remember_me" v-model="form.remember_me" />
                    </div>
                    <div class="column" style="text-align: right;">
                        <router-link to="/recover-password">Forgot your password?</router-link>
                        <br />
                        <router-link to="/register">Create new account</router-link>
                    </div>
                </div>
                <div class="buttons" style="margin-top:1rem;justify-content: space-around;">
                    <button
                        type="button"
                        class="button is-primary is-large"
                        :class="{ 'is-loading': state.loading }"
                        @click="login()"
                    >Login</button>
                </div>
            </div>
        </div>
    </div>
</template>


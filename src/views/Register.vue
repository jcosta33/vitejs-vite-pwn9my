<script setup lang="ts">
import Input from '@/components/form/input.vue'
import Select from '@/components/form/select.vue'
import Checkbox from '@/components/form/checkbox.vue'

import { createUser } from '@/api/auth'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const state = reactive({
    terms: false,
    loading: false
})
const form = {
    email: '',
    name: '',
    password: '',
    confirm_password: '',
    phone_number: '',
    language: '',
}

const passwordsMatch = () => {
    if (form.confirm_password !== '' && form.password !== form.confirm_password) {
        inputs.confirm_password = {
            ...inputs.confirm_password,
            message: "Passwords don't match",
            error: true
        }
        return false;
    } else {
        inputs.confirm_password = {
            ...inputs.confirm_password,
            message: "",
            error: false
        }
        return true;
    }
}

const loadInputs = () => {
    const inputs = {
        email: {
            id: 'login-input-email',
            name: 'email',
            type: 'text',
            label: 'Email',
            placeholder: 'elon.musk@tesla.com',
            info: 'Mandatory',
            error: false,
            message: '',
            value: ''
        },
        name: {
            id: 'login-input-name',
            name: 'name',
            type: 'text',
            label: 'Name',
            placeholder: 'Elon Musk',
            error: false,
            message: '',
            info: 'Mandatory',
            value: ''
        },
        phone_number: {
            id: 'login-input-phone-number',
            name: 'phone_number',
            type: 'text',
            error: false,
            message: '',
            label: 'Phone number',
            placeholder: '918487334',
            value: ''
        },
        language: {
            id: 'login-input-phone-number',
            name: 'phone_number',
            type: 'text',
            label: 'Prefered language',
            info: 'Mandatory',
            error: false,
            message: '',
            value: 'PT',
            options: [{
                label: 'PT',
                value: 'PT',
                checked: true,
            }, {
                label: 'EN',
                value: 'EN',
            }]
        },
        password: {
            id: 'login-input-password',
            name: 'password',
            type: 'password',
            label: 'Password',
            info: 'Mandatory',
            error: false,
            onInput: passwordsMatch,
            message: '',
            value: '',
        },
        confirm_password: {
            id: 'login-input-confirm-password',
            name: 'confirm_password',
            type: 'password',
            info: 'Mandatory',
            value: '',
            onInput: passwordsMatch,
            error: false,
            message: '',
            label: 'Confirm password',
        },
        terms: {
            id: 'login-input-terms',
            name: 'terms',
            info: 'Mandatory',
            error: false,
            value: false,
            message: '',
            label: 'I agree to lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, fugit.',
        }
    }

    return inputs;
}

const inputs = reactive(loadInputs());

const register = () => {
    state.loading = true;
    createUser(form).then(response => {
        router.push('/login');
        state.loading = false;
    }).catch(err => {

        const { response } = err;
        const { data } = response;

        state.loading = false;

        if (data.email) {
            inputs.email = {
                ...inputs.email,
                error: true,
                message: data.email[0],
            }
        }
        if (data.name) {
            inputs.name = {
                ...inputs.name,
                error: true,
                message: data.name[0],
            }
        }
        if (data.language) {
            inputs.language = {
                ...inputs.language,
                error: true,
                message: data.language[0],
            }
        }
        if (data.password) {
            inputs.password = {
                ...inputs.password,
                error: true,
                message: data.password[0],
            }
        }
        if (data.phone_number) {
            inputs.phone_number = {
                ...inputs.phone_number,
                error: true,
                message: data.phone_number[0],
            }
        }

        if (data.detail) {
            // add popup
        }

        if (data.non_field_errors) {

        }
    })
}

</script>

<template>
    <div class="container is-small">
        <div class="card">
            <div class="card-content">
                <h3 class="title is-3">Register</h3>

                <div class="columns">
                    <div class="column">
                        <Input :config="inputs.email" v-model="form.email" />
                        <Input :config="inputs.password" v-model="form.password" />
                        <Input :config="inputs.confirm_password" v-model="form.confirm_password" />
                    </div>
                    <div class="column">
                        <Input :config="inputs.name" v-model="form.name" />
                        <Input :config="inputs.phone_number" v-model="form.phone_number" />
                        <Select :config="inputs.language" v-model="form.language" />
                    </div>
                </div>
                <Checkbox :config="inputs.terms" v-model="state.terms" />
                <div class="buttons" style="margin-top:1rem;justify-content: space-around;">
                    <button
                        type="button"
                        class="button is-primary is-large"
                        :class="{ 'is-loading': state.loading }"
                        :disabled="!state.terms || !passwordsMatch()"
                        @click="register()"
                    >Register</button>
                </div>
            </div>
        </div>
    </div>
</template>

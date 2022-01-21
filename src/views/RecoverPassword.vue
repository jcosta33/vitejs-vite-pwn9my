<script setup lang="ts">
import { resetPassword } from '@/api/auth'
import Input from '@/components/form/input.vue'
import { useStore } from 'vuex'

const store = useStore()

const form = {
    email: '',
    password: ''
}

const loadInputs = () => {
    const inputs = {
        email: {
            id: 'login-input-email',
            name: 'email',
            type: 'text',
            label: 'Email',
            placeholder: 'elon.musk@tesla.com',
            value: ''
        }
    }

    return inputs;
}

const inputs = loadInputs();

const recoverPassword = () => {
    resetPassword(form).then(response => {

    }).catch(err => {

    })
}


</script>

<template>
    <div class="container" style="max-width:30rem">
        <div class="card">
            <div class="card-content">
                <h3 class="title is-3">Recover password</h3>
                <Input :config="inputs.email" v-model="form.email" />
                <div class="buttons" style="margin-top:1rem;">
                    <button
                        type="button"
                        class="button is-primary"
                        @click="recoverPassword()"
                    >Send password recovery link</button>
                </div>
            </div>
        </div>
    </div>
</template>


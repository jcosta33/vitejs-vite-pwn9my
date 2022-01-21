<script setup lang="ts">
import { getUsers, User } from '@/api/auth';
import { ref } from 'vue';
import UserCard from '@/partials/UserCard.vue';
import { IUserCard } from '@/partials';

let users = ref([] as User[]);

getUsers().then(response => {
    users.value = response.data.results;
})

const makeCard = (user: User): IUserCard => {
    return {
        name: user.name,
        detail: user.email,
        description: user.phone_number,
    }
}

</script>

<template>
    <div class="card">
        <div class="card-content">
            <h1 class="title is-1">Exponor Hub</h1>
            <h3 class="subtitle">Welcome to the Exponor Hub home</h3>
            <hr>
            <div class="columns">
                <div class="column is-4" v-for="user in users">
                    <UserCard :config="makeCard(user)" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
a {
    color: #42b983;
}

label {
    margin: 0 0.5em;
    font-weight: bold;
}

code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
}
</style>

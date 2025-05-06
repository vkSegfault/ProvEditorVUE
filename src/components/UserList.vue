<script setup>
import { ref, defineProps, onMounted, reactive } from 'vue'
import { useStore } from 'vuex';
import axios from 'axios';
import User from './User.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const store = useStore();

const state = reactive({
    users: [],
    filteredUsers: []
});

// store all users in a state variable
onMounted(async () => {

    // fetch existing users
    try {
        // TODO - fix in backend path /users/users (?)
        const response = await axios.get('/proxy/api/v1/users/users',
        {
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Authorization': store.state.access_token
            }
        });
        console.log(response)
        state.users = response.data;
    } catch (error) {
        console.error('Error fetching users: ', error);
    } finally {
        state.isLoading = false;
    }

    // glue roles to exists users
    try {
        state.users.forEach(async user => {
            // 
            const response = await axios.get(`/proxy/api/v1/auth/roles/${user.userName}`,
            {
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json',
                    'Authorization': store.state.access_token
                }
            });
            console.log(response)
            user.roles = response.data
        });
    } catch (error) {
        console.error('Error fetching roles: ', error);
    } finally {
        state.isLoading = false;
        console.log(state.users);
    }

});

const input = reactive({
  value: ''
});

let input2 = ref("");

function filterUsers() {
    let filteredUsers = state.users.filter((user) =>
        user.userName.toLowerCase().includes(input.value.toLowerCase())
        // console.log("User is: " + user.userName)
    );
    console.log(input.value)

    console.log("Filtered users: " + filteredUsers[0].userName);
    console.log("Raw users: " + state.users[0].userName);
    console.log("There are " + filteredUsers.length + " that matches search criteria");

    state.filteredUsers = filteredUsers;

    return filteredUsers;
}

</script>

<template>
    <section class="bg-blue-50 px-8 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">

                <form class="max-w-md mx-auto" @submit.prevent="filterUsers"> 
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" v-model="input.value" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search users..." required />
                        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>

            </h2>

            <!-- Show loading spinner while state.isLoading is true -->
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader />
            </div>

            <ul role="list" class="grid grid-cols-1 divide-y divide-gray-600">
                <div class="justify-between gap-x-6 py-5">
                    <!-- "asset" is prop from Asset.vue -->
                    <!-- <User v-for="user in state.users" :key="user.userName" :user="user" > -->
                    <!-- <User v-for="user in state.users" :key="user.userName" :user="user" > -->
                        <!-- {{ job.title }} -->
                    <!-- </User> -->
                    <div class="item user" v-for="user in state.filteredUsers">
                        <User :key="user.userName" :user="user"></User>
                    </div>
                </div>
            </ul>

        </div>
    </section>

</template>
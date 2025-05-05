<script setup>
import { ref, defineProps, onMounted, reactive } from 'vue'
import { useStore } from 'vuex';
import axios from 'axios';
import User from './User.vue';

const store = useStore();

const state = reactive({
    users: []
});

onMounted(async () => {

    // fetch existing users
    try {
        // TODO - fix in backend path to /users/users (?)
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

</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Users
            </h2>

            <!-- Show loading spinner while state.isLoading is true -->
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- "asset" is prop from Asset.vue -->
                <User v-for="user in state.users" :key="user.userName" :user="user" >  
                    <!-- {{ job.title }} -->
                </User>
            </div>
        </div>
    </section>
</template>
// Composition API - implicit exporting
<script setup>
import { onMounted, ref } from 'vue';
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';


// using ref() allows reactive variables (we can modify them in methods)
const title = 'Vue Finance Main Page';
const userActive = ref(true);
const userStatus = ref('pending');  // active|pending|blocked
const finAssets = ref(['Stock', 'Bond', 'Invest Fund']);
const link = 'https://vksegfault.github.io';
const newFinAsset = ref('...add');
const httpResponse = ref('NOT CALLED');

const toggleStatus = () => {
    if (userStatus.value === 'pending') {
        userStatus.value = 'active';
    } else if(userStatus.value === 'active') {
        userStatus.value = 'pending';
    } else {

    }
};

const addFinAsset = () => {
    if (newFinAsset.value.trim() !== '') {
        finAssets.value.push(newFinAsset.value);
        newFinAsset.value = '';
    }
};

const deleteFinAsset = (index) => {
    finAssets.value.splice(index, 1);
};

// built-in wrapper methods (we put our custom methods inside - they will be executed based on the wrapper)
// onMounted() for HTTP requests
onMounted(async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        httpResponse.value = data;
    } catch (error) {
        console.log('Error fetching GET request');
        httpResponse.value = 'ERROR HTTP GET';
    }
})

</script>

<template>
    <nav class="bg-gradient-to-r from-gray-200 to-green-600 border-b border-green-500">
        <Navbar />
        <RouterView />
    </nav>

    <!-- <h1 class="text-3xl">Vue Finance</h1>
    <h2>{{ title }}</h2>

    <p v-if="userActive">User is active</p>
    <p v-else>User is blocked</p>

    <p v-if="userStatus === 'active'">User status: {{ userStatus }}</p>
    <p v-else-if="userStatus === 'pending'">User status: {{ userStatus }}</p>

    <h3>Finance assets:</h3>
    <ul>
        <li v-for="(asset, index) in finAssets" :key="asset">
            <span>
                {{ asset }}
            </span>
            <button @click="deleteFinAsset(index)">x</button>
        </li>
    </ul>

    <a v-bind:href="link">Click for vkSegfault page</a>
    <br>
    <a :href="link">Click for Google</a>
    <br>

    <button v-on:click="toggleStatus">Change Status</button>

    <form @submit.prevent="addFinAsset">
        <label for="newFinAsset">Add Finance Asset: </label>
        <input type="text" id="newFinAsset" name="newFinAsset" v-model="newFinAsset" />
        <button type="submit">Submit</button>
    </form>

    <p>HTTP GET:</p>
    <p>{{ httpResponse }}</p> -->
</template>

// Options API
<!-- <script>
// we must export any data that we want to use in <template>
export default {
    data() {
        return {
            title: 'Vue Finance Main Page',
            userActive: true,  // true|false
            userStatus: 'pending',  // active|pending|blocked
            finAssets: ['Stock', 'Bond', 'Invest Fund'],
            link: 'https://vksegfault.github.io'
        }
    },

    methods: {
        toggleStatus() {
            if (this.userStatus === 'pending') {
                this.userStatus = 'active'
            } else if(this.userStatus === 'active') {
                this.userStatus = 'pending'
            } else {

            }
        }
    }
}
</script> -->
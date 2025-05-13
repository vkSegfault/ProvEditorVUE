<script setup>
import { ref, defineProps, onMounted, reactive } from 'vue'
import Asset from './Asset.vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { useStore } from 'vuex';


const store = useStore();

const props = defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
})

// const jobsJson = ref(JobDataJson);
// const jobsJson = ref([]);  // <-- most stick to this approach
const state = reactive({
    provinces: [],
    isLoading: true,
    limit: props.limit,
    showButton: props.showButton
});

onMounted(async () => {
    try {
        const response = await axios.get('/proxy/api/v1/provinces',
        {
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Authorization': store.state.access_token
            }
        });
        console.log(response)
        state.provinces = response.data;
    } catch (error) {
        console.error('Error fetching provinces: ', error);
    } finally {
        state.isLoading = false;
    }
});


const viewAllProvinces = async () => {
    state.limit = 100
    state.showButton = false
}

</script>

<template>

    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
                <h2 class="col-start-2 col-span-1 text-3xl font-bold text-green-500 mb-6 text-center my-4">
                    Browse Provinces
                </h2>
                <button @click="viewAllProvinces"
                    class="col-span-1 min-w-60 max-w-lg my-4 justify-self-end bg-gray-600 hover:bg-gray-700 text-white text-center rounded-xl"
                    >Download as JSON <i class="mx-2 pi pi-download text-yellow-500" style="font-size: 1.1rem"></i>
                </button>
            </div>

            <!-- Show loading spinner while state.isLoading is true -->
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader />
            </div>

            <!-- Show asset listing when done loading -->
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- "asset" is prop from Asset.vue -->
                <Asset v-for="province in state.provinces.slice(0, state.limit || state.provinces.length)" :key="province.provinceName" :province="province" >  
                    <!-- {{ job.title }} -->
                </Asset>
            </div>
        </div>
    </section>

    <section v-if="state.showButton">
        <button @click="viewAllProvinces"
            class="m-auto min-w-80 max-w-lg my-10 px-6 block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
            >View All Provinces
        </button>
      <!-- <RouterLink
        to="/assets"
        class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Assets</RouterLink
      > -->
    </section>

</template>
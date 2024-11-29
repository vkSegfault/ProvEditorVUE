<script setup>
import { ref, defineProps, onMounted, reactive } from 'vue'
import Asset from './Asset.vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'


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
    assets: [],
    isLoading: true,
    limit: props.limit,
    showButton: props.showButton
});

onMounted(async () => {
    try {
        const response = await axios.get('/proxy/api/v1/province');
        console.log(response)
        state.assets = response.data;
    } catch (error) {
        console.error('Error fetching assets', error);
    } finally {
        state.isLoading = false;
    }
});


const viewAllAssets = async () => {
    state.limit = 100
    state.showButton = false
}

</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Assets
            </h2>

            <!-- Show loading spinner while state.isLoading is true -->
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader />
            </div>

            <!-- Show asset listing when done loading -->
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- "asset" is prop from Asset.vue -->
                <Asset v-for="asset in state.assets.slice(0, state.limit || state.assets.length)" :key="asset.id" :asset="asset" >  
                    <!-- {{ job.title }} -->
                </Asset>
            </div>
        </div>
    </section>

    <section v-if="state.showButton">
        <button @click="viewAllAssets"
            class="m-auto min-w-80 max-w-lg my-10 px-6 block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
            >View All Assets
        </button>
      <!-- <RouterLink
        to="/assets"
        class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Assets</RouterLink
      > -->
    </section>

</template>
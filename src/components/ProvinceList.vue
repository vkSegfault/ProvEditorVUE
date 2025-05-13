<script setup>
import { ref, defineProps, onMounted, reactive } from 'vue'
import Province from './Province.vue';
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

const downloadAllProvinces = async () => {
    const blob = new Blob([JSON.stringify(state.provinces)], { type: "text/json" });
    const fileURL = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = fileURL;
    downloadLink.download = "provinces.json";
    document.body.appendChild(downloadLink);
    downloadLink.click();

    downloadLink.remove()
}

const uploadProvincesGitlab = async () => {
    // TODO
    // implement endpoint on backend side to do so, FE should not cate about handling it, just call endpoit
}

</script>

<template>

    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
                <h2 class="col-start-2 col-span-1 text-3xl font-bold text-green-500 mb-6 text-center my-4">
                    Browse Provinces
                </h2>

                <div class="col-span-1 justify-self-end">
                    <button @click="downloadAllProvinces"
                        class="min-w-28 min-h-10 mx-4 my-4 bg-gray-600 hover:bg-gray-700 text-white text-center rounded-xl"
                        >JSON<i class="mx-2 pi pi-download text-yellow-500" style="font-size: 1.1rem"></i>
                    </button>
                    <button @click="uploadProvincesGitlab"
                        class="min-w-28 min-h-10 my-4 bg-gray-600 hover:bg-gray-700 text-white text-center rounded-xl"
                        >Github<i class="mx-2 pi pi-sync text-yellow-500" style="font-size: 1.1rem"></i>
                    </button>
                </div>


            </div>

            <!-- Show loading spinner while state.isLoading is true -->
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader />
            </div>

            <!-- Show province listing when done loading -->
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- "province" is prop from Province.vue -->
                <Province v-for="province in state.provinces.slice(0, state.limit || state.provinces.length)" :key="province.provinceName" :province="province" >  
                    <!-- {{ job.title }} -->
                </Province>
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
<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { reactive, onMounted } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import axios from 'axios';
import BackButton from './BackButton.vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';
import dayjs from 'dayjs';


const store = useStore();

// the problem here is that we execute this component via Router Link/View only so we can't pass whole object as prop
// we only get id from route which is part of url
const props = defineProps({
    asset: Object
});

const route = useRoute();
const router = useRouter();
const toast = useToast();

const provinceName = route.path.split('/')[2];  // route.path return whole path so e.g.: 'province/Masovia'
// const assetType = route.params.type.toLowerCase();
console.log("Route params + Route path: " + route.params + route.path + provinceName)

const state = reactive({
  province: {},
  isLoading: true
})

const deleteAsset = async () => {
  try {
    const confirm = window.confirm('Do you want to delete this Province?');
    if (confirm) {
      await axios.delete(`/proxy/province/${provinceName}`);
      toast.success('Asset Deleted Successfully');
      router.push('/assets');
    }
  } catch(error) {
    console.log(`/proxy/${provinceName}`);
    console.error('Error Deleting Asset: ', error);
    toast.error('Asset Not Deleted');
  }
}

onMounted(async () => {
    try {
        const response = await axios.get(`/proxy/api/v1/province/${provinceName}`,
        {
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Authorization': store.state.access_token
            }
        }
        );
        console.log(response)
        state.province = response.data;
    } catch (error) {
        console.error(`Error fetching province: ${provinceName}`, error);
    } finally {
        state.isLoading = false;
    }
});

</script>

<template>
    <BackButton />
    <section class="bg-green-50">

      <!-- Show loading spinner while state.isLoading is true -->
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
          Loading province...
        </h2>
        <PulseLoader />
      </div>

      <!-- show detailed view whne loading is done -->
      <div v-else class="container m-auto py-10 px-6">
        <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <main>
            <div
              class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
            >
              <div class="text-gray-500 mb-4">{{ state.province.provinceType }}</div>
              <h1 class="text-3xl font-bold mb-4">{{ state.province.provinceName }} (Province no. {{ $route.params.id }})</h1>
              <div
                class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
              >
                <i
                  class="pi pi-map-marker text-orange-700 mr-2 mt-1"
                ></i>
                <p class="text-orange-700">{{ state.province.countryName }}</p>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 class="text-green-800 text-lg font-bold mb-6">
                Population: {{ state.province.population }}
              </h3>

              <!-- <p class="mb-4">
                {{ state.province.population }}
              </p> -->

              <h3 class="text-green-800 text-lg font-bold mb-2">Resources:</h3>
              <div class="grid grid-cols-5 gap-4">
                <div :class="`${bg} p-3 rounded-lg shadow-md`">Coal</div>
                <div :class="`${bg} p-3 rounded-lg shadow-md`">Gas</div>
              </div>
              <p class="mb-4">
                {{ state.province.resources }}
              </p>

              <h3 class="text-green-800 text-lg font-bold mb-2">Infrastructures:</h3>

              <p class="mb-4">
                {{ state.province.infrastructures }}
              </p>
            </div>
          </main>

          <!-- Sidebar -->
          <aside>
            <!-- Company Info -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-bold mb-6">Province Notes</h3>

              <h2 class="text-2xl">{{ state.province.provinceName }}</h2>

              <p class="my-2">
                {{ state.province.notes }}
              </p>

              <hr class="my-4" />

              <h3 class="text-xl">Authored by:</h3>

              <p class="my-2 bg-green-100 p-2 font-bold">
                {{ state.province.authoredBy }} <br /> 
                {{ dayjs(state.province.createdAt) }}
              </p>

              <h3 class="text-xl">Last edited by:</h3>

              <p class="my-2 bg-green-100 p-2 font-bold">
                {{ state.province.modifiedBy }} <br /> 
                {{ dayjs(state.province.modifiedAt) }}
              </p>

            </div>

            <!-- Manage -->
            <div class="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 class="text-xl font-bold mb-6">Manage Province</h3>
              <!-- <a
                href="add-job.html"
                class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >Edit Asset</a
              > -->

              <RouterLink
                :to="'/asset/edit/' + assetType + '/' + assetId"
                class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Edit Province
              </RouterLink>

              <button @click="deleteAsset"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Delete Province
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
</template>
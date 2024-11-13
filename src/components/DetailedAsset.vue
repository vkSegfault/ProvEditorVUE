<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { reactive, onMounted } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import axios from 'axios';
import BackButton from './BackButton.vue';
import { useToast } from 'vue-toastification';

// the problem here is that we execute this component via Router Link/View only so we can't pass whole object as prop
// we only get id from route which is part of url
const props = defineProps({
    asset: Object
});

const route = useRoute();
const router = useRouter();
const toast = useToast();

const assetId = route.params.id;
const assetType = route.params.type.toLowerCase();
// console.log(route.params)

const state = reactive({
  asset: {},
  isLoading: true
})

const deleteAsset = async () => {
  try {
    const confirm = window.confirm('Do you want to delete this asset?');
    if (confirm) {
      await axios.delete(`/proxy/assets/${assetType}/${assetId}`);
      toast.success('Asset Deleted Successfully');
      router.push('/assets');
    }
  } catch(error) {
    console.log(`/proxy/${assetType}/${assetId}`);
    console.error('Error Deleting Asset: ', error);
    toast.error('Asset Not Deleted');
  }
}

onMounted(async () => {
    try {
        const response = await axios.get(`/proxy/assets/${assetType}/${assetId}`);
        // console.log(response)
        state.asset = response.data;
    } catch (error) {
        console.error('Error fetching assets', error);
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
          Loading asset...
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
              <div class="text-gray-500 mb-4">{{ state.asset.type }}</div>
              <h1 class="text-3xl font-bold mb-4">{{ state.asset.name }} (asset no. {{ $route.params.id }})</h1>
              <div
                class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
              >
                <i
                  class="pi pi-map-marker text-orange-700 mr-2"
                ></i>
                <p class="text-orange-700">Boston, MA</p>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 class="text-green-800 text-lg font-bold mb-6">
                Job Description
              </h3>

              <p class="mb-4">
                We are seeking a talented Front-End Developer to join our team
                in Boston, MA. The ideal candidate will have strong skills in
                HTML, CSS, and JavaScript, with experience working with modern
                JavaScript frameworks such as Vue or Angular.
              </p>

              <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

              <p class="mb-4">$70k - $80K / Year</p>
            </div>
          </main>

          <!-- Sidebar -->
          <aside>
            <!-- Company Info -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-bold mb-6">Company Info</h3>

              <h2 class="text-2xl">NewTek Solutions</h2>

              <p class="my-2">
                NewTek Solutions is a leading technology company specializing in
                web development and digital solutions. We pride ourselves on
                delivering high-quality products and services to our clients
                while fostering a collaborative and innovative work environment.
              </p>

              <hr class="my-4" />

              <h3 class="text-xl">Contact Email:</h3>

              <p class="my-2 bg-green-100 p-2 font-bold">
                contact@newteksolutions.com
              </p>

              <h3 class="text-xl">Contact Phone:</h3>

              <p class="my-2 bg-green-100 p-2 font-bold">555-555-5555</p>
            </div>

            <!-- Manage -->
            <div class="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 class="text-xl font-bold mb-6">Manage Job</h3>
              <!-- <a
                href="add-job.html"
                class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >Edit Asset</a
              > -->

              <RouterLink
                :to="'/asset/edit/' + assetType + '/' + assetId"
                class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Edit Asset
              </RouterLink>

              <button @click="deleteAsset"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Delete Asset
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
</template>
<script setup>
import { RouterLink, useRoute  } from 'vue-router';
import { reactive, ref, computed } from 'vue';
import router from '@/router';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import Calendar from 'primevue/calendar';
import DatePicker from 'primevue/datepicker';
import OpenLayerMap from './OpenLayerMap.vue';



const route = useRoute()
const type = route.params.type ? route.params.type.toLowerCase() : '';
const stringType = type.charAt(0).toUpperCase() + type.slice(1);
// console.log(route.params)


// eveything from submit form will be coppied to below object
const form = reactive({
  // default type here - when we click add new particular type it should already be picked up and not provided once more
  // type: stringType,
  name: '',
  notes: ''
});

const toast = useToast();

const handleSubmit = async () => {
  // console.log('submit pressed')
  // console.log( form.description )
  const newCountry = {
    countryName: form.name,
    notes: form.notes
  };

  try {
    // console.log( form.type.toUpperCase() )
    // console.log( newCountry )
    const response = await axios.post(`/proxy/api/v1/country`, newCountry);
    console.log(response)
    toast.success('Country Added Successfully');
    // router.push(`/asset/${form.type.toLowerCase()}/${response.data.id}`);
    router.push("/");
  } catch (error) {
    console.error('Error submitting Country:', error);
    toast.error('Country Not Added');
  }

};

</script>

<template>
    <section class="text-center flex flex-col justify-center items-center h-96">
      <i class="pi pi-file-plus text-yellow-500 text-7xl mb-5" style="font-size: 5rem"></i>
      <h1 class="text-6xl font-bold mb-4">Add new country...</h1>
      <RouterLink
        to="/"
        class="text-white bg-green-700 hover:bg-green-900 rounded-md px-3 py-2 mt-4"
        >Go Back</RouterLink
      >
    </section>

    <section class="bg-green-50">
      <div class="container m-auto max-w-3xl py-24">
        <div
          class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <form @submit.prevent="handleSubmit">
            <h2 class="text-3xl text-center font-semibold mb-6">Add Country</h2>

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2"
                >Country name</label
              >
              <input
                v-model="form.name"
                type="text"
                id="name"
                name="name"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="e.g.: Poland"
                required
              />
            </div>

            <div class="mb-4">
              <label
                for="description"
                class="block text-gray-700 font-bold mb-2"
                >Notes</label
              >
              <textarea
                v-model="form.notes"
                id="notes"
                name="notes"
                class="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add historical, geographical, political or any other useful info, 
Notes about country will be ignored by engine"
              ></textarea>
            </div>


            <div>
              <button
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Country
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
</template>
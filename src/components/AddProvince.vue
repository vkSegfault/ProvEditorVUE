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


// we take it from child component OpenLayerMap.vue
const childPolygonArray = ref(null);


// eveything from submit form will be coppied to below object
const form = reactive({
  // default type here - when we click add new particular type it should already be picked up and not provided once more
  type: stringType,
  name: '',
  notes: '',
  dateRange: null,
  value: 0,
  rate: 0,
  days: 0,
  tax: 0
});

const toast = useToast();

const handleSubmit = async () => {
  // console.log('submit pressed')
  // console.log( form.description )
  const newBond = {
    name: form.name,
    type: form.type.toUpperCase(),
    notes: form.notes,
    value: form.value,
    rate: form.rate,
    days: form.days,
    tax: form.tax
  };

  try {
    // console.log( form.type.toUpperCase() )
    // console.log( newBond )
    const response = await axios.post(`/proxy/assets/${form.type.toLowerCase()}`, newBond);
    // console.log(response)
    console.log( `${form.dateRange}` );
    toast.success('Asset Added Successfully');
    router.push(`/asset/${form.type.toLowerCase()}/${response.data.id}`);
  } catch (error) {
    console.error('Error submitting assets:', error);
    toast.error('Assed Not Added');
  }

};

const onSaveShape = () => {  
  console.log( childPolygonArray.value.polygon );
  console.log("Polygon [PARENT COMPONENT]" + childPolygonArray.value);
  return childPolygonArray.value;
}; 
</script>

<template>
    <section class="text-center flex flex-col justify-center items-center h-96">
      <i class="pi pi-file-plus text-yellow-500 text-7xl mb-5" style="font-size: 5rem"></i>
      <h1 class="text-6xl font-bold mb-4">Add new province...</h1>
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
            <h2 class="text-3xl text-center font-semibold mb-6">Add Province</h2>

            <div class=" mb-4">
              <label for="type" class="block text-gray-700 font-bold mb-2"
                >Province Type</label
              >
              <!-- v-model binds form variable defined in <script /> with whataver value user pass to this form from website -->
              <select
                v-model="form.type"
                id="type"
                name="type"
                class="border rounded w-full py-2 px-3"
                required
              >
                <option value="Land">Land</option>
                <option value="City">City</option>
                <option value="Sea">Sea</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2"
                >Province Name</label
              >
              <input
                v-model="form.name"
                type="text"
                id="name"
                name="name"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="e.g.: Masovia"
                required
              />
            </div>

            <!-- TODO - consider making it into option list with search options -->
            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
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
Notes about province will be ignored by engine"
              ></textarea>
            </div>

            <div class="mb-4">
              <label
                for="shape"
                class="block text-gray-700 font-bold mb-2"
                >Shape</label
              >
              <OpenLayerMap ref="childPolygonArray"/>
              <!-- <p> {{ polygonArray.value }} </p> -->
              <div class="btn"> 
                <button type="button" @click="onSaveShape">Save Shape</button>
              </div>
              <div>
              <button
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="button" @click="onSaveShape"
              >
                Save Shape
              </button>
            </div>
            </div>

            <h3 class="text-2xl mb-5">Details</h3>

            <div class="mb-4">
              <label for="company" class="block text-gray-700 font-bold mb-2"
                >Company Name</label
              >
              <input
                type="text"
                id="company"
                name="company"
                class="border rounded w-full py-2 px-3"
                placeholder="Company Name"
              />
            </div>

            <div class="mb-4">
              <label
                for="company_description"
                class="block text-gray-700 font-bold mb-2"
                >Company Description</label
              >
              <textarea
                id="company_description"
                name="company_description"
                class="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="What does your company do?"
              ></textarea>
            </div>

            <div class="mb-4">
              <label
                for="contact_email"
                class="block text-gray-700 font-bold mb-2"
                >Contact Email</label
              >
              <input
                type="email"
                id="contact_email"
                name="contact_email"
                class="border rounded w-full py-2 px-3"
                placeholder="Email address for applicants"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="contact_phone"
                class="block text-gray-700 font-bold mb-2"
                >Contact Phone</label
              >
              <input
                type="tel"
                id="contact_phone"
                name="contact_phone"
                class="border rounded w-full py-2 px-3"
                placeholder="Optional phone for applicants"
              />
            </div>

            <div>
              <button
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Province
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
</template>
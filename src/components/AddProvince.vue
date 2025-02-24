<script setup>
import { RouterLink, useRoute  } from 'vue-router';
import { reactive, ref, computed } from 'vue';
import router from '@/router';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import Calendar from 'primevue/calendar';
import DatePicker from 'primevue/datepicker';
import OpenLayerMap from './OpenLayerMap.vue';
import { useStore } from 'vuex';



const route = useRoute()
const type = route.params.type ? route.params.type.toLowerCase() : '';
const stringType = type.charAt(0).toUpperCase() + type.slice(1);
console.log(route.params)
const store = useStore();


// this variable is stand-in for everything exposes via defineExpose() in from OpenLayerMap.vue
const childComponent = ref(null);
// we use key change to rerender OpenLayerMap component upon erase so that not saved polygon will be replaced 
const componentKey = ref(0);
const forceRerender = () => {
  console.log("Component re-rendered");
  componentKey.value += 1;
};

// eveything from submit form will be coppied to below object
const form = reactive({
  // default type here - when we click add new particular type it should already be picked up and not provided once more
  provinceType: stringType,
  name: '',
  country: '',
  notes: '',
  shape: childComponent == null ? childComponent.value.polygon : null,
  population: 0,
  resources: '',
  infra: '',
  terrain: ''
});

const toast = useToast();

const handleSubmit = async () => {
  // console.log('submit pressed')
  // console.log( form.description )
  const newProvince = {
    provinceType: form.provinceType,
    provinceName: form.name,
    countryName: form.country,
    notes: form.notes,
    shape: childComponent.value.polygon.flat(),
    population: form.population,
    resources: form.resources.split(','),
    infrastructures: form.infra.split(',')
  };

  try {
    // console.log( form.type.toUpperCase() )
    console.log( newProvince )
    // const responseB = await axios.post(`/proxy/assets/${form.type.toLowerCase()}`, newProvince);
    // const responseC = await axios.post(`/proxy/api/v1/country`, newCountry);

//     curl -X 'POST' \
//   'http://localhost:5077/api/v1/province' \
//   -H 'accept: text/plain' \
//   -H 'Authorization: Bearer CfDJ8BOMx_36NgZOqRSICWKSLREAIFFYJHwd5jDGgUP28P5nyWqoumg' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "provinceType": "Land",
//   "provinceName": "Cracovia",
//   "countryName": "Poland",
//   "notes": "string",
//   "shape": [
//     0
//   ],
//   "population": 0,
//   "resources": [
//     "Coal"
//   ],
//   "infrastructures": [
//     "Airport"
//   ]
// }'

    // newProvince.shape = [1, 2];
    // console.log(newProvince);

    const response = await axios.post( 'http://localhost:5077/api/v1/provinces', 
        newProvince,
        {
          headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': store.state.access_token
          }
        }
    );
    console.log(response)
    console.log( `${form.dateRange}` );
    toast.success('Asset Added Successfully');
    // got to the this particular list
    router.push(`/asset/${form.provinceType.toLowerCase()}/${response.data.id}`);
  } catch (error) {
    console.error('Error submitting assets:', error);
    toast.error('Assed Not Added');
  }

};

const onEraseShape = () => {
  console.log( childComponent.value.polygon );
  console.log( "Polygon [VIEWED VIA PARENT COMPONENT]: " + childComponent.value.polygon );

  childComponent.value.erase();
  forceRerender();
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
                v-model="form.provinceType"
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
              v-model="form.country"
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

              <OpenLayerMap ref="childComponent" :key="componentKey" />

              <div class="flex text-center justify-center items-center">
                <div class="block group relative">

                  <button
                    class="my-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                    type="button" @click="onEraseShape"
                  >
                  Erase Shape
                  </button>

                  <!-- tooltipCustom is custom set of Tailwind classes packed in ./assets/main.css -->
                  <div class="tooltipCustom my-1">
                    <p>Clear off polygon?</p>
                  </div>

                </div>
              </div>

            </div>

            <h3 class="text-2xl mb-5">Details</h3>

            <div class="mb-4">
              <label for="population" class="block text-gray-700 font-bold mb-2"
                >Population</label
              >
              <input
                v-model="form.population"
                type="number"
                id="population"
                name="population"
                class="border rounded w-full py-2 px-3"
                placeholder=314000
              />
            </div>

            <div class="mb-4">
              <label
                for="resources"
                class="block text-gray-700 font-bold mb-2"
                >Resources</label
              >
              <input
                v-model="form.resources"
                type="text"
                id="resources"
                name="resources"
                class="border rounded w-full py-2 px-3"
                placeholder="List of resources the province has e.g.: coal, copper, gas, uranium..."
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="infrastructure"
                class="block text-gray-700 font-bold mb-2"
                >Infrastructure</label
              >
              <input
                v-model="form.infra"
                type="text"
                id="infrastructure"
                name="infrastructure"
                class="border rounded w-full py-2 px-3"
                placeholder="List of infrastructure buildings the province has, e.g.: airport, nuclear plant, expressway..."
              />
            </div>
            <div class="mb-4">
              <label
                for="terrain"
                class="block text-gray-700 font-bold mb-2"
                >Terrain</label
              >
              <input
                v-model="form.terrain"
                type="text"
                id="terrain"
                name="terrain"
                class="border rounded w-full py-2 px-3"
                placeholder="Terrain type, e.g.: plains, mountains, desert, jungle..."
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
<script setup>
import { RouterLink, useRoute, useRouter  } from 'vue-router';
import { onMounted, reactive } from 'vue';
import router from '@/router';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import DatePicker from 'primevue/datepicker';


const route = useRoute();
// const router = useRouter();

const type = route.params.type ? route.params.type.toLowerCase() : '';
const stringType = type.charAt(0).toUpperCase() + type.slice(1);
const assetId = route.params.id;


const state = reactive({
    asset: {},
    isLoading: true
})

onMounted( async () => {
    try {
        const response = await axios.get(`/proxy/assets/${type}/${assetId}`);
        state.asset = response.data;

        // populate form to current data
        form.name = state.asset.name;
        form.description = state.asset.description;
        form.dateRange = state.asset.dateRange;
        form.value = state.asset.value;
        form.rate = state.asset.rate;
        form.days = state.asset.days;
        form.tax = state.asset.tax;
    } catch (error) {
        console.error( "Error loading asset: " + error )
    } finally {
        state.isLoading = false;
    }
} )


// eveything from submit form will be coppied to below 'form' object
const form = reactive({
  // default type here - when we click add new particular type it should already be picked up and not provided once more
  type: stringType,
  name: '',
  description: '',
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
  const updatedBond = {
    name: form.name,
    type: form.type.toUpperCase(),
    description: form.description,
    value: form.value,
    rate: form.rate,
    days: form.days,
    tax: form.tax
  };

  try {
    // console.log( form.type.toUpperCase() )
    // console.log( newBond )
    const response = await axios.put(`/proxy/assets/${form.type.toLowerCase()}/${assetId}`, updatedBond);
    // console.log(response)
    // console.log( `${form.dateRange}` );
    toast.success('Asset Updated Successfully');
    router.push(`/asset/${form.type.toLowerCase()}/${response.data.id}`);
  } catch (error) {
    console.error('Error updating assets:', error);
    toast.error('Assed Not Updated');
  }

};
</script>

<template>
    <section class="text-center flex flex-col justify-center items-center h-96">
      <i class="pi pi-file-plus text-yellow-500 text-7xl mb-5" style="font-size: 5rem"></i>
      <h1 class="text-6xl font-bold mb-4">Edit asset...</h1>
      <p class="text-xl mb-5">Plase edit your asset</p>
      <RouterLink
        to="/"
        class="text-white bg-green-700 hover:bg-green-900 rounded-md px-3 py-2 mt-4"
        >Go Back</RouterLink
      >
    </section>

    <section class="bg-green-50">
      <div class="container m-auto max-w-2xl py-24">
        <div
          class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <form @submit.prevent="handleSubmit">
            <h2 class="text-3xl text-center font-semibold mb-6">Add Asset</h2>

            <div class="mb-4">
              <label for="type" class="block text-gray-700 font-bold mb-2"
                >Asset Type</label
              >
              <!-- v-model binds form variable defined in <script /> with whataver value user pass to this form from website -->
              <select
                v-model="form.type"
                id="type"
                name="type"
                class="border rounded w-full py-2 px-3"
                required
              >
                <option value="Stock">Stock</option>
                <option value="Deposit">Deposit</option>
                <option value="Bond">Bond</option>
                <option value="IKE">IKE</option>
                <option value="PPK">PPK</option>
                <option value="Mortgage">Mortgage</option>
                <option value="Installment">Installment</option>
                <option value="Loan">Loan</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2"
                >Asset Name</label
              >
              <input
                v-model="form.name"
                type="text"
                id="name"
                name="name"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. My 2nd deposit"
                required
              />
            </div>

            <div class="mb-4">
              <label
                for="description"
                class="block text-gray-700 font-bold mb-2"
                >Description</label
              >
              <textarea
                v-model="form.description"
                id="description"
                name="description"
                class="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Deposit for 10k PLN, saving for new car, please "
              ></textarea>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2"
                >Asset Valid Date Range</label
              >
              <div class="flex justify-content-center flex-wrap">
                <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-primary font-bold border-round m-2">
                  <DatePicker v-model=form.dateRange buttondisplay showIcon :showOnFocus="true"
                    type="text"
                    id="date"
                    name="date"
                    class="border rounded w-2/3 py-2 px-3 mb-2"
                    placeholder="10/23/2024"
                  />
                </div>
                <!-- <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-primary font-bold border-round m-2"> 2 </div>
                <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-primary font-bold border-round m-2"> 3 </div>
                <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-primary font-bold border-round m-2"> 4 </div> -->
              </div>
            </div>
            
            <div class="mb-4">
              <label for="type" class="block text-gray-700 font-bold mb-2"
                >Salary</label
              >
              <select
                id="salary"
                name="salary"
                class="border rounded w-full py-2 px-3"
                required
              >
                <option value="Under $50K">under $50K</option>
                <option value="$50K - $60K">$50 - $60K</option>
                <option value="$60K - $70K">$60 - $70K</option>
                <option value="$70K - $80K">$70 - $80K</option>
                <option value="$80K - $90K">$80 - $90K</option>
                <option value="$90K - $100K">$90 - $100K</option>
                <option value="$100K - $125K">$100 - $125K</option>
                <option value="$125K - $150K">$125 - $150K</option>
                <option value="$150K - $175K">$150 - $175K</option>
                <option value="$175K - $200K">$175 - $200K</option>
                <option value="Over $200K">Over $200K</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="Company Location"
                required
              />
            </div>

            <h3 class="text-2xl mb-5">Company Info</h3>

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
                Edit Asset
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
</template>
<script setup>
import { RouterLink, useRoute  } from 'vue-router';
import { reactive } from 'vue';
import router from '@/router';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';
import JSON5 from 'json5'


const store = useStore();
const route = useRoute()
let bearerAccessToken = "";


// eveything from submit form will be coppied to below object
const form = reactive({
  // default type here - when we click add new particular type it should already be picked up and not provided once more
  email: '',
  password: ''
});

const toast = useToast();

const handleSubmit = async () => {
  // console.log('submit pressed')
  // console.log( form.description )

  try {
    // console.log( form.type.toUpperCase() )
    // console.log( newBond )
    //     curl -X 'POST' \
    //   'http://localhost:5077/login?useCookies=true' \
    //   -H 'accept: application/json' \
    //   -H 'Content-Type: application/json' \
    //   -d '{
    //   "email": "adtofaust@gmail.com",
    //   "password": "DupaMamuta1!",
    //   "twoFactorCode": "string",
    //   "twoFactorRecoveryCode": "string"
    // }'
    const response = await axios.post(
        '/proxy/api/v1/auth/login',
        {
            'email': `${form.email}`,
            'password': `${form.password}`,
            'twoFactorCode': 'string',
            'twoFactorRecoveryCode': 'string'
        },
        {
            params: {
            'useCookies': 'false'
            },
            headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
            }
        }
    );
    console.log(response)
    const accessToken = response.data.accessToken;
    console.log(accessToken)
    const accessTokenStr = JSON5.stringify(accessToken);
    bearerAccessToken = "Bearer " + accessTokenStr.substring(1, accessTokenStr.length-1)   // remove single quotation marks from start and end
    console.log( "Successfully retrieved access token: " + bearerAccessToken );
    console.log("User logged in: " + store.state.logged_in);
    store.commit('set_acccess_token', bearerAccessToken);
    console.log("Access token stored in Vuex Store: " + store.state.access_token);
    console.log( `${form.dateRange}` );
    toast.success('Login successful...');
    store.commit('login');
    // TODO - use Store to keep bearer token (like we do in LoginGoogle.vue)
    router.push(`/provinces`);
  } catch (error) {
    console.error('Error:', error);
    toast.error('Wrong credentials...');
  }

};
</script>

<template>

    <section class="text-center flex flex-col justify-center items-center h-144">
        <i class="pi pi-sign-in text-yellow-500 text-7xl mb-5 mt-5" style="font-size: 5rem"></i>
        <h1 class="text-5xl font-bold mb-4">Login</h1>

        <div class="container m-auto max-w-2xl py-10">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="handleSubmit">

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Email:</label>
                    <input
                        v-model="form.email"
                        type="text"
                        id="email"
                        name="email"
                        class="border rounded w-full py-2 px-3 mb-2"
                        placeholder="Please use your mail adress..."
                        required
                    />
                </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">
                    Password:
                </label>
                <input
                    v-model="form.password"
                    type="password"
                    id="password"
                    name="password"
                    class="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Please use your password..."
                    required
                />
            </div>

            <div>
                <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline" type="submit">
                    Login
                </button>
            </div>
            
          </form>
        </div>
      </div>

      <RouterLink
        to="/"
        class="text-white bg-green-700 hover:bg-green-900 rounded-md px-3 py-2 mt-4 mb-4"
        >Go Back</RouterLink
      >
      
    </section>
</template>
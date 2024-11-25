<script setup>
import { GoogleLogin, decodeCredential, googleAuthCodeLogin, googleTokenLogin,  } from 'vue3-google-login';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import JSON5 from 'json5'
import { useStore } from 'vuex';
import router from '@/router';

const store = useStore();
const toast = useToast();
let bearerAccessToken = "";

const callback = async (response) => {
    // This callback will be triggered when the user selects or login to his Google account from the popup
    console.log("CREDENTIALS RESPONSE: ", response)

    // decodeCredential will retrive the JWT payload from the credential
    const userData = decodeCredential(response.credential)
    console.log("Handle the userData (decoded credential)", userData)

    try {
        // response.credential is basically idToken needed for google
        const res = await axios.post(`/proxy/api/v1/auth/google`, { "idToken": response.credential });   // .then() unpacks promise to actual data

        // handle case when user is created and activated by admin - we just fetch access token
        if ( res.status == '200' ) {
            const accessToken = res.data.accessToken;
            console.log( accessToken );
            const accessTokenStr = JSON5.stringify(accessToken);
            bearerAccessToken = "Bearer " + accessTokenStr.substring(1, accessTokenStr.length-1)   // remove single quotation marks from start and end
            console.log( "Successfully retrieved access token: " + bearerAccessToken );
            toast.success('Login Successful');
            console.log(store.state.logged_in);
            store.commit('login');
            console.log(store.state.logged_in);
            store.commit('logout');
            console.log(store.state.logged_in);
            router.push(`/assets`);
        }
        // handle case when user is created but not activated by admin
        else if ( res.status == '201' ) {
            console.log("Confirmation mail has been sent to administrator");
        } else {
            toast.error('Authentication failed - please wait for admin to activate your account');
        }
    } catch (error) {
        console.error('Error authenticating Google Token:', error);
    }
}

const login = async () => {
    // googleAuthCodeLogin().then((response) => {
    //     console.log("AUTH CODE", response)
    // })

    const accessToken = await googleTokenLogin().then((response) => {
        console.log("ACCESS TOKEN: ", response)
        return response;
    })

    try {
        // response.credential is basically idToken needed for google
        const res = axios.post(`/proxy/api/v1/auth/google`, { "accessToken": accessToken });
    } catch (error) {
        console.error('Error authenticating Google Token:', error);
    }
}

</script>

<template>
    <GoogleLogin :callback="callback" prompt client-id="592195124025-6g06a3tddd3fpu494rsrplopn83f7jb2.apps.googleusercontent.com" />

    <!-- uncoment bellow if want to send to backend accessToken instead idToken -->
    <!-- <GoogleLogin @click="login">Login via accessToken</GoogleLogin> -->
</template>
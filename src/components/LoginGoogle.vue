<script setup>
import { GoogleLogin, decodeCredential, googleAuthCodeLogin, googleTokenLogin,  } from 'vue3-google-login';
import axios from 'axios';


const callback = (response) => {
    // This callback will be triggered when the user selects or login to
    // his Google account from the popup
    console.log("CREDENTIALS RESPONSE: ", response)

    // decodeCredential will retrive the JWT payload from the credential
    const userData = decodeCredential(response.credential)
    console.log("Handle the userData (decoded credential)", userData)

    try {
        // response.credential is basically idToken needed for google
        const res = axios.post(`/proxy/api/v1/auth/google`, { "idToken": response.credential });
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
    <GoogleLogin @click="login">Login via accessToken</GoogleLogin>
    <!-- <GoogleLogin> -->
        <!-- Adding a button here allow us to override button style but also hides google-styled default button -->
        <!-- <button @click="login">Login Using Google</button> -->
         <!-- GoogleLogin -->
    <!-- </GoogleLogin> -->
</template>
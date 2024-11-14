<script setup>
import { GoogleLogin, decodeCredential, googleAuthCodeLogin, googleTokenLogin,  } from 'vue3-google-login';


const callback = (response) => {
    // This callback will be triggered when the user selects or login to
    // his Google account from the popup
    console.log("Handle the response", response)

    // decodeCredential will retrive the JWT payload from the credential
    // const userData = decodeCredential(response.credential)
    // console.log("Handle the userData (decoded credential)", userData)
}

const login = () => {
    // googleAuthCodeLogin().then((response) => {
    //     console.log("AUTH CODE", response)
    // })

    googleTokenLogin().then((response) => {
        console.log("ACCESS TOKEN: ", response)
    })
}

</script>

<template>
    <!-- <GoogleLogin client-id="592195124025-6g06a3tddd3fpu494rsrplopn83f7jb2.apps.googleusercontent.com" :callback="callback"> -->
    <GoogleLogin>
        <!-- Adding a button here allow us to override button style but also hides google-styled default button -->
        <button @click="login">Login Using Google</button>
    </GoogleLogin>
</template>
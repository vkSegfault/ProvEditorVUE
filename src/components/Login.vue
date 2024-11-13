<script setup>

</script>

<template>
    <section class="bg-gradient-to-r from-green-600 to-green-800 py-20 mb-4">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div class="text-center">

                <h1 class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                    Login
                </h1>

                <div class="login my-4 text-xl text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <input type="text" v-model="email" placeholder="Enter email...">
                    <input type="password" v-model="password" placeholder="Enter password...">
                    <button v-on:click="login">Login</button>
                </div>

            </div>
        </div>
    </section>

</template>

<style>
#app {
    font-family: Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
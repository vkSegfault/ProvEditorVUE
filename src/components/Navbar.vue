<script setup>
import logo from '@/assets/logo.svg'
import { RouterLink, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import router from '@/router';
import { useToast } from 'vue-toastification';
import 'floating-vue/dist/style.css'

const store = useStore();
const toast = useToast();

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
}

const logout = () => {
  store.commit('logout');
  toast.info('Logout Successful');
  router.push("/");
}

</script>

<template>
    <nav class="bg-gradient-to-r from-green-600 to-green-900 border-b border-green-500">
      <div class="mx-auto max-width-none px-2 sm:px-100 lg:px-200">
        <div class="flex h-20 items-center justify-between">
          <div
            class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            <div class="min-w-96"></div>
            <div class="min-w-32"></div>

            <!-- Logo -->
            <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
              <img class="h-10 w-auto" v-bind:src="logo" alt="Vue Finance" />
              <span class="hidden md:block text-white text-2xl font-bold ml-2"
                >Province Editor</span
              >
            </RouterLink>
            
            <div class="md:ml-auto">
              <div v-if="store.state.logged_in == false" class="flex space-x-2">
                <RouterLink
                  to="/"
                  :class="[isActiveLink('/') ? 'bg-green-900' : 'hover:bg-green-800 hover:text-white', 'text-white', 'px-3', 'py-2', 'rounded-md']"
                  >Home</RouterLink
                >
                <!-- <RouterLink
                  to="/login"
                  :class="[isActiveLink('/login') ? 'bg-green-900' : 'hover:bg-green-800 hover:text-white', 'text-white', 'px-3', 'py-2', 'rounded-md']"
                  >
                  <i class="pi pi-user text-yellow-500"></i>
                  Login
                </RouterLink
                > -->
                <VMenu :distance="34" class="px-3 py-2">
                  <RouterLink
                    to="/login"
                    :class="[isActiveLink('/login') ? 'bg-green-900' : 'hover:bg-green-800 hover:text-white', 'text-white', 'px-3', 'py-2', 'rounded-md']"
                    >
                    <i class="pi pi-user text-yellow-500"></i>
                    Login
                  </RouterLink
                  >

                  <template #popper>
                    <div class="flex flex-col h-20 items-center justify-between md:items-stretch md:justify-start bg-opacity-50">

                      <RouterLink
                        to="/login"
                        :class="[isActiveLink('/login') ? 'bg-green-900' : 'bg-green-700', 'bg-opacity-80', 'hover:bg-green-800', 'hover:text-white', 'text-white', 'px-10', 'py-2', 'rounded-md']"
                        >
                        <i class="pi pi-sign-in text-yellow-500"></i>
                        Login
                      </RouterLink>
                      
                      <RouterLink
                        to="/register"
                        :class="[isActiveLink('/login') ? 'bg-green-900' : 'bg-green-700', 'bg-opacity-80', 'hover:bg-green-800',  'hover:text-white', 'text-white', 'px-10', 'py-2', 'rounded-md']"
                        >
                        <i class="pi pi-user-plus text-yellow-500"></i>
                        Register
                      </RouterLink>

                    </div>
                  </template>
                </VMenu>

              </div>
              
              <div v-else class="flex space-x-2">

                <RouterLink
                  to="/"
                  :class="[isActiveLink('/') ? 'bg-green-900' : 'hover:bg-green-800 hover:text-white', 'text-white', 'px-3', 'py-2', 'rounded-md']"
                  >Home</RouterLink
                >

                <RouterLink
                  to="/provinces"
                  :class="[isActiveLink('/provinces') ? 'bg-green-900' : 'hover:bg-green-800 hover:text-white', 'text-white', 'px-3', 'py-2', 'rounded-md']"
                  >Provinces</RouterLink
                >

                <RouterLink
                  to="/province/add"
                  :class="[isActiveLink('/province/add') ? 'bg-green-900' : 'hover:bg-green-800 hover:text-white', 'text-white', 'px-3', 'py-2', 'rounded-md']"
                  >Add Province</RouterLink
                >

                <RouterLink
                  to="/users"
                  :class="[isActiveLink('/users') ? 'bg-green-900' : 'hover:bg-green-800 hover:text-white', 'text-white', 'px-3', 'py-2', 'rounded-md']"
                  >Users</RouterLink
                >

                <RouterLink @click="logout"
                  to="/"
                  :class="['hover:bg-green-800 hover:text-white', 'text-white', 'px-3', 'py-2', 'rounded-md']"
                  >
                  <i class="pi pi-user text-yellow-500"></i>
                  Logout
                </RouterLink
                >

              </div>
            </div>

            <div class="min-w-96"></div>
            <div class="min-w-32"></div>

          </div>
        </div>
      </div>
    </nav>
</template>

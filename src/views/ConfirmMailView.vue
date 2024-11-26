<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <section class="text-center flex flex-col justify-center items-center h-96">
      <i class="pi pi-exclamation-triangle text-yellow-500 text-7xl mb-5" style="font-size: 5rem"></i>
      <h1 class="text-6xl font-bold mb-4">Confirmation mail has been sent to administrator</h1>
      <div class="text-center flex flex-row justify-center items-center">
          <p class="text-xl mb-5">Please wait for approval...</p>
          <i class="pi pi-spin pi-spinner ml-4 mb-4" style="font-size: 1.3rem"></i>
      </div>
      <RouterLink
        to="/"
        class="text-white bg-green-700 hover:bg-green-900 rounded-md px-3 py-2 mt-4"
        >Go Back</RouterLink
      >
    </section>
</template>
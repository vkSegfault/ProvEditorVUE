<script setup>
import { defineProps } from 'vue';

// props are args
defineProps({
    title: {
        type: String,
        default: 'Province Editor'
    },
    subtitle: {
        type: String,
        default: 'Add, draw and edit provinces and countries'
    }
});

</script>

<template>
    <!-- Title -->
    <section class="bg-gradient-to-r from-green-600 to-green-800 py-20 mb-4">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
      >
        <div class="text-center">
          <h1
            class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
          >
            {{ title }}
          </h1>
          <p class="my-4 text-xl text-white">
            {{ subtitle }}
          </p>
        </div>
      </div>
    </section>
</template>
<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <section>
      <div class="container m-auto py-6 px-6">
        <RouterLink
          to="/assets"
          class="text-green-600 hover:text-green-700 flex items-center "
        >
          <i class="pi pi-arrow-circle-left mr-3" style="font-size: 1.4rem"></i> Back to Job Listings
        </RouterLink>
      </div>
    </section>
</template>
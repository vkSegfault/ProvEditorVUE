<script setup>
import { RouterLink } from 'vue-router';
import AssetType from '@/components/AssetType.vue';
</script>

<template>
    <section class="py-4">
      <div class="container-xl lg:container m-auto">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">

          <AssetType bg="bg-green-100">
            <h2 class="text-2xl font-bold">Province</h2>
            <p class="mt-2 mb-4">
              Land Province - most popular generic type, has population, resources and infrastructure
            </p>
            <RouterLink
              to="/asset/add/stock"
              class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Add Province
            </RouterLink>
          </AssetType>

          <AssetType bg="bg-blue-100">
            <h2 class="text-2xl font-bold">Sea Province</h2>
            <p class="mt-2 mb-4">
              Sea Province - doesn't belongs to any country but has resources
            </p>
            <RouterLink
              to="/asset/add/bond"
              class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
            >
              Add Sea Province
            </RouterLink>
          </AssetType>
          <AssetType bg="bg-red-100">
            <h2 class="text-2xl font-bold">City</h2>
            <p class="mt-2 mb-4">
              City is special type of Province which doesn't have natural resources
            </p>
            <RouterLink
              to="/asset/add"
              class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
            >
              Add City
            </RouterLink>
          </AssetType>

        </div>

        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">

          <AssetType bg="bg-lime-100">
            <h2 class="text-2xl font-bold">Country</h2>
            <p class="mt-2 mb-4">
              Add Country - every Land Province and City needs to be a part of Country
            </p>
            <RouterLink
              to="/asset/add"
              class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
            >
              Add Country
            </RouterLink>
          </AssetType>

        </div>

        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">

          <AssetType bg="bg-indigo-200">
            <h2 class="text-2xl font-bold">Resource</h2>
            <p class="mt-2 mb-4">
              Resources can be naturally "produced" by Land or Sea Province or by Factory
            </p>
            <RouterLink
              to="/asset/add"
              class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
            >
              Add Resource
            </RouterLink>
          </AssetType>


        </div>

        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">

          <AssetType bg="bg-orange-100">
            <h2 class="text-2xl font-bold">Infrastructure</h2>
            <p class="mt-2 mb-4">
              Infrastructure objects varies from highways, to airports to stock exchange - each one increasing the small amount of Infra level
            </p>
            <RouterLink
              to="/asset/add"
              class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
            >
              Add Infrastructure Object
            </RouterLink>
          </AssetType>

          <AssetType bg="bg-orange-200">
            <h2 class="text-2xl font-bold">Factory</h2>
            <p class="mt-2 mb-4">
              Factories take resources as inputs and multiplies them or produces a new resources as outputs
            </p>
            <RouterLink
              to="/asset/add"
              class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
            >
              Add Factory
            </RouterLink>
          </AssetType>

        </div>

      </div>
    </section>

</template>
<script setup>
import { RouterLink } from 'vue-router';
import AssetType from '@/components/AssetType.vue';
</script>

<template>
    <section class="py-4">
      <div class="container-xl lg:container m-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <AssetType bg="bg-blue-100">
            <h2 class="text-2xl font-bold">Stock</h2>
            <p class="mt-2 mb-4">
              Add Stock from WSE (API should fetch current markings and update value)
            </p>
            <RouterLink
              to="/asset/add/stock"
              class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Add Stock
            </RouterLink>
          </AssetType>
          <AssetType bg="bg-green-100">
            <h2 class="text-2xl font-bold">Bond</h2>
            <p class="mt-2 mb-4">
              Add Bond, interest rate (TAX vill be deduced automatically)
            </p>
            <RouterLink
              to="/asset/add/bond"
              class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
            >
              Add Bond
            </RouterLink>
          </AssetType>
          <AssetType bg="bg-lime-100">
            <h2 class="text-2xl font-bold">Deposit</h2>
            <p class="mt-2 mb-4">
              Add Deposit
            </p>
            <RouterLink
              to="/asset/add"
              class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
            >
              Add Deposit
            </RouterLink>
          </AssetType>
          <AssetType bg="bg-gray-100">
            <h2 class="text-2xl font-bold">IKE</h2>
            <p class="mt-2 mb-4">
              Add money to Indywidualne Konto Emerytalne
            </p>
            <RouterLink
              to="/asset/add"
              class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
            >
              Add IKE
            </RouterLink>
          </AssetType>
          <AssetType bg="bg-teal-100">
            <h2 class="text-2xl font-bold">PPK</h2>
            <p class="mt-2 mb-4">
              Add money to Pracowniczy Plan Kapitałowy
            </p>
            <RouterLink
              to="/asset/add"
              class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
            >
              Add PPK
            </RouterLink>
          </AssetType>
        </div>

        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <AssetType bg="bg-red-200">
            <h2 class="text-2xl font-bold">Mortgage</h2>
            <p class="mt-2 mb-4">
              Add Mortgage, whole credit value, capital paid off, capital left
            </p>
            <RouterLink
              to="/asset/add"
              class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
            >
              Add Mortgage
            </RouterLink>
          </AssetType>
          <AssetType bg="bg-red-100">
            <h2 class="text-2xl font-bold">Installment</h2>
            <p class="mt-2 mb-4">
              Add one Installement of Mortgage
            </p>
            <RouterLink
              to="/asset/add"
              class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
            >
              Add Installment
            </RouterLink>
          </AssetType>
          <AssetType bg="bg-orange-100">
            <h2 class="text-2xl font-bold">Loan</h2>
            <p class="mt-2 mb-4">
              Add consumer or private Loan 
            </p>
            <RouterLink
              to="/asset/add"
              class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
            >
              Add Loan
            </RouterLink>
          </AssetType>
        </div>
      </div>
    </section>

</template>
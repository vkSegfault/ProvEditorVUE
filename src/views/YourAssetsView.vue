<script setup>
import AssetList from '@/components/AssetList.vue';
</script>

<template>
    <AssetList :limit="4" v-bind:showButton="true"/>
</template>
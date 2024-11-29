<script setup>
import ProvinceList from '@/components/ProvinceList.vue';
</script>

<template>
    <ProvinceList :limit="4" v-bind:showButton="true"/>
</template>
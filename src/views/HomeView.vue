<script setup>
import Title from '@/components/Title.vue'
import AssetTypeList from '@/components/AssetTypeList.vue'
</script>

<template>
    <!-- we pass props (args) here to Title.vue component-->
    <Title title="Province Editor" subtitle='Add, draw and customize provinces and countries' />
    <AssetTypeList />
</template>
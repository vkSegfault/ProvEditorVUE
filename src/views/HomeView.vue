<script setup>
import Title from '@/components/Title.vue'
import TypeList from '@/components/TypeList.vue'
</script>

<template>
    <!-- we pass props (args) here to Title.vue component-->
    <Title title="Province Editor" subtitle='Add, draw and customize provinces and countries' />
    <TypeList />
</template>
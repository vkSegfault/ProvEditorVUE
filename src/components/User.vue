<script setup>
import { defineProps, ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    user: Object
});

const showFullDescription = ref(false);
const toggleFullDescription = () => {
    showFullDescription.value = !showFullDescription.value;
}
const truncatedDescripion = computed(() => {
    let description = props.user.notes;
    // if (!showFullDescription.value) {
    //     description = description.substring(0, 90) + '...';
    // }
    return description;
})

onMounted(() => {
    const type = props.user.provinceType
    if (type === "Sea") {
        bgColor.value = "bg-blue-100"
    } else if (type === "Land") {
        bgColor.value = "bg-green-100"
    } else if (type === "City") {
        bgColor.value = "bg-red-100"
    }
});

const bgColor = ref('bg-white')

</script>

<template>
    <!-- <div class="rounded-xl shadow-md relative" :class="bgColor">
        <div class="p-4">
            <div class="mb-6">
            <div class="text-gray-600 my-2">{{ user.id }}</div>
            <h3 class="text-xl font-bold">{{ user.userName }}</h3>
            </div>

            <h3 class="text-green-500 mb-2">Roles: {{ user.roles }}</h3>

            <div class="border border-gray-100 mb-5"></div>

            <div class="flex flex-col lg:flex-row justify-between mb-4">
            <div class="text-orange-700 mb-3">
                <i class="pi pi-map-marker text-orange-700"></i>
                {{ user.countryName }}
            </div>
            <RouterLink
                :to="'/province/' + user.provinceName"
                class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm"
            >
                Read More
            </RouterLink>
            </div>
        </div>
    </div> -->

    <div class="flex m-8 gap-x-4 outline outline-offset-4 outline-2 outline-green-500 rounded-lg py-3">
        <img class="size-12 flex-none rounded-full bg-gray-50" :src="user.imageUrl" alt="picture" />
        <div class="min-w-0 flex-auto">
          <p class="text-sm/6 font-semibold text-gray-900">{{ user.userName }}</p>
          <p class="mt-1 truncate text-xs/5 text-gray-500">{{ user.id }}</p>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p class="text-sm/6 text-gray-900">{{ user.roles }}</p>
        </div>
    </div>
    <!-- <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p class="text-sm/6 text-gray-900">{{ user.roles }}</p>
        <p v-if="user.lastSeen" class="mt-1 text-xs/5 text-gray-500">
          Last seen <time :datetime="user.lastSeenDateTime">{{ user.lastSeen }}</time>
        </p>
        <div v-else class="mt-1 flex items-center gap-x-1.5">
          <div class="flex-none rounded-full bg-emerald-500/20 p-1">
            <div class="size-1.5 rounded-full bg-emerald-500" />
          </div>
          <p class="text-xs/5 text-gray-500">Online</p>
        </div>
    </div> -->
    
</template>
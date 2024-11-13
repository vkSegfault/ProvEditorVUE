<script setup>
import { defineProps, ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

// depending on Asset type background color should be set automatically to one matching Card
const props = defineProps({
    asset: Object
});

const showFullDescription = ref(false);
const toggleFullDescription = () => {
    showFullDescription.value = !showFullDescription.value;
}
const truncatedDescripion = computed(() => {
    let description = props.asset.description;
    if (!showFullDescription.value) {
        description = description.substring(0, 90) + '...';
    }
    return description;
})

onMounted(() => {
    const type = props.asset.type
    if (type === "STOCK") {
        bgColor.value = "bg-blue-100"
    } else if (type === "BOND") {
        bgColor.value = "bg-green-100"
    }
});

const bgColor = ref('bg-white')

</script>

<template>
    <div class="rounded-xl shadow-md relative" :class="bgColor">
        <div class="p-4">
            <div class="mb-6">
            <div class="text-gray-600 my-2">{{ asset.type }}</div>
            <h3 class="text-xl font-bold">{{ asset.name }}</h3>
            </div>

            <div class="mb-5">
                <div>
                    {{ truncatedDescripion }}
                </div>
                <button @click="toggleFullDescription" class="text-green-500 hover:text-green-600 mb-5">
                    {{ showFullDescription ? 'Less' : 'More' }}
                </button>
            </div>

            <h3 class="text-green-500 mb-2">{{ asset.salary }} / Year</h3>

            <div class="border border-gray-100 mb-5"></div>

            <div class="flex flex-col lg:flex-row justify-between mb-4">
            <div class="text-orange-700 mb-3">
                <i class="pi pi-map-marker text-orange-700"></i>
                {{ asset.location }}
            </div>
            <RouterLink
                :to="'/asset/' + asset.type + '/' + asset.id"
                class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm"
            >
                Read More
            </RouterLink>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { provide } from "vue";
import { Map, Layers, Sources, type Vue3OpenlayersGlobalOptions } from "vue3-openlayers";
import OpenLayersMap from "vue3-openlayers";
import { ref, inject, onMounted } from "vue";


const options: Vue3OpenlayersGlobalOptions = {
  debug: true,
};

provide("ol-options", options);

const center = ref([34, 39.13]);
const projection = ref("EPSG:4326");
const zoom = ref(6);
const rotation = ref(0);
</script>

<template>
  <Map.OlMap style="min-width: 400px; min-height: 400px;">
    <Map.OlView :center="[40, 40]" :zoom="5" projection="EPSG:4326" />
    <Layers.OlTileLayer>
      <Sources.OlSourceOsm />
        <ol-map
            ref="map"
            :loadTilesWhileAnimating="true"
            :loadTilesWhileInteracting="true"
            style="height: 600px"
        >
            <ol-view
            ref="view"
            :center="center"
            :rotation="rotation"
            :zoom="zoom"
            :projection="projection"
            />
        </ol-map>
    </Layers.OlTileLayer>
  </Map.OlMap>


</template>

<style scoped>
.overlay-content {
  background: #c84031;
  color: white;
  box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
  padding: 10px 20px;
  font-size: 16px;
}
</style>
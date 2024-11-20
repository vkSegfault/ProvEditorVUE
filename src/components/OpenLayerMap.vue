<script setup lang="ts">
import { provide } from "vue";
import { Map, Layers, Sources, type Vue3OpenlayersGlobalOptions } from "vue3-openlayers";
import { ref, inject, onMounted } from "vue";


const options: Vue3OpenlayersGlobalOptions = {
  debug: true,
};

provide("ol-options", options);


const center = ref([40, 40]);
const projection = ref('EPSG:3857');
const zoom = ref(3);
const rotation = ref(0);

const format = inject('ol-format');
const geoJson = new format.GeoJSON();
</script>

<template>

  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 400px"
  >
    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
  </ol-map>

</template>
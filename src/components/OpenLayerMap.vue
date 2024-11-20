<script setup lang="ts">
import { provide } from "vue";
import { Map, Layers, Sources, type Vue3OpenlayersGlobalOptions } from "vue3-openlayers";
import { ref, inject, onMounted } from "vue";


const options: Vue3OpenlayersGlobalOptions = {
  debug: true,
};

provide("ol-options", options);


const center = ref([ 1003457, 6250962 ]);
const projection = ref('EPSG:3857');
const zoom = ref(3.6);
const rotation = ref(0);
const strokeWidth = ref(10);
const strokeColor = ref("red");

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

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature>
          <ol-geom-multi-polygon
            :coordinates="[
              [
                [
                  [1003457, 6250962],
                  [-98.842749, 19.69098],
                  [-98.84217, 19.693122],
                  [-98.844358, 19.693667],
                  [-98.844959, 19.691586],
                ],
              ],
              [
                [
                  [-98.84777, 19.684212],
                  [-98.849079, 19.680596],
                  [-98.845453, 19.679585],
                  [-98.844466, 19.683384],
                  [-98.84777, 19.684212],
                ],
              ],
            ]"
          ></ol-geom-multi-polygon>
          <ol-style>
            <ol-style-stroke
              :color="strokeColor"
              :width="strokeWidth"
            ></ol-style-stroke>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>


  </ol-map>

</template>

<style scoped>
.ol-map {
  position: relative;
}
.ol-map-loading:after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  margin-top: -40px;
  margin-left: -40px;
  border-radius: 50%;
  border: 5px solid rgba(180, 180, 180, 0.6);
  border-top-color: var(--vp-c-brand-1);
  animation: spinner 0.6s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
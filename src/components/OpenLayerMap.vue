<script setup lang="ts">
import { provide } from "vue";
import { Map, Layers, Sources, type Vue3OpenlayersGlobalOptions } from "vue3-openlayers";
import { ref, inject, onMounted } from "vue";
import proj4 from "proj4";
// import { DrawEvent } from "ol/interaction/Draw";
import type { Feature } from "ol";
import type { Geometry } from "ol/geom";
import { GeoJSON } from "ol/format";
import { type DrawEvent } from "ol/interaction/Draw";


const options: Vue3OpenlayersGlobalOptions = {
  debug: false,
};
provide("ol-options", options);



// Convert from Equirectangular projection to Spherical Mercator projection (Google web map)
const converter = (lon, lat) => {
  var x = (lon * 20037508.34) / 180;
  var y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180);
  y = (y * 20037508.34) / 180;
  return [x, y];
} 

console.log("Warsaw conversion: " + proj4("EPSG:4326", "EPSG:3857", [52.237049, 21.017532]) );
console.log("Warsaw conversion: " + converter(52.237049, 21.017532) );

// const center = ref( proj4("EPSG:4326", "EPSG:3857", [52.237049, 21.017532]) );
// const center = ref( converter(52.237049, 21.017532) );
const center = ref([ 2_000_000, 6_000_000 ]);
const projection = ref('EPSG:3857');
const zoom = ref(3.6);
const rotation = ref(0);

const drawEnable = ref(false);
const drawType = ref("Polygon");

const strokeWidth = ref(5);
const strokeColor = ref("red");

const format = inject('ol-format');

const geoJson = new format.GeoJSON();

const drawstart = (event) => {
  console.log("DRAW START: " + event);
};

const drawend = (event: DrawEvent) => {
  // const zones = ref<Feature<Geometry>[]>([]);
  const zones = ref<Feature | null>(null);
  zones.value = event.feature;

  console.log("DRAWNED POLYGON: " + zones.value.getGeometry() );
};
</script>

<template>

  <form>
    <fieldset>
      <label for="checkbox">Draw Mode Enabled</label>
      <input type="checkbox" id="checkbox" v-model="drawEnable" />
    </fieldset>
  </form>

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
      <ol-source-vector :projection="projection">
        <ol-interaction-draw
          v-if="drawEnable"
          :type="drawType"
          @drawend="drawend"
          @drawstart="drawstart"
        >
          <ol-style>
            <ol-style-stroke color="blue" :width="2"></ol-style-stroke>
            <ol-style-fill color="rgba(255, 255, 0, 0.4)"></ol-style-fill>
            <ol-style-circle :radius="5">
              <ol-style-fill color="#00dd11" />
              <ol-style-stroke color="blue" :width="2" />
            </ol-style-circle>
          </ol-style>
        </ol-interaction-draw>
      </ol-source-vector>

      <ol-style>
        <ol-style-stroke color="red" :width="2"></ol-style-stroke>
        <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>
        <ol-style-circle :radius="7">
          <ol-style-fill color="red"></ol-style-fill>
        </ol-style-circle>
      </ol-style>
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
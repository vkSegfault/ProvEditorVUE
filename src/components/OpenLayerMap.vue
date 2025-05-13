<script setup lang="ts">
import { provide, defineExpose } from "vue";
import { Map, Layers, Sources, type Vue3OpenlayersGlobalOptions } from "vue3-openlayers";
import { ref, inject, onMounted } from "vue";
import proj4 from "proj4";
// import { DrawEvent } from "ol/interaction/Draw";
import type { Feature } from "ol";
import { Collection } from "ol";
import type { Geometry } from "ol/geom";
import { GeoJSON } from "ol/format";
import { type DrawEvent } from "ol/interaction/Draw";
import { type SelectEvent } from "ol/interaction/Select";
import markerIcon from '@/assets/logo.svg';

const options: Vue3OpenlayersGlobalOptions = {
  debug: false,
};
provide("ol-options", options);


const polygon = ref([]);
const erase = () => {
  console.log( 'Erasing Polygon' );
  console.log( 'There are ' + zones.value.length + ' polygons' );

  for(let i = 0; i < zones.value.length; i++ ) {
    console.log( zones.value.at(i) );
  }

  zones.value.pop();
  
  console.log( 'There are ' + zones.value.length + ' polygons' );

}

defineExpose({
  polygon,
  erase,
});


// Convert from Equirectangular projection to Spherical Mercator projection (Google web map)
const converter = (lon, lat) => {
  var x = (lon * 20037508.34) / 180;
  var y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180);
  y = (y * 20037508.34) / 180;
  return [x, y];
} 

console.log("Warsaw conversion: " + proj4("EPSG:4326", "EPSG:3857", [52.237049, 21.017532]) );
console.log("Warsaw conversion: " + converter(52.237049, 21.017532) );

// Projected Coordinates (x, y): When you convert latitude and longitude into x and y coordinates in the EPSG:3857 projection, the values are in meters.
// The maximum and minimum x and y values are roughly 20026376.39, -20026376.39, 20048966.10, and -20048966.10, respectively. 
// Units: EPSG:3857 uses meters as its unit of measure

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

// this object will hold all coords of our Polygons - we use some global one (via Vuex Store) and save each one in them
const geojsonObject = {
  type: "FeatureCollection",
  crs: {
    type: "name",
    properties: {
      name: "EPSG:3857",
    },
  },
  features: [
    // {
    //   type: "Feature",
    //   geometry: {
    //     type: "Polygon",
    //     coordinates: [
    //       [
    //         [1367410.699338904, 5580425.463847231],
    //         [4130147.645083284, 6729414.193619426],
    //         [1845080.1712666703,8097872.680763839],
    //         [-736916.974288825,7207083.665547193],
    //       ],
    //     ],
    //   },
    // },
    // {
    //   type: "Feature",
    //   geometry: {
    //     type: "Polygon",
    //     coordinates: [
    //       [
    //         [-103.85636392303468, 38.10970692739486],
    //         [-103.86770698495866, 33.218572724914544],
    //         [-98.20654544301988, 33.6532810221672],
    //         [-98.4408283538437, 38.31894739375114],
    //         [-103.85636392303468, 38.10970692739486],
    //       ],
    //     ],
    //   },
    // },
  ],
};
const zones = ref<Feature<Geometry>[]>([]);
zones.value = new GeoJSON().readFeatures(geojsonObject);
const hoveredFeatures = ref(new Collection());
const selectedFeatures = ref(new Collection());
const selectConditions = inject("ol-selectconditions");
// TODO - implemennt both pointerMove (aka Hover) and Click conditions - we probably juist need to copy 
const selectHoverCondition = selectConditions.pointerMove;
const selectClickCondition = selectConditions.click;

const featureHovered = (event) => {
  console.log('HOVERED');
  hoveredFeatures.value = event.target.getFeatures();

  console.log( 'Province Hovered: ' );
  console.log(event);
};

const featureSelected = (event) => {
  console.log('SELECTED');
  selectedFeatures.value = event.target.getFeatures();

  console.log( 'Province Selected: ' );
  console.log(event);
};

const selectInteactionFilter = (feature) => {
  return feature.values_.name != undefined;
};

const drawstart = (event) => {
  console.log("DRAW START: " + event);
};

const drawend = (event: DrawEvent) => {
  console.log('DRAWNED');
  event.target.sketchCoords_[0].forEach(coord => {
    polygon.value.push(coord);
  });

  // ADD polygon (aka Feature) to polygon list
  zones.value.push(event.feature);
  // ADD newly drawn polygon to selected polygon list (== click it just after drawing it)
  // selectedFeatures.value.push(event.feature);

  drawEnable.value = false;
  
  
  // we use [0] index because we can draw more than one polygon at once (we won't but need to index it nonetheles) 
  console.log( "DRAWNED POLYGON: " + event.target.sketchCoords_[0] );
  console.log(event);
  console.log(polygon);
  console.log(zones.value);
  console.log(selectedFeatures.value);
};

</script>

<template>

  <form>
    <fieldset class="flex items-center  mb-4">
      <!-- class="w-5 h-5 appearance-none border cursor-pointer rounded-md border-gray-700 rounded-md mr-2 hover:border-green-500 hover:bg-green-100 checked:bg-no-repeat checked:bg-center checked:border-green-500 checked:bg-green-700" -->
      <input 
        type="checkbox"
        id="checkbox"
        class="checkbox appearance-none mr-2"
        v-model="drawEnable">
      <label for="checkbox" class="text-lg font-norma cursor-pointer text-gray-600">Draw Mode Enabled</label>
    </fieldset>
  </form>

  <ol-map
    ref="map"
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

    <!-- RENDER WHEN HOVERING -->
    <!--       :filter="selectInteactionFilter" -->
    <ol-interaction-select 
      v-if="!drawEnable"
      @select="featureHovered"
      :condition="selectHoverCondition"
      :features="hoveredFeatures"
    >
      <ol-style>
        <ol-style-stroke color="red" :width="3" />
        <ol-style-fill color="rgba(255, 0, 0, 0.2)" />
        <ol-style-icon :src="markerIcon" :scale="0.05"></ol-style-icon>
      </ol-style>
    </ol-interaction-select>

    <!-- RENDER WHEN SELECTED -->
     <!-- v-if="!drawEnable" -->
    <ol-interaction-select
      @select="featureSelected"
      :condition="selectClickCondition"
      :features="selectedFeatures"
    >
      <ol-style>
        <ol-style-stroke color="red" :width="4" />
        <ol-style-fill color="rgba(255, 0, 0, 0.5)" />
        <ol-style-icon :src="markerIcon" :scale="0.05"></ol-style-icon>
      </ol-style>
    </ol-interaction-select>

    <!-- DRAW MODE -->
    <ol-vector-layer :updateWhileAnimating="true" :updateWhileInteracting="true">
      <ol-source-vector :projection="projection" :features="zones">
        <ol-interaction-draw
          v-if="drawEnable"
          :stopClick="true"
          :type="drawType"
          @drawend="drawend"
          @drawstart="drawstart"
        >
          <!-- STYLE WHILE DRAWING -->
          <ol-style>
            <ol-style-stroke color="blue" :width="5"></ol-style-stroke>
            <ol-style-fill color="rgba(255, 255, 0, 0.4)"></ol-style-fill>
            <ol-style-circle :radius="5">
              <ol-style-fill color="#00dd11" />
              <ol-style-stroke color="blue" :width="2" />
            </ol-style-circle>
          </ol-style>
        </ol-interaction-draw>
        
        <ol-interaction-snap v-if="drawEnable" />
        
      </ol-source-vector>

      <ol-interaction-modify v-if="drawEnable" :features="selectedFeatures"></ol-interaction-modify>
      
      <!-- STYLE AFTER POLYGONS ARE DRAWN -->
      <ol-style>
        <ol-style-stroke color="red" :width="2"></ol-style-stroke>
        <ol-style-fill color="rgba(255,210,210,0.5)"></ol-style-fill>
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

input[type="checkbox"] {
  appearance: none;
  width: 24px;
  height: 24px;
  background: #eee;
  border: 3px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
}

input[type="checkbox"]:hover {
  border-color: #57cf5d;
  color: #6eb35c;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18)!important;
}

/* Custom checkmark */
input[type="checkbox"]:checked {
  background: #4caf50;
  border-color: #4caf50;
  position: relative;
}

input[type="checkbox"]:checked::before {
  content: "\2714"; /* Unicode heavy checkmark */
  position: absolute;
  top: 0px;
  left: 2px;
  width: 7px;
  height: 7px;
  color: white;
  font-size: 22px;
  padding: 0px 0px 0px 0px;
  top: -34%;
  left: -1%;
}
</style>
<template>
  <!-- qrCodeData QR.vue
    {{ qrCodeData }} -->
  <div v-show="qrCodeData">
    <div class="d-grid">
      <!-- Or -->
      <h2>Étape 2 : Customisez</h2>

      <div class="dropdown w-100">
        <button
          class="w-100 btn btn-primary btn-lg dropdown-toggle px-2"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Choisir mon image
        </button>
        <!-- {{ image }} -->
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a class="dropdown-item" v-on:click="this.selectImage('macron')"
              >Macron</a
            >
          </li>
          <li>
            <a class="dropdown-item" v-on:click="this.selectImage('nasa')"
              >Nasa</a
            >
          </li>
          <li>
            <a class="dropdown-item" v-on:click="this.selectImage('drake')"
              >Drake</a
            >
          </li>
          <li>
            <a class="dropdown-item" v-on:click="this.selectImage('illuminati')"
              >Illuminati</a
            >
          </li>
          <li>
            <a class="dropdown-item" v-on:click="this.selectImage('baby')"
              >Baby</a
            >
          </li>
          <li>
            <a class="dropdown-item" v-on:click="this.openFileBrowser()">
              <b-icon-upload />&nbsp;&nbsp; Importer une image</a
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <div class=""></div>

      <div class=""></div>
      <div class=""></div>
    </div>

    <input
      v-show="false"
      id="browse"
      type="file"
      accept="image/jpeg, image/png"
      @change="onUploadFile"
      hidden
    />

    <div class="beta d-flex justify-content-between mt-3">
      <div class="w-100">
        <VueQr3
          v-if="forceRendering"
          :data="qrCodeData"
          :qrOptions="{
            typeNumber: 0,
            mode: 'Byte',
            errorCorrectionLevel: 'H',
          }"
          :imageOptions="{
            hideBackgroundDots: false,
            imageSize: 0.8,
            margin: 0,
          }"
          :dotsOptions="{
            type: 'square',
            color: '#000000',
          }"
          :backgroundOptions="{ color: '#ffffff' }"
          :image="image"
          :cornersSquareOptions="{ type: 'square', color: '#000000' }"
          :cornersDotOptions="{ type: undefined, color: '#000000' }"
          fileExt="png"
          :download="true"
          myclass="my-qur w-100"
          imgclass="img-qr"
          downloadButton="mt-3 download-btn t-2 btn btn-primary btn-lg"
          :downloadOptions="{ name: 'mon-joli-pass', extension: 'png' }"
        >
        </VueQr3>
      </div>
    </div>
  </div>
  <!-- {{ forceRendering }} -->
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  name: "qr",
  components: {
    VueQr3: defineAsyncComponent(() =>
      Promise.resolve(import("vue3-qr-code-styling"))
    ),
  },

  props: {
    qrCodeData: String,
  },
  data() {
    return {
      image: require(`@/assets/memes/macron.png`),
      forceRendering: false,
    };
  },
  setup() {
    return {};
  },
  watch: {
    qrCodeData() {
      console.log("qrCodeData");
      this.refresh();
    },
  },
  async mounted() {},
  created() {},
  methods: {
    changeTxtButton() {
      var btn = document.querySelector(".download-btn");
      if (btn) btn.innerHTML = "Télécharger";
    },
    onUploadFile(event: { target: { files: any[] } }) {
      this.image = URL.createObjectURL(event.target.files[0]);
      this.refresh();
    },

    async refresh() {
      this.forceRendering = false;
      await this.sleep(50);
      this.forceRendering = true;
      await this.sleep(500);
      this.changeTxtButton();
    },
    openFileBrowser() {
      var e = document.getElementById("browse");
      if (e) {
        e.click();
      }
    },
    async selectImage(imageName: any) {
      this.forceRendering = false;
      await this.sleep(50);

      // this.qrCodeData = "qrCodeData";
      this.image = require(`@/assets/memes/${imageName}.png`);
      this.forceRendering = true;
      await this.sleep(500);
      this.changeTxtButton();
    },
    sleep: function (ms: number | undefined) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
});
</script>

<style>
.hidden {
  display: none;
}
.my-qur img {
  width: 100%;
}
.download-btn {
  width: 100%;
}
.beta {
  color: yellow-300;
  background-color: indigo-900;
}
</style>

<template>
  <div class="hello">
    <!-- {{ cameraPermission }} -->
    <div class="d-grid gap-2">
      <button
        v-if="cameraPermission == 'prompt'"
        v-on:click="askCameraPerm()"
        type="button"
        class="btn btn-lg btn-primary"
      >
        Autoriser la camera
      </button>
    </div>
    <h2 v-if="cameraPermission == 'granted'">Étape 1 : Scannez votre passe</h2>

    <!-- <qrcode-stream @detect="onDetect"></qrcode-stream> -->

    <div class="h-100 d-inline-block" style="width: 100%">
      <div id="reader"></div>
      <div class="loading-indicator" v-if="loading">Loading...</div>
    </div>

    <div class="container-xxl"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import qr from "./qr.vue";
// To use Html5QrcodeScanner (more info below)
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

// To use Html5Qrcode (more info below)
// import { Html5Qrcode } from "html5-qrcode";

import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";

@Options({
  components: { qr, QrcodeStream, QrcodeDropZone, QrcodeCapture },
  props: {
    msg: String,
  },
  data() {
    return {
      el: "#app",
      cameraPermission: "prompt",
    };
  },
  async mounted() {
    const context = this;
    // eslint-disable-next-line no-undef
    const permissionName = "camera" as PermissionName;

    var perm = await navigator.permissions.query({ name: permissionName });
    console.log(perm.state);
    this.cameraPermission = perm.state;
    if (this.cameraPermission == "granted") this.initScanner();

    setInterval(function () {
      context.deleteManualUpload();
    }, 500);
  },
  methods: {
    async askCameraPerm() {
      var context = this;
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function () {
          context.cameraPermission = "granted";
          context.initScanner();
        })
        .catch(function (err) {
          context.cameraPermission = "denied";
          console.log(err);
        });
    },
    initScanner() {
      console.log("initscanner");
      const context = this;

      function onScanSuccess(decodedText: any, decodedResult: any) {
        // handle the scanned code as you like, for example:
        console.log(`Code matched = ${decodedText}`, decodedResult);

        context.scrollToElement();
        window.navigator.vibrate(30); // vibre pendant 200ms
        context.$emit("childToParent", decodedText);
      }
      // eslint-disable-next-line no-unused-vars
      function onScanFailure(error: any) {
        // handle scan failure, usually better to ignore and keep scanning.
        // for example:
        // console.warn(`Code scan error = ${error}`);
      }
      const formatsToSupport = [Html5QrcodeSupportedFormats.QR_CODE];
      const html5QrCode = new Html5Qrcode("reader");
      const config = {
        formatsToSupport: formatsToSupport,
        fps: 10,
        aspectRatio: 1.777778,
        // qrbox: { width: 400, height: 400 },
      };
      // If you want to prefer back camera
      html5QrCode.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        onScanFailure
      );
    },
    deleteManualUpload() {
      var e = document.getElementById("reader__dashboard_section_swaplink");
      var p = e?.parentElement;
      if (p) p.style.display = "none";
    },
    async scrollToElement() {
      await this.sleep(150);
      window.scrollTo(
        0,
        document.body.scrollHeight || document.documentElement.scrollHeight
      );
    },
    sleep: function (ms: number | undefined) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
})
export default class HelloWorld extends Vue {
  msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#reader__dashboard {
  display: none !important;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

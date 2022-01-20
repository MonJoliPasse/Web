<template>
  <div class="hello">
    <div style="">
      <div class="h-100 d-inline-block" style="width: 100%">
        <div id="reader"></div>
      </div>
    </div>

    <div class="container-xxl"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import qr from "./qr.vue";
// To use Html5QrcodeScanner (more info below)
import { Html5QrcodeScanner } from "html5-qrcode";

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
    };
  },
  mounted() {
    // this.$emit("childToParent", "ssssss");

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

    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 400, height: 400 } },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    setInterval(function () {
      context.deleteManualUpload();
    }, 500);
  },
  methods: {
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

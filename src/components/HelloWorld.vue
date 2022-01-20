<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <!-- HelloWorld.vue {{ decodedData }} -->
    <qr :qrCodeData="decodedData"></qr>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import qr from "./qr.vue";

@Options({
  components: { qr },
  props: {
    msg: String,
    decodedData: String,
  },
})
export default class HelloWorld extends Vue {
  msg!: string;
  qrCodeData!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

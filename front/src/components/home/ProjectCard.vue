<template>
  <div>
    <div @click="$router.push({name: routeName})" :style="{cursor: 'pointer'}">
      <v-card width="300" class="ma-3">
        <v-card-title primary-title>{{title}}</v-card-title>
        <v-img :src="pathImage + image" contain></v-img>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "image", "routeName"],
  data() {
    return {
      pathImage: "/static/"
      // pathImage: "@/assets/cards/"
    };
  }
};
</script>
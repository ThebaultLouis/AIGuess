<template>
  <v-app>
    <v-app-bar app color="grey lighten-2">
      <v-toolbar-title class="headline text-uppercase">
        <div @click="$router.push('/')" :style="{cursor: 'pointer'}">
          <span>AI</span>
          <span class="font-weight-light">GUESS</span>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer></v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    // HelloWorld,
    // ProjectList
  },
  data: () => ({
    //
  })
};
</script>

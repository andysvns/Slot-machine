<template>
  <v-app>
    <AppNavbar />
    <v-main>
      <router-view> 
      </router-view>
    </v-main>
    <AppFooter /> 
  </v-app>
</template>

<script>


import AppFooter from "./components/AppFooter.vue";
import AppNavbar from "./components/AppNavbar.vue";


export default {
  name: 'App',

  components: {
    AppNavbar,
    AppFooter,
  },

  data: () => ({
    //
  }),
};
</script>


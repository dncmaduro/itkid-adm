<template>
  <div>
    <v-toolbar :elevation="6">
      <v-toolbar-title class="font-weight-bold">
        <nuxt-link to="/" class="logo">ITKid</nuxt-link>
        Web Admin
      </v-toolbar-title>
      <v-spacer />
      <v-btn>
        <nuxt-link to="/">Users</nuxt-link>
      </v-btn>
      <v-btn>
        <nuxt-link to="/">Categories</nuxt-link>
      </v-btn>
      <v-btn>
        <nuxt-link to="/">Courses</nuxt-link>
      </v-btn>
      <v-btn>
        <nuxt-link to="/">Fund Requests</nuxt-link>
      </v-btn>
    </v-toolbar>
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.logo {
  color: $primary-color;
}

a {
  color: black;
}
</style>

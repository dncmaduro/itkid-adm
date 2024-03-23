<template>
  <div>
    <v-toolbar :elevation="6">
      <v-toolbar-title class="font-weight-bold">
        <nuxt-link to="/" class="logo">ITKid</nuxt-link>
        Web Admin
      </v-toolbar-title>
    </v-toolbar>
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.logo {
  color: $primary-color;
}
</style>

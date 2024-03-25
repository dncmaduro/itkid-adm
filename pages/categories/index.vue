<template>
  <v-row class="mt-8" justify="center">
    <v-card class="w-50 text-center rounded">
      <v-card-title>Categories Management</v-card-title>
      <v-card-text class="mt-4">Type in the input to find category</v-card-text>
    </v-card>
  </v-row>
  <v-row class="mt-8 w-50 mx-auto">
    <v-text-field
      label="Search here..."
      variant="underlined"
      prepend-icon="mdi-magnify"
    >
    </v-text-field>
  </v-row>
  <nuxt-child />
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>

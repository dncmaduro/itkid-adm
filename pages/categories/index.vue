<template>
  <v-row class="mt-8" justify="center">
    <v-card class="w-50 text-center rounded">
      <v-card-title>Categories Management</v-card-title>
    </v-card>
  </v-row>
  <v-row class="mt-8 w-50 mx-auto">
    <v-col><category-add-form /></v-col>
    <v-col
      ><nuxt-link to="/categories/search">
        <v-btn><v-icon class="mr-2">mdi-magnify</v-icon>Search Category</v-btn>
      </nuxt-link></v-col
    >
  </v-row>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.v-col {
  display: flex;
  justify-content: center;

  .v-btn {
    color: $primary-color;
  }
}

.v-card {
  &-title {
    font-size: 1.75rem;
    font-weight: bold;
  }
}
</style>

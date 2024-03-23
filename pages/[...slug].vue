<template>
  <v-row justify="center" class="mt-8">
    <v-col>
      <v-icon size="80">mdi-note-off-outline</v-icon>

      <span>Page Not Found</span>
      <nuxt-link to="/">Back To Home Page</nuxt-link>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank",
});
</script>

<style scoped lang="scss">
.v-col {
  flex-direction: column;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
}

a {
  color: $primary-color;
}
</style>

<template>
  <v-row class="mt-8" justify="center">
    <v-card class="w-50 text-center rounded">
      <v-card-title>Categories Management</v-card-title>
      <v-card-text class="mt-4"
        >Type in the input to search category</v-card-text
      >
    </v-card>
  </v-row>
  <v-row class="mt-8 w-50 mx-auto">
    <v-text-field
      label="Search here..."
      variant="underlined"
      prepend-icon="mdi-magnify"
      v-model="query.searchQuery"
    >
    </v-text-field>
  </v-row>
  <v-row>
    <categories-list-categories :categories="categories.list" />
  </v-row>
</template>

<script setup lang="ts">
import type { ICategory } from "~/types/category/category";
const query = ref({
  searchQuery: "",
});

const categories = ref({
  list: [] as ICategory[],
});

const config = useRuntimeConfig();
let error = ref<unknown>();

const fetchCategories = async () => {
  const endpoint = `${config.public.apiBase}/categories/getCategoriesByString?searchQuery=${query.value.searchQuery}`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    categories.value.list = jsonData.categories as ICategory[];
  } catch (e) {
    error.value = e;
  }
};

const debouncedFetchCategories = debounce(fetchCategories, 500);

onMounted(debouncedFetchCategories);

watch(() => query.value.searchQuery, debouncedFetchCategories);
</script>

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

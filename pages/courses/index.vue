<template>
  <div>
    <v-row class="mt-8" justify="center">
      <v-card class="w-50 text-center rounded">
        <v-card-title>Users Management</v-card-title>
        <v-card-text class="mt-4">
          <div>
            <v-autocomplete
              label="Search among:"
              :items="Object.values(type)"
              v-model="query.type"
            ></v-autocomplete>
          </div>
          <div>
            <span>
              Or you can
              <courses-add-form />
            </span>
          </div>
        </v-card-text>
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
    <courses-list-courses :courses="courses.list" />
  </div>
</template>

<script setup lang="ts">
import type { ICategory } from "~/types/category/category";
import type { ICourse } from "~/types/course/course";
const type = {
  ALL: "All courses",
  CAT: "By category",
};
const config = useRuntimeConfig();
let error = ref<unknown>();

const query = ref({
  searchQuery: "",
  type: type.ALL,
});

const courses = ref({
  list: [] as ICourse[],
});

const categories = ref({
  list: [] as ICategory[],
});

const fetchCourses = async () => {
  const endpoint = `${config.public.apiBase}/courses/getCoursesByString?searchQuery=${query.value.searchQuery}`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    courses.value.list = jsonData.courses as ICourse[];
  } catch (e) {
    error.value = e;
  }
};

const debouncedFetchCourses = debounce(fetchCourses, 500);

onMounted(() => {
  debouncedFetchCourses(), fetchCategories();
});

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

watch(
  () => query.value.searchQuery,
  () => {
    console.log(query.value.searchQuery);
  }
);

watch(
  () => query.value.type,
  () => {
    if (query.value.type === type.ALL) {
      debouncedFetchCourses();
    }
  }
);
</script>

<style scoped></style>

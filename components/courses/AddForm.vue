<template>
  <v-dialog max-width="340">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" class="ml-2"> Add new course </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card prepend-icon="mdi-plus" title="New course">
        <v-card-text>
          <v-form>
            <v-autocomplete
              v-model="form.category"
              label="Choose category"
              :items="categoryItems"
              item-value="id"
              item-title="name"
              return-object
            ></v-autocomplete>
            <v-text-field
              label="Name"
              variant="underlined"
              v-model="form.name"
              :rules="nonEmptyRules"
            ></v-text-field>
            <v-text-field
              label="Image Link"
              variant="underlined"
              v-model="form.image"
              :rules="nonEmptyRules"
            ></v-text-field>
          </v-form>
          <v-btn
            class="submit"
            text="Submit"
            type="submit"
            @click="
              isActive.value = false;
              submit();
            "
          ></v-btn>
          <v-btn
            class="cancel ml-4"
            text="Cancel"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

import type { ICategory } from "~/types/category/category";
import type { IAddCourse } from "~/types/course/addForm";

const form = ref<IAddCourse>({
  category: {
    name: "",
  } as ICategory,
  name: "",
  fee: 0,
  image: "",
});

const categories = ref({
  list: [] as ICategory[],
});

const error = ref<unknown>();

const submit = async () => {
  const endpoint = `${config.public.apiBase}/courses/addCourse`;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.value.name,
        fee: form.value.fee,
        image: form.value.image,
        categoryId: form.value.category.id,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (e) {
    error.value = e;
  }
};

const fetchCategories = async () => {
  const endpoint = `${config.public.apiBase}/categories/getCategoriesByString?searchQuery=`;
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
  () => form.value.categoryId,
  () => {
    console.log(form.value.categoryId);
  }
);

onMounted(() => {
  fetchCategories();
  console.log(toRaw(categories.value));
});

const categoryItems = computed(() => {
  return Object.entries(categories.value.list).map(([id, category]) => ({
    categoryId: id,
    ...category,
  }));
});
</script>

<style scoped></style>

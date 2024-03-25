<template>
  <div class="ml-12 mt-8">
    <v-row class="ml-12">
      <nuxt-link to="/categories/search"
        ><v-icon>mdi-arrow-left</v-icon>Back to Categories Search</nuxt-link
      >
    </v-row>
    <v-row class="mt-8">
      <span class="mx-auto title">Category Details</span>
    </v-row>
    <v-row v-if="!category" class="mt-8">
      <span class="mx-auto"> Loading... <v-icon>mdi-loading</v-icon> </span>
    </v-row>
    <v-row v-else class="category mx-auto mt-8 w-50 rounded-lg">
      <v-form class="w-100">
        <v-text-field
          label="Name"
          variant="underlined"
          v-model="updatedCategory.name"
          :readonly="!isEditing"
        ></v-text-field>
        <v-btn
          v-if="isEditing"
          type="submit"
          class="submit rounded"
          @click="submit"
          >Submit</v-btn
        >
      </v-form>
      <div v-if="!isEditing">
        <v-btn @click="edit" class="mt-8 rounded">Edit details</v-btn>
      </div>
      <div v-else>
        <v-btn @click="cancel" class="cancel mt-2 rounded">Cancel</v-btn>
      </div>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import type { ICategory } from "~/types/category/category";
import type { IUpdateCategory } from "~/types/category/updateCategory";
const config = useRuntimeConfig();

const route = useRoute();
const id = route.params.id;

const isEditing = ref(false);
let error = ref<unknown>();
const category = ref<ICategory>();
const updatedCategory = ref<IUpdateCategory>({
  id: 0,
  name: "",
});

const convert = () => {
  if (category.value) {
    updatedCategory.value.id = category.value.id;
    updatedCategory.value.name = category.value.name;
  }
};

const fetchCategory = async () => {
  const endpoint = `${config.public.apiBase}/categories/getCategoryById?id=${id}`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();

    category.value = jsonData.category as ICategory;
  } catch (e) {
    error.value = e;
  }
};

const submit = async () => {
  const endpoint = `${config.public.apiBase}/categories/updateCategory`;
  try {
    console.log(updatedCategory.value);
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCategory.value),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // await fetchCategory();
    convert();
  } catch (e) {
    error.value = e;
  }
};

onMounted(async () => {
  await fetchCategory();
  convert();
});

const edit = () => {
  isEditing.value = !isEditing.value;
};

const cancel = () => {
  convert();
  isEditing.value = !isEditing.value;
};
</script>

<style scoped lang="scss">
a {
  color: $primary-color;
  font-size: 1.25rem;
}

.title {
  font-weight: bold;
  font-size: 2rem;
}

.user {
  border: 1px solid $grey-c-color;
  padding: 16px;
}

button {
  padding: 6px 10px;
  color: white;
  background-color: $primary-color;
}

.cancel {
  background-color: $grey-6-color;
}

.submit {
  background-color: $primary-color;
  color: white;
}
</style>

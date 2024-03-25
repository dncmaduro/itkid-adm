<template>
  <div v-if="!categories.length" class="w-100 text-center">
    Loading...<v-icon>mdi-loading</v-icon>
  </div>
  <div v-else class="w-100">
    <v-table height="400px" fixed-header class="w-50 mx-auto">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Access</th>
          <th class="text-left"></th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categories" :key="index">
          <td>{{ category.name }}</td>
          <td>{{ category.access }}</td>
          <td>
            <v-btn class="delete" @click="() => deleteCategory(category.id)"
              >Delete</v-btn
            >
          </td>
          <td><v-btn class="details">Details</v-btn></td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import type { ICategory } from "~/types/category/category";
const config = useRuntimeConfig();
const error = ref<unknown>();
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const categories = ref<ICategory[]>([]);

watch(
  () => props.categories,
  () => (categories.value = toRaw(props.categories) as ICategory[])
);

const deleteCategory = async (id: number) => {
  const endpoint = `${config.public.apiBase}/categories/deleteCategory`;
  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (e) {
    error.value = e;
  }
};
</script>

<style scoped lang="scss">
.delete {
  background-color: $cancel-color;
  color: white;
}

.details {
  background-color: $primary-color;
  color: white;
}
</style>

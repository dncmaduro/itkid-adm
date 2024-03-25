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
          <td><v-btn class="delete">Delete</v-btn></td>
          <td><v-btn class="details">Details</v-btn></td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import type { ICategory } from "~/types/category/category";
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

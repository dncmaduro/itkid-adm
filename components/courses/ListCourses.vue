<template>
  <div v-if="!courses.length" class="w-100 text-center">
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
        <tr v-for="(course, index) in courses" :key="index">
          <td>{{ course.name }}</td>
          <td>{{ course.access }}</td>
          <td>
            <v-btn class="delete" @click="() => deleteCategory(course.id)"
              >Delete</v-btn
            >
          </td>
          <td>
            <nuxt-link :to="`/courses/${course.id}`"
              ><v-btn class="details">Details</v-btn></nuxt-link
            >
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import type { ICourse } from "~/types/course/course";
const props = defineProps({
  courses: {
    type: Array,
    required: true,
  },
});

const courses = ref<ICourse[]>([]);

watch(
  () => props.courses,
  () => (courses.value = toRaw(props.courses) as ICourse[])
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

<template>
  <div v-if="!users.length" class="w-100 text-center">
    Loading...<v-icon>mdi-loading</v-icon>
  </div>
  <div v-else class="w-100">
    <v-table height="400px" fixed-header class="w-50 mx-auto">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Email</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <nuxt-link :to="`/users/${user.id}`">
              <v-btn> View details</v-btn>
            </nuxt-link>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import type { IUser } from "~/types/user/user";
const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});

const users = ref<IUser[]>([]);

watch(
  () => props.users,
  () => (users.value = toRaw(props.users) as IUser[])
);
</script>

<style scoped lang="scss">
.v-btn {
  color: $primary-color;
}
</style>

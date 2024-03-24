<template>
  <div v-if="!users.length" class="w-100 text-center">
    Loading...<v-icon>mdi-loading</v-icon>
  </div>
  <div v-else class="w-100">
    <v-card
      class="mx-auto my-4"
      border
      :elevation="2"
      v-for="(user, index) in users"
      :key="index"
    >
      <v-card-title>{{ user.name }}</v-card-title>
      <v-card-subtitle>{{ user.email }}</v-card-subtitle>
      <v-card-actions class="w-100">
        <nuxt-link to="/users">View details</nuxt-link>
      </v-card-actions>
    </v-card>
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
.v-card {
  width: 40%;

  &-actions {
    justify-content: flex-end;

    a {
      color: $primary-color;
    }
  }

  &-title {
    padding-bottom: 0;
  }
}
</style>

<template>
  <v-row class="mt-8" justify="center">
    <v-card class="w-50 text-center rounded">
      <v-card-title>Users Management</v-card-title>
      <v-card-text class="mt-4"
        >Type in the input. Users will be found by email or name</v-card-text
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
    <users-list-users :users="users.list" />
  </v-row>
  <nuxt-child />
</template>

<script setup lang="ts">
import type { IUser } from "~/types/user/user";

const query = ref({
  searchQuery: "",
});

const users = ref({
  list: [] as IUser[],
});

const config = useRuntimeConfig();

let data = ref<Response>();
let error = ref<unknown>();

type Procedure = (...args: any[]) => void;

function debounce<F extends Procedure>(
  func: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timeoutId: NodeJS.Timeout | undefined;
  return (...args: Parameters<F>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

const fetchUsers = async () => {
  const endpoint = `${config.public.apiBase}/users/getUsersByString?searchQuery=${query.value.searchQuery}`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    users.value.list = jsonData.users as IUser[];
  } catch (e) {
    error.value = e;
  }
};

const debouncedFetchUsers = debounce(fetchUsers, 500);

onMounted(debouncedFetchUsers);

watch(() => query.value.searchQuery, debouncedFetchUsers);
</script>

<style scoped lang="scss">
.v-card {
  box-shadow: none;

  &-title {
    font-size: 1.75rem;
    font-weight: bold;
  }

  &-text {
    font-size: 1.25rem;
  }
}
</style>

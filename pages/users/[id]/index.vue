<template>
  <div class="ml-12 mt-8">
    <v-row class="ml-12">
      <nuxt-link to="/users"
        ><v-icon>mdi-arrow-left</v-icon>Back to Users Management Page</nuxt-link
      >
    </v-row>
    <v-row class="mt-8">
      <span class="mx-auto title">User Details</span>
    </v-row>
    <v-row v-if="!user" class="mt-8">
      <span class="mx-auto">
        Loading...
        <v-icon>mdi-loading</v-icon>
      </span>
    </v-row>
    <v-row v-else class="user mx-auto mt-8 w-50 rounded-lg">
      <v-form class="w-100">
        <v-text-field
          label="Email"
          variant="underlined"
          v-model="user.email"
          readonly
        >
        </v-text-field>
        <v-text-field
          label="Name (can edit)"
          variant="underlined"
          v-model="updatedUser.name"
          :readonly="!isEditing"
          :rules="nameRules"
        >
        </v-text-field>
        <v-text-field
          label="Phone (can edit)"
          variant="underlined"
          v-model="updatedUser.phone"
          :readonly="!isEditing"
          :rules="phoneRules"
        >
        </v-text-field>
        <v-text-field
          label="Date of birth (can edit)"
          variant="underlined"
          v-model="updatedUser.dob"
          :readonly="!isEditing"
          :rules="dateRules"
        >
        </v-text-field>
        <v-text-field
          label="Wallet"
          variant="underlined"
          v-model="user.wallet"
          disabled
        >
        </v-text-field>
        <v-text-field
          label="Points"
          variant="underlined"
          v-model="user.points"
          disabled
        >
        </v-text-field>
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
import type { IUser } from "~/types/user/user";
import type { IUpdateUser } from "~/types/user/updateUser";
const config = useRuntimeConfig();

const isEditing = ref(false);

const route = useRoute();
const id = route.params.id;

let error = ref<unknown>();
const user = ref<IUser>();
const updatedUser = ref<IUpdateUser>({
  id: 0,
  dob: "",
  name: "",
  email: "",
  phone: "",
  password: "",
});

const fetchUser = async () => {
  const endpoint = `${config.public.apiBase}/users/getUserById?id=${id}`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    user.value = jsonData.user as IUser;
  } catch (e) {
    error.value = e;
  }
};

const submit = async () => {
  const endpoint = `${config.public.apiBase}/users/updateUser`;
  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser.value),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    await fetchUser();
    convert(user.value, updatedUser.value);
    isEditing.value = !isEditing.value;
  } catch (e) {
    error.value = e;
  }
};

onMounted(async () => {
  await fetchUser();
  convert(user.value, updatedUser.value);
});

const edit = () => {
  isEditing.value = !isEditing.value;
};

const cancel = () => {
  convert(user.value, updatedUser.value);
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

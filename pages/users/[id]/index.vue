<template>
  <div class="ml-12 mt-8">
    <v-row class="ml-12">
      <nuxt-link to="/users"
        ><v-icon>mdi-arrow-left</v-icon>Back to Users Management Page</nuxt-link
      >
    </v-row>
    <v-row class="mt-8">
      <span class="mx-auto">User Details</span>
    </v-row>
    <v-row v-if="!user" class="mt-8">
      <span class="mx-auto">
        Loading...
        <v-icon>mdi-loading</v-icon>
      </span>
    </v-row>
    <v-row v-else class="mx-auto mt-8 w-50">
      <v-form class="w-100">
        <v-text-field
          label="Email"
          variant="underlined"
          v-model="user.email"
          readonly
        >
        </v-text-field>
        <v-text-field
          label="Name"
          variant="underlined"
          v-model="updatedUser.name"
          :readonly="!isEditing"
        >
        </v-text-field>
        <v-text-field
          label="Phone"
          variant="underlined"
          v-model="updatedUser.phone"
          :readonly="!isEditing"
        >
        </v-text-field>
        <v-text-field
          label="Date of birth"
          variant="underlined"
          v-model="updatedUser.dob"
          :readonly="!isEditing"
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
      </v-form>
      <div v-if="!isEditing">
        <button @click="edit" class="mt-8 rounded">Edit details</button>
      </div>
      <div v-else>
        <button @click="submit" class="submit mt-8 rounded">Submit</button>
        <button @click="convert" class="cancel ml-4 mt-8 rounded">
          Cancel
        </button>
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

const convert = () => {
  if (user.value) {
    updatedUser.value.id = user.value.id;
    updatedUser.value.dob = user.value.dob;
    updatedUser.value.phone = user.value.phone;
    updatedUser.value.name = user.value.name;
    updatedUser.value.email = user.value.email;
    updatedUser.value.password = user.value.password;
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
    convert();
  } catch (e) {
    error.value = e;
  }
};

onMounted(async () => {
  await fetchUser();
  convert();
});

const edit = () => {
  isEditing.value = !isEditing.value;
};
</script>

<style scoped lang="scss">
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

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
type Rule = (input: string) => true | string;

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
    isEditing.value = !isEditing.value;
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

const cancel = () => {
  convert();
  isEditing.value = !isEditing.value;
};

const nameRules: Ref<Rule[]> = ref([
  (name: string) => {
    if (!name || name.trim() === "") {
      return "Name cannot be empty!";
    }
    const regex = /[^a-zA-Z\u00C0-\u1EF9\s]/;
    return regex.test(name) ? "Wrong name format!" : true;
  },
]);

const dateRules: Ref<Rule[]> = ref([
  (date: string) => {
    if (!date || date.trim() === "") {
      return "Date cannot be empty!";
    }
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return regex.test(date)
      ? true
      : "Wrong date format! Please use 'yyyy-mm-dd'.";
  },
]);

const phoneRules: Ref<Rule[]> = ref([
  (phone: string) => {
    if (!phone || phone.trim() === "") {
      return "Phone number cannot be empty!";
    }
    const regex = /^\d{10}$/;
    return regex.test(phone)
      ? true
      : "Wrong phone number format! Please use a 10-digit number.";
  },
]);
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

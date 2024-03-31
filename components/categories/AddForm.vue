<template>
  <v-dialog max-width="340">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" prepend-icon="mdi-package" width="204">
        Add new category
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card prepend-icon="mdi-plus" title="New category">
        <v-card-text>
          <v-form>
            <v-text-field
              label="Name"
              variant="underlined"
              v-model="form.name"
              :rules="nonEmptyRules"
            ></v-text-field>
          </v-form>
          <v-btn
            class="submit"
            text="Submit"
            type="submit"
            @click="
              isActive.value = false;
              submit();
            "
          ></v-btn>
          <v-btn
            class="cancel ml-4"
            text="Cancel"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
import type { IAddCategory } from "~/types/category/addForm";

const form = ref<IAddCategory>({
  name: "",
});
const error = ref<unknown>();

const submit = async () => {
  const endpoint = `${config.public.apiBase}/categories/addCategory`;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.value),
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
.v-btn {
  color: $primary-color;
}

.submit {
  color: white;
  background-color: $primary-color;
}

.cancel {
  color: white;
  background-color: $grey-6-color;
}
</style>

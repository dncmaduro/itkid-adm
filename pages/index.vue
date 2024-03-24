<template>
  <v-row justify="center">
    <v-col align="center" class="intro">
      <v-card class="w-50 mt-10 py-10">
        <v-card-items>
          <v-card-title>Welcome to ITKid Web Admin</v-card-title>
        </v-card-items>
        <v-card-text
          >Let's start with something below
          <v-icon size="32">mdi-arrow-down</v-icon></v-card-text
        >
      </v-card>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col align="center" class="item">
      <v-card class="item w-75 mt-10 pt-10 pb-4">
        <v-card-items>
          <v-card-title
            ><v-icon>mdi-account</v-icon>Users Management</v-card-title
          >
          <v-card-subtitle
            >View, search, delete, ... with all users' details</v-card-subtitle
          >
        </v-card-items>
        <v-card-actions>
          <nuxt-link to="/users"
            >Go To <v-icon>mdi-arrow-right</v-icon></nuxt-link
          >
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col align="center" class="item">
      <v-card class="item w-75 mt-10 pt-10 pb-4">
        <v-card-items>
          <v-card-title
            ><v-icon>mdi-shape-plus</v-icon>Categories Management</v-card-title
          >
          <v-card-subtitle
            >Search, create, edit, ... with all categories</v-card-subtitle
          >
        </v-card-items>
        <v-card-actions>
          <nuxt-link to="/users"
            >Go To <v-icon>mdi-arrow-right</v-icon></nuxt-link
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col align="center" class="item">
      <v-card class="item w-75 mt-10 pt-10 pb-4">
        <v-card-items>
          <v-card-title
            ><v-icon>mdi-book-open</v-icon>Courses Management</v-card-title
          >
          <v-card-subtitle
            >Search, create, edit, ... with all courses</v-card-subtitle
          >
        </v-card-items>
        <v-card-actions>
          <nuxt-link to="/users"
            >Go To <v-icon>mdi-arrow-right</v-icon></nuxt-link
          >
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col align="center" class="item">
      <v-card class="item w-75 mt-10 pt-10 pb-4">
        <v-card-items>
          <v-card-title
            ><v-icon>mdi-cash</v-icon>Fund Requests Management</v-card-title
          >
          <v-card-subtitle>Search, view fund requests</v-card-subtitle>
        </v-card-items>
        <v-card-actions>
          <nuxt-link to="/users"
            >Go To <v-icon>mdi-arrow-right</v-icon></nuxt-link
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});
</script>

<style scoped lang="scss">
.intro {
  .v-card {
    &-title {
      font-size: 2.5rem;
      color: $primary-color;
      font-weight: bold;
    }

    &-text {
      font-size: 1.5rem;
    }
  }
}

.item {
  .v-card {
    &-title {
      font-size: 1.75rem;

      i {
        margin-right: 12px;
      }
    }

    &-subtitle {
      font-size: 1.25rem;
      margin-top: 6px;
    }

    &-actions {
      font-size: 1.25rem;
      width: 100%;
      justify-content: flex-end;
      margin-top: 12px;

      a {
        color: $primary-color;
      }
    }
  }
}
</style>

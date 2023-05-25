<script setup>
import { reactive, onMounted, watch } from "vue";
import {useRoute, useRouter} from "vue-router"
import axios from "axios";
const route = useRoute()
const router = useRouter();

const search = reactive({
  value: "",
  films: [],
});

watch(
  () => [search.value],
  () => {
    if (search.value === "") {
      router.push({ name: "movies" });
    } else {
      router.push({ name: "movies_search", params: { query: search.value } });
    }
  }
);
</script>

<template>
  <v-text-field
    v-model="search.value"
    label="Rechercher un film (titre, année, réalisateur)"
    hide-details
    class="mr-5"
  >
    <template v-slot:append-inner>
      <v-icon @click="router.push({name: 'movies'}); search.value=''">mdi-close</v-icon>
    </template>
    <template v-slot:append>
      <v-icon @click="router.push({name: 'movies_search', params: {query: search.value}})">mdi-magnify</v-icon>
    </template>
  </v-text-field>
</template>

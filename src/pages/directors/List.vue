<script setup>
import { reactive, watch, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Film from "../../components/Film.vue";
import FilmPreview from "../../components/FilmPreview.vue";
import axios from "axios";

import moment from "moment";
import "moment/dist/locale/fr";
moment.locale("fr");
const router = useRouter();

const API_URL = "http://127.0.0.1:3000";
const API_KEY = "a1920a0";
const directors = ref([]);

// INIT
const emit = defineEmits(["changeTitle"]);
onMounted(function () {
  get();
  emit("changeTitle", "Liste des réalisateurs");
});

// GET FILMS
const get = () => {
  axios.get(API_URL + "/directors/getAll").then((res) => {
    directors.value = res.data;
  });
};

// REMOVE DIRECTOR
const remove = async (id) => {
  await axios.post(API_URL + "/directors/delete", { id }).then((res) => {
    get();
  });
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <h1>Liste des réalisateurs ({{ directors.length }})</h1>
    </v-col>

    <v-col v-if="directors">
      <v-table fixed-header>
        <thead>
          <tr>
            <th class="text-left">Nom Prénom</th>
            <th class="text-left">Nationalité</th>
            <th class="text-left">Date de naissance</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="director in directors" :key="director.name">
            <td>{{ director.name }}</td>
            <td>{{ director.nationality }}</td>
            <td>{{ director.birthdate ? moment(director.birthdate).format('LL') : "" }}</td>
            <td>
              <router-link style="color: inherit" :to="{ name: 'directors_edit', params: {id: director._id}}">
                <v-icon class="mr-3">mdi-pencil-outline</v-icon>
              </router-link>
                
              <v-icon @click="remove(director._id)">mdi-delete-outline</v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
    <v-col cols="12" class="my-5">
      <router-link style="color: inherit; text-decoration: none" :to="{ name: 'directors_add' }">
        <v-btn prepend-icon="mdi-plus" color="indigo">Ajouter un réalisateur</v-btn>
      </router-link>
    </v-col>
  </v-row>
</template>

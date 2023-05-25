<script setup>
import moment from "moment";
import "moment/dist/locale/fr";
import {useRouter} from "vue-router";
import axios from "axios";
const router = useRouter(); 

moment.locale("fr");
const props = defineProps(["film"]);
const API_URL = "http://127.0.0.1:3000";

// REMOVE FILM
const remove = async (id) => {
  await axios.post(API_URL + "/movies/delete", { id }).then((res) => {
    router.push({name: "movies"})
  });
};

</script>

<template>
  <v-card v-if="film" color="indigo" theme="dark" class="mb-5">
    <v-row>
      <v-col cols="8">
        <div class="h-100 d-flex flex-column justify-between">
          <div>
            <v-card-title class="text-h4 text-uppercase pt-4 mb-2 position-relative"> {{ film.title }} </v-card-title>

            <v-card-text>
              <div class="d-flex flex-row mb-3">
                <p class="me-10" v-if="film.year"><v-icon class="mr-2">mdi-calendar</v-icon>Le {{ moment(film.year).format('LL') }}</p>
                <p class="" v-if="film.genre"><v-icon class="mr-2">mdi-label</v-icon>{{ film.genre }}</p>
              </div>

              <p class="text-medium-emphasis mb-5">{{ film.description }}</p>

              <p class="text-subtitle-1 mb-2 text-decoration-underline">A propos de l'auteur</p>
              <p class="mb-2 d-flex align-center" v-if="film.director"><v-icon class="mr-2">mdi-account-tie-hat</v-icon>Le {{ film.director.name }}</p>
              <p class="mb-2 d-flex align-center" v-if="film.director"><v-icon class="mr-2">mdi-cake</v-icon>{{ moment(film.director.birthdate).format('LL') }}</p>
              <p class="mb-5 d-flex align-center" v-if="film.director"><v-icon class="mr-2">mdi-city</v-icon>{{ film.director.nationality }}</p>

            </v-card-text>
          </div>
          
          <v-spacer></v-spacer>

          <v-card-actions class="mb-2">
            <router-link style="color: inherit; text-decoration: none" :to="{ name: 'movies_edit', params: { id: film._id } }">
              <v-btn class="ms-2 px-4" variant="outlined">MODIFIER</v-btn>
            </router-link>

            <v-btn @click="remove(film._id)" class="ms-2 px-4" variant="outlined">SUPPRIMER</v-btn>
          </v-card-actions>
        </div>
      </v-col>

      <v-col cols="4">
        <div class="h-100 md-h-25 d-flex justify-center align-center">  
          <v-img :src="film.poster ? '../api/uploads/posters/' + film.poster : film.api_poster"></v-img>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
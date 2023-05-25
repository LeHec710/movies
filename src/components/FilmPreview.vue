<script setup>
import moment from "moment";
import "moment/dist/locale/fr";
import { useRouter } from "vue-router";
import axios from "axios";
import { onMounted, ref } from "vue";
const router = useRouter();

moment.locale("fr");
const props = defineProps(["film"]);
const API_URL = "http://127.0.0.1:3000";

const emit = defineEmits(["updateFilms"]);

// REMOVE FILM
const remove = async (id) => {
  await axios.post(API_URL + "/movies/delete", { id }).then((res) => {
    emit("updateFilms");
    router.push({ name: "movies" });
  });
  
};
</script>

<template>
  <v-card @mouseover="film.hover = true" @mouseleave="film.hover = false">
    <v-img
      aspect-ratio="16/9"
      :src="film.poster ? '/api/uploads/posters/' + film.poster : film.api_poster"
      cover
      style="height: 280px; background-color: black"
    ></v-img>
    <v-expand-transition>
      <v-card
        class="card-reveal"
        color="indigo"
        v-if="film.hover"
        :title="film.title.toUpperCase()"
      >
        <v-card-subtitle>
          <p v-if="film.year">Le {{ moment(film.year).format("LL") }}</p>
          <p v-if="film.director">Par {{ film.director.name }}</p>
        </v-card-subtitle>
        <v-card-actions>
          <router-link
            :to="{ name: 'movies_details', params: { id: film._id } }"
            style="color: inherit; text-decoration: none"
          >
            <v-btn icon="mdi-eye"></v-btn>
          </router-link>
          <router-link
            :to="{ name: 'movies_edit', params: { id: film._id } }"
            style="color: inherit; text-decoration: none"
          >
            <v-btn icon="mdi-pencil"></v-btn>
          </router-link>
          <v-btn @click="remove(film._id)" icon="mdi-delete"></v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<style scoped>
.card-reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
  max-height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.9);
}
</style>

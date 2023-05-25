<script setup>
import { reactive, watch, ref, onMounted } from "vue";
import Film from "../../components/Film.vue";
import FilmPreview from "../../components/FilmPreview.vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const API_MOVIES_URL = "https://www.omdbapi.com/?apikey=a1920a0&t=";
const API_URL = "http://127.0.0.1:3000";
const API_KEY = "a1920a0";
const films = ref([]);
const filtered_films = ref([]);

// INIT
const emit = defineEmits(["changeTitle"]);

const search = reactive({
  value: "",
  films: [...films.value],
});

onMounted(function () {
  emit("changeTitle", "Recherche de film");
  searchFilms();
});

// SEARCH
watch(
  () => [route.params.query],
  () => {
    searchFilms();
  }
);

const searchFilms = () => {
  if (route.params.query === "") router.push({ name: "movies" });
  search.value = route.params.query;
  axios.post(API_URL + "/movies/search", { query: search.value }).then((res) => {
    search.films = res.data;
    search.films.map((film) => {
      // get director
      if (film.director) {
        axios.get(API_URL + "/directors/get/" + film.director).then(res => {
          film.director = res.data
        })
      }

      if (!film.poster) {
        axios.get(API_MOVIES_URL + film.title).then((res) => {
          film.api_poster = res.data.Poster;
        });
      }
    });
  });
};
</script>

<template>
  <v-row>
    <v-col>
      <h1>Recherche de films ({{ search.films.length }})</h1>
    </v-col>

    <v-col class="mt-2" cols="12">
      <strong v-if="search.films && search.films.length"
        >Résultats pour: {{ search.value }}</strong
      >
      <strong v-else>Aucun résultat pour: {{ search.value }}</strong>
    </v-col>

    <v-col v-for="film in search.films" :key="`${film}`" cols="4" md="3">
      <FilmPreview :film="film" />
    </v-col>
  </v-row>
</template>

import { createWebHistory, createRouter } from "vue-router";
import MovieList from "./pages/movies/List.vue";
import MovieSearch from "./pages/movies/Search.vue";
import MovieEdit from "./pages/movies/Edit.vue";
import MovieAdd from "./pages/movies/Add.vue";
import MovieDetails from "./pages/movies/Details.vue";

import DirectorAdd from "./pages/directors/Add.vue";
import DirectorList from "./pages/directors/List.vue";
import DirectorEdit from "./pages/directors/Edit.vue";

const routes = [
  {
    path: "/",
    alias: "/movies",
    name: "movies",
    component: MovieList
  },
  {
    path: "/movies/search/:query",
    name: "movies_search",
    component: MovieSearch
  },
  {
    path: "/movies/:id",
    name: "movies_details",
    component: MovieDetails
  },
  {
    path: "/movies/:id/edit",
    name: "movies_edit",
    component: MovieEdit
  },
  {
    path: "/movies/add",
    name: "movies_add",
    component: MovieAdd
  },

  {
    path: "/directors",
    name: "directors",
    component: DirectorList
  },
  {
    path: "/directors/add",
    name: "directors_add",
    component: DirectorAdd
  },
  {
    path: "/directors/:id/edit",
    name: "directors_edit",
    component: DirectorEdit
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
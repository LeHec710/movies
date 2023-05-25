<script setup>
import Films from "./pages/movies/List.vue";
import SearchFilm from "./components/SearchFilm.vue";
import { ref } from "vue";
import {useRouter} from "vue-router";
const router = useRouter();

const drawer = ref(null);
const title = ref("Default title");

const changeTitle = (_title) => {
  title.value = _title;
  document.title = "TD VUE | " + _title;
};
</script>

<template>
  <v-app id="app">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title ng-if="title">{{ title }}</v-toolbar-title>

      <SearchFilm></SearchFilm>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list nav>
        <v-list-item prepend-icon="">FILMS</v-list-item>
        <router-link
          :to="{ name: 'movies' }"
          style="color: inherit; text-decoration: none"
          v-slot="{isActive}"
        >
          <v-list-item :class="isActive && 'bg-indigo'" prepend-icon="mdi-format-list-bulleted" value="movies_list"
            >LISTE DES FILMS</v-list-item
          >
        </router-link>

        <router-link
          :to="{ name: 'movies_add' }"
          style="color: inherit; text-decoration: none"
          v-slot="{isActive}"
        >
          <v-list-item :class="isActive && 'bg-indigo'" prepend-icon="mdi-plus" value="movies_add">AJOUTER UN FILM</v-list-item>
        </router-link>

        
        <v-list-item prepend-icon="" class="mt-10">REALISATEURS</v-list-item>
        <router-link
          :to="{ name: 'directors' }"
          style="color: inherit; text-decoration: none"
          v-slot="{isActive}"
        >
          <v-list-item :class="isActive && 'bg-indigo'" class="mb-3" prepend-icon="mdi-format-list-bulleted" value="directors_list"
            >LISTE DES REALISATEURS</v-list-item
          >
        </router-link>

        <router-link
          :to="{ name: 'directors_add' }"
          style="color: inherit; text-decoration: none"
          v-slot="{isActive}"
        >
          <v-list-item :class="isActive && 'bg-indigo'" prepend-icon="mdi-plus" value="directors_add">AJOUTER UN REALISATEUR</v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view @changeTitle="changeTitle"></router-view>
        <v-row>
          <v-col cols="12" class="text-right">
            <v-btn prepend-icon="mdi-arrow-left" color="indigo" @click="router.go(-1)"
              >RETOUR</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

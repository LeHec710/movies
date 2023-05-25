<script setup>
import { onMounted, ref } from "vue";
import {useRouter} from "vue-router"
import axios from "axios";
import { useField, useForm } from 'vee-validate';
const {handleSubmit} = useForm()

const router = useRouter()
const emit = defineEmits(["changeTitle"]);
onMounted(function () {
  emit("changeTitle", "Ajouter un réalisateur");
});

const API_URL = "http://127.0.0.1:3000";


// FORM
const isRequired = value => (value !== undefined && value !== "" ? true : 'Ce champ est requis');
const { value: name, errorMessage: nameError } = useField('name', isRequired);
const { value: birthdate, errorMessage: birthdateError } = useField('birthdate', isRequired);
const { value: nationality, errorMessage: nationalityError } = useField('nationality', isRequired);

const add = handleSubmit(values => {
  axios
    .post(API_URL + "/directors/add", {
      name: values.name,
      birthdate: values.birthdate,  
      nationality: values.nationality, 
    })
    .then((res) => {
        router.push({ name: "directors" });
    });

  name.value = "";
  birthdate.value = "";
  nationality.value = "";
});
</script>

<template>
  <v-form @submit="add" enctype="multipart/form-data">
    <v-row>
      <v-col cols="12">
        <h1>Ajouter un réalisateur</h1>
      </v-col>

      <!-- NAME -->
      <v-col cols="12">
        <p>Nom / Prénom*</p>
        <v-text-field hide-details="true" v-model="name" label="Nom Prénom" required></v-text-field>
        <p class="text-error">{{nameError}}</p>
      </v-col>

      <!-- BIRTHDATE -->
      <v-col cols="12" md="6">
        <p>Date de naissance*</p>
        <v-text-field hide-details="true" type="date" v-model="birthdate" label="Date de naissance"></v-text-field>
        <p class="text-error">{{birthdateError}}</p>
      </v-col>

      <!-- NATIONALITY -->
      <v-col cols="12" md="6">
        <p>Nationalité*</p>
        <v-text-field hide-details="true" v-model="nationality" label="Nationalité" required></v-text-field>
        <p class="text-error">{{nationalityError}}</p>
      </v-col>

      <!-- SUBMIT -->
      <v-col cols="6" md="6">
        <v-btn type="submit" block color="indigo">AJOUTER</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from 'vee-validate';
import moment from "moment";

const API_URL = "http://127.0.0.1:3000";

const {handleSubmit} = useForm()
const router = useRouter();
const route = useRoute();

const director = ref({});

// FORM
const isRequired = value => (value !== undefined && value !== "" ? true : 'Ce champ est requis');
const { value: name, errorMessage: nameError } = useField('name', isRequired);
const { value: birthdate, errorMessage: birthdateError } = useField('birthdate', isRequired);
const { value: nationality, errorMessage: nationalityError } = useField('nationality', isRequired);

const emit = defineEmits(["changeTitle"]);
onMounted(async () => {
  axios.post(API_URL + "/directors/get", { id: route.params.id }).then((res) => {
    director.value = res.data;
    name.value = res.data.name;
    birthdate.value = moment(res.data.birthdate).format('yyyy-MM-D');
    nationality.value = res.data.nationality;

    emit("changeTitle", "Modification de " + res.data.name);
  });
});

const edit = handleSubmit(values => {
  axios
    .post(API_URL + "/directors/update", {
      id: director.value._id,
      payload: {
        name: values.name,
        birthdate: values.birthdate,
        nationality: values.nationality,
      },
    })
    .then((res) => {
      router.go(-1);
    });
});

</script>

<template>
  <v-form @submit="edit" enctype="multipart/form-data">
    <v-row>
      <v-col>
        <h1>Modifier {{ director.name }}</h1>
      </v-col>

      <!-- NAME -->
      <v-col cols="12">
        <p>Nom prénom*</p>
        <v-text-field hide-details="true" v-model="name" label="Nom prénom" required></v-text-field>
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
        <v-text-field hide-details="true" v-model="nationality" label="Nationalité"></v-text-field>
        <p class="text-error">{{nationalityError}}</p>
      </v-col>

      <!-- SUBMIT -->
      <v-col cols="12" class="pa-0"></v-col>
      <v-col cols="6">
        <v-btn type="submit" block color="indigo">MODIFIER</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

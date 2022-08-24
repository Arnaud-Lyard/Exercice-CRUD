<template>
<div>
    <div class="container">
        <div class="content">
                <span class="save"><font-awesome-icon icon="fa-solid fa-floppy-disk" /></span>
                <span class="delete"><font-awesome-icon icon="fa-solid fa-trash" /></span>
           
        </div>
    </div>

    <div class="form">

        <form @submit.prevent="handleSubmit">
            <label for="title">Titre de la todo</label>
            <input type="text" name="title" v-model="title">

            <label for="content">Contenu de la todo</label>
            <input type="text" name="content" v-model="content">

            <button type="submit">Enregistrer</button>
        </form>

    </div>

</div>

</template>

<script setup>

import { ref } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

const data = ref('')
const error = ref('')
const title = ref('')
const content = ref('')


fetch('http://localhost:8000/api/todos/' + id)
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))

// const user = ref({
//     title: data.value,
//     content: data.value
// })

console.log(data.title)


const handleSubmit = () => {



    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: title.value,
            content: content.value
            })
      };

      fetch("http://localhost:8000/api/todos/" + id, requestOptions)
        .then(response => response.json())

        title.value = "",
        content.value= ""
}

</script>

<style scoped>
.container {
    width: 80%;
    margin: 0 auto;
}
.content {
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
h1 {
    color: rgb(0, 189, 223);
}
.save {
    position: absolute;
    top: 20px;
    right: 40px;
    font-size: 18px;
}
.delete {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 18px;
}
.save:hover {
    color: rgb(0, 189, 223);
    transition: 0.3s;
    cursor: pointer;
}
.delete:hover {
    color: rgb(0, 189, 223);
    transition: 0.3s;
    cursor: pointer;
}

/* Form */
.form {
    width: 1000px;
    margin: 0 auto;
    padding: 20px;
}
label, input {
    display: block;
    font-size: 1.2em;
}
input {
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}
form button {
  border: 0;
  background-color: rgb(0, 189, 223);
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2em;
}
form button:hover {
    background-color: rgb(0, 217, 255);
    transition: 0.3s;
}

</style>
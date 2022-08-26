<template>
    <h1>TODOS LIST</h1>
    <div class="container">
      <div class="left-content">
        <div v-if="error">Il y a eu une erreur {{ error.message }}</div>
          <div v-else-if="data">
            
              <div v-for="data in data" :key="data.id">
                <div class="todo-content">
                <router-link :to="{ name: 'TodosDetail', params: { id: data.id } }">
                  <span class="icon"><font-awesome-icon icon="fa-solid fa-pen" /></span>
                </router-link>
                  <h4>{{ data.title }}</h4>
                  <p>{{ data.content }}</p>
                </div>
              </div>
            
          </div>
          <div v-else>En cours de chargement...</div>
      </div>
  <TodosForm />
    </div>
</template>

<script setup>
import TodosForm from '@/components/TodosForm.vue'
import { ref } from 'vue'

const data = ref([])
const error = ref('')

fetch('http://localhost:8000/api/todos/')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))

</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap-reverse;
}
.left-content {
    display: flex;
    justify-content: center;
    width: 1000px;
}
h1 {
  text-align: center;
  color: rgb(0, 189, 223);
}
.todo-content {
  position: relative;
  background: #fff;
  border-radius: 4px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
}
.todo-content h4{
  color: rgb(0, 189, 223);
  font-size: 1.2em;
}
.icon {
  position: absolute;
  font-size: 18px;
  top: 20px;
  right: 20px;
  color: #000;
}
.icon:hover {
  color:rgb(0, 189, 223);
  transition: 0.3s;
}
</style>
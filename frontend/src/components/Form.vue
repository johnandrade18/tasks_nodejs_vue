<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col col-md-6">
        <div class="card">
          <div class="card-header">
            <h3>Task</h3>
          </div>
          <div class="card-body">
            <form v-on:submit.prevent="sendTask">
              <div class="form-group">
                <label for="tittle">Titulo</label>
                <input
                  type="text"
                  name="tittle"
                  class="form-control"
                  v-model="task.tittle"
                />
              </div>
              <div class="form-group">
                <label for="description">Descripcion</label>
                <textarea
                  cols="30"
                  rows="10"
                  type="text"
                  name="description"
                  class="form-control"
                  v-model="task.description"
                >
                </textarea>
              </div>
              <template v-if="edit == false">
                <div class="form-group pt-2">
                  <button class="btn btn-primary">Guardar</button>
                </div>
              </template>
              <template v-else>
                <div class="form-group pt-2">
                  <button class="btn btn-primary">Editar</button>
                </div>
              </template>
            </form>
          </div>
        </div>
      </div>
      <div class="col col-md-6">
        <div class="card">
          <div class="card-header">
            <h3>Tasks</h3>
          </div>
          <div class="card-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Descripcion</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) of tasks" :key="i">
                  <td>{{ item.tittle }}</td>
                  <td>{{ item.description }}</td>
                  <td>
                    <button
                      class="btn btn-warning m-1"
                      v-on:click="editTask(item.id)"
                    >
                      <i class="bx bx-edit"></i>
                    </button>
                    <button
                      class="btn btn-danger m-1"
                      v-on:click="deleteTask(item.id)"
                    >
                      <i class="bx bx-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
class Task {
  constructor(tittle, description) {
    this.tittle = tittle;
    this.description = description;
  }
}
export default {
  data() {
    return {
      task: new Task(),
      tasks: [],
      edit: false,
      taskToEdit: "",
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    async getTasks() {
      await axios.get("http://localhost:5000/api/tasks").then((res) => {
        this.tasks = res.data.tasks;
        console.log(this.tasks);
      });
    },
    async sendTask() {
      if (this.edit == false) {
        await axios
          .post("http://localhost:5000/api/tasks", this.task)
          .then(() => {
            this.getTasks();
            this.task = new Task();
          });
      } else {
        await axios
          .put("http://localhost:5000/api/tasks/" + this.taskToEdit, this.task)
          .then(() => {
            this.getTasks();
            this.task = new Task();
            this.edit = false;
          });
      }
    },
    async deleteTask(id) {
      await axios
        .delete("http://localhost:5000/api/tasks/" + id)
        .then((res) => {
          console.log(res.data);
        });
      this.getTasks();
    },
    async editTask(id) {
      await axios.get("http://localhost:5000/api/tasks/" + id).then((res) => {
        this.task = new Task(res.data.task.tittle, res.data.task.description);
        this.taskToEdit = res.data.task.id;
        this.edit = true;
      });
    },
  },
};
</script>

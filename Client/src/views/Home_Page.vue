<template>
  <AddTask v-show="showAddTask" @add-task="addTask" />
  <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" />
</template>

<script>
import Tasks from "../components/Tasks";
import AddTask from "../components/AddTask";
const baseUrl = "http://localhost:8080/api";
export default {
  name: "Home_Page",
  props: {
    showAddTask: Boolean,
  },
  components: {
    Tasks,
    AddTask,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async fetchTasks() {
      console.log("Hello There Get Requested...");
      const res = await fetch(`${baseUrl}/tasks`);

      const data = await res.json();

      return data;
    },
    async fetchTask(id) {
      const res = await fetch(`${baseUrl}/tasks/${id}`);

      const data = await res.json();

      return data;
    },
    async addTask(task) {
      console.log("trying to post...");
      console.log(task);
      const res = await fetch(`${baseUrl}/tasks/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();

      this.tasks = [...this.tasks, data];
    },
    async deleteTask(id) {
      if (confirm("Are you sure?")) {
        const res = await fetch(`${baseUrl}/tasks/${id}`, {
          method: "DELETE",
        });

        res.status === 200 ? (this.tasks = this.tasks.filter((task) => task.id !== id)) : alert("Error deleting task");
      }
    },
    async toggleReminder(id) {
      const taskToToggle = await this.fetchTask(id);
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

      const res = await fetch(`${baseUrl}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updTask),
      });

      const data = await res.json();
      this.tasks = this.tasks.map((task) => (task.id === id ? { ...task, reminder: data.reminder } : task));
     
    },
  },
  async created() {
    this.tasks = await this.fetchTasks();
  },
};
</script>

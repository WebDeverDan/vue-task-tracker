<template>
<div :key="task.id" v-for="task in tasks">
    <Task_C @toggle-reminder="$emit('toggle-reminder', task.id)" @delete-task="$emit('delete-task', task.id)" :task="task" />
</div>
</template>

<script>
import Task_C from './Task.vue'
export default {
    name: 'Tasks_C',
    props: {
        tasks: Array
    },
    components: {
        Task_C
    },
    emits: ['delete-task', 'toggle-reminder'],
}

</script>
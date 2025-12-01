<script setup>
import { ref, watch } from 'vue'
import TaskItem from '~/components/TaskItem.vue'
import TaskCard from '~/components/TaskCard.vue'

const { getTasks, createTask, updateTask, deleteTask } = useTasks()

const tasks = ref([])
const selectedTask = ref(null)

const filterStatus = ref(null)
const sortByDate = ref('asc')

const loadTasks = async () => {
  const params = {
    orderBy: sortByDate.value,
  }

  if (filterStatus.value !== null && filterStatus.value !== undefined) {
    params.status = filterStatus.value
  }

  tasks.value = await getTasks(params)
}


onMounted(loadTasks)

watch([filterStatus, sortByDate], loadTasks)


const onSelectTask = (task) => {
  selectedTask.value = { ...task }
}

const onDelete = async (id) => {
  await deleteTask(id)
  await loadTasks()
}

const onCreate = async (payload) => {
  await createTask({
    title: payload.title,
    description: payload.description,
    dueDate: new Date(payload.dueDate).toISOString(),
    status: 'in_progress'
  })
  await loadTasks()
}

const onUpdate = async (payload) => {
  await updateTask(payload.id, {
    title: payload.title,
    description: payload.description,
    dueDate: new Date(payload.dueDate).toISOString(),
    status: payload.status
  })
  await loadTasks()
}

const onUpdateStatus = async ({ id, status }) => {
  await updateTask(id, { status })
  await loadTasks()
}

const onClear = () => {
  selectedTask.value = null
}

const sortButtonText = computed(() => {
  return sortByDate.value === 'asc' ? 'Ascending' : 'Descending'
})

const filterButtonText = computed(() => {
  if (filterStatus.value === 'in_progress') return 'In Progress'
  if (filterStatus.value === 'done') return 'Done'
  return 'All'
})
</script>


<template>
  <v-card-title level="1" class="title">Task Manager</v-card-title>

  <div class="controls">

    <v-menu>
      <template #activator="{ props }">
        <v-btn width="120" v-bind="props" size="small" color="primary" variant="outlined">
          {{ filterButtonText }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item  @click="filterStatus = null">
          <v-list-item-title>All</v-list-item-title>
        </v-list-item>

        <v-list-item @click="filterStatus = 'in_progress'">
          <v-list-item-title>In Progress</v-list-item-title>
        </v-list-item>

        <v-list-item @click="filterStatus = 'done'">
          <v-list-item-title>Done</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu>
      <template #activator="{ props }">
        <v-btn width="120" v-bind="props" size="small" color="secondary" variant="outlined">
          {{ sortButtonText }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="sortByDate = 'asc'">
          <v-list-item-title>Ascending</v-list-item-title>
        </v-list-item>

        <v-list-item @click="sortByDate = 'desc'">
          <v-list-item-title>Descending</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>



  </div>

  <div class="container">
    <div class="task-wrapper">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :selectedId="selectedTask?.id"
        @select="onSelectTask"
        @delete="onDelete"
        @update-status="onUpdateStatus" 
      />
    </div>

    <TaskCard
      :currTask="selectedTask"
      @create="onCreate"
      @update="onUpdate"
      @delete="onDelete"
      @clear="onClear"
    />
  </div>
</template>


<style scoped>
body {
    background: red;
}
.title {
    font-family: Inter-local, sans-serif;
    color: rgb(228, 228, 228);
    font-size: 32px;
    font-style: normal;
    line-height: 40px;
    font-weight: 600;
    margin: 20px auto;
}
.container {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    width: 100%;
    gap: 16px;
    height: 70vh;
}

.task-wrapper {
    display: flex;
    flex: 1;
    flex-shrink: 0;
    flex-direction: column;
    gap: 8px;
    border-radius: 14px;
    background: rgb(16, 16, 16);
    height: 100%;
    overflow-y: scroll;
    padding: 20px;
}
.controls {
  display: flex;
  gap: 10px;
  margin: 10px auto 20px;
}
</style>
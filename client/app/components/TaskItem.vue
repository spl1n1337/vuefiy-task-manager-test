<script setup>
const props = defineProps({
  task: { type: Object, required: true },
  selectedId: { type: [String, Number], default: null }
})

const emit = defineEmits(['select', 'delete', 'update-status'])

const onClick = () => emit('select', props.task)

const onStatusChange = (event) => {
  emit('update-status', {
    id: props.task.id,
    status: 'done'
  })
}
</script>

<template>
  <div
    class="task"
    :class="{ active: selectedId === task.id }"
    @click="onClick"
  >
    <input
      class="radio"
      type="radio"
      :checked="props.task.status == 'in_progress' ? false : true"
      @click.stop
      @change="onStatusChange"
    />
    <div class="task-info">
      <div class="task-title">{{ props?.task.title }}</div>
      <div class="task-due">{{ formatDateTime(props?.task.dueDate) }}</div>
      <div class="task-desciption">{{ props?.task.description }}</div>
    </div>
  </div>
</template>

<style scoped>
.task {
  margin-bottom: 18px;
  display: flex;
  align-items: start;
  gap: 12px;
  width: 100%;
  padding: 8px;
  border-radius: 12px;
  cursor: pointer;
}
.task:hover {
  background: #252525;
}

.task.active {
  background: #1e1e1e;
}

.task-info {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 8px;
}

.task-desciption {
  grid-column: 1 / 3;
}

.task-title, .task-due, .task-desciption {
  font-family: Inter-local, sans-serif;
  font-weight: 400;
  color: rgb(228, 228, 228);
  font-size: 15px;
}

.task-due, .task-desciption {
  color: rgb(119, 119, 119);
  font-size: 12px;
}

.radio {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #4caf50;
  transition: transform 0.15s ease;
}

.radio:hover {
  transform: scale(1.2);
}

</style>

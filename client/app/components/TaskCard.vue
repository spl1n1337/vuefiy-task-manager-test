<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  currTask: Object
})

const emit = defineEmits(['create', 'update', 'delete', 'clear'])

const formRef = ref(null)

const title = ref('')
const description = ref('')
const dueDate = ref('')

watch(
  () => props.currTask,
  (newVal) => {
    title.value = newVal?.title || ''
    description.value = newVal?.description || ''

    if (newVal?.dueDate) {
      dueDate.value = newVal.dueDate.length > 16 ? newVal.dueDate.slice(0, 16) : newVal.dueDate
    } else {
      dueDate.value = ''
    }
  },
  { immediate: true }
)

const rules = {
  required: (v) => !!v || 'Field is required',
  title: (v) =>
    (v && v.length >= 3 && v.length <= 40) ||
    'Title must be 3–40 characters',
  description: (v) =>
    (v && v.length >= 10 && v.length <= 200) ||
    'Description must be 10–200 characters',
  date: (v) => !!v || 'Date & time required',
}

const submitForm = async () => {
  const valid = await (formRef.value?.validate?.() ?? true)
  if (!valid) return

  const payload = {
    id: props.currTask?.id ?? Date.now(),
    title: title.value,
    description: description.value,
    dueDate: dueDate.value,
    status: props.currTask?.status ?? false
  }

  if (props.currTask) {
    emit('update', payload)
  } else {
    emit('create', payload)
    title.value = ''
    description.value = ''
    dueDate.value = ''
    formRef.value?.resetValidation?.()
  }
}

const emitDelete = () => {
  if (!props.currTask?.id) return
  emit('delete', props.currTask.id)
  formRef.value?.resetValidation?.()
  emitClear()
}

const emitClear = () => {
  emit('clear')

  title.value = ''
  description.value = ''
  dueDate.value = ''

  formRef.value?.resetValidation?.()
}

</script>

<template>
  <v-form ref="formRef" @submit.prevent="submitForm" class="task-card">
    <v-btn
        v-if="props.currTask"
        icon
        class="close"
        color="gray"
        size="x-small"
        @click="emitClear"
        >
        <v-icon class>mdi-close</v-icon>
    </v-btn>

    <v-btn
      v-if="props.currTask"
      icon
      class="delete"
      color="gray"
      size="x-small"
      @click="emitDelete"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>


    <div class="task-card-title">
      {{ props.currTask ? 'Edit task' : 'Add task' }}
    </div>

    <v-text-field
      v-model="title"
      label="Task title"
      :rules="[rules.required, rules.title]"
      maxlength="40"
      dense
      hide-details="auto"
    />

    <v-textarea
      v-model="description"
      label="Task description"
      :rules="[rules.required, rules.description]"
      maxlength="200"
      dense
      hide-details="auto"
      :auto-grow="false"
      rows="5"
      class="no-resize"
    />

    <v-text-field
      v-model="dueDate"
      type="datetime-local"
      label="Due date & time"
      :rules="[rules.required, rules.date]"
      hide-details="auto"
      dense
    />

    <v-btn
      type="submit"
      class="mt-4"
      variant="outlined"
      width="100%"
    >
      {{ props.currTask ? 'Edit' : 'Create' }}
    </v-btn>
  </v-form>
</template>

<style scoped>
.task-card {
  position: relative;
  flex: 1;
  flex-shrink: 0;
  background: rgb(16, 16, 16);
  border-radius: 14px;
  padding: 16px;
  color: #e4e4e4;
}
.task-card-title {
  margin-top: 10px;
  margin-bottom: 12px;
  font-family: 'Inter-local', sans-serif;
  color: rgb(228, 228, 228);
  font-style: normal;
  line-height: 40px;
  font-weight: 600;
  text-align: center;
  font-size: 20px;
}
.close {
  position: absolute;
  top: 14px;
  left: 14px;
}
.delete {
  position: absolute;
  top: 14px;
  right: 14px;
}
.no-resize textarea {
  resize: none !important;
  overflow-y: auto;
}
</style>

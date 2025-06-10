<template>
  <div
    class="task-card"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    :class="{ 'dragging': isDragging }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="card-header">
      <strong>{{ task.title }}</strong>
      <button class="delete-btn" @click="$emit('delete', task.id)" title="Löschen">×</button>
    </div>
    <p>{{ task.description }}</p>
    <router-link :to="`/task/${task.id}`" class="details-link">Details</router-link>
    <div class="actions">
      <button
        v-if="task.status !== statuses[0]"
        class="move-btn"
        @click="$emit('changestatus', task.id, prevStatus(task.status))"
        :title="`Nach links verschieben (${statusLabels[prevStatus(task.status)]})`"
      >
        ◀
      </button>
      <button
        v-if="task.status !== statuses[statuses.length - 1]"
        class="move-btn"
        @click="$emit('changestatus', task.id, nextStatus(task.status))"
        :title="`Nach rechts verschieben (${statusLabels[nextStatus(task.status)]})`"
      >
        ▶
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  task: Object,
  statuses: Array,
  statusLabels: Object
})

defineEmits(['changestatus', 'delete'])

const isDragging = ref(false)
const hovered = ref(false)

function onDragStart(evt) {
  evt.dataTransfer.effectAllowed = 'move'
  evt.dataTransfer.setData('text/plain', String(props.task.id))
  isDragging.value = true
}

function onDragEnd() {
  isDragging.value = false
}

function nextStatus(current) {
  const idx = props.statuses.indexOf(current)
  return props.statuses[idx + 1]
}
function prevStatus(current) {
  const idx = props.statuses.indexOf(current)
  return props.statuses[idx - 1]
}
</script>

<style scoped>
.task-card {
  background: #fff;
  padding: 1rem;
  margin-bottom: 1.25rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.07);
  transition: box-shadow 0.2s, transform 0.15s;
  position: relative;
  cursor: default;
}
.task-card:hover, .task-card:focus, .task-card.dragging {
  box-shadow: 0 8px 24px rgba(44, 62, 80, 0.21);
  transform: translateY(-4px) scale(1.025);
  z-index: 2;
}
.task-card.dragging {
  opacity: 0.6;
  background: #e3eafc;
  cursor: grabbing !important;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.delete-btn {
  background: #ffebee;
  color: #e53935;
  border: none;
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  cursor: pointer;
  font-size: 1.1em;
  line-height: 1.5em;
  transition: background 0.15s;
}
.delete-btn:hover {
  background: #ffcdd2;
}
.details-link {
  color: #3498db;
  text-decoration: underline;
  font-size: 0.95em;
}
.actions {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}
.move-btn {
  background: #e3eafc;
  color: #1565c0;
  border: none;
  border-radius: 6px;
  padding: 0.45em 0.9em;
  cursor: pointer;
  font-size: 1.1em;
  transition: background 0.15s;
}
.move-btn:hover {
  background: #bbdefb;
}
</style>
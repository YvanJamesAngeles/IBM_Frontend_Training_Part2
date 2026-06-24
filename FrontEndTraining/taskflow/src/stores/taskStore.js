import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', () => {
  const tasks  = ref([])
  const nextId = ref(1)

  const totalCount   = computed(() =>  tasks.value.length)
  const doneCount    = computed(() =>  tasks.value.filter(task => task.done).length)
  const pendingCount = computed(() => tasks.value.filter(task => !task.done).length)

  function addTask(name) {
    if (!name || name.trim() === '') return
    tasks.value.push({
      id: nextId.value++,
      name,
      done: false
    })
  }

  function toggleTask(id) {
    const task = tasks.value.find(task => task.id === id);

    if(task){
        task.done = !task.done
    }
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter(task => task.id !== id);
  }

  function addPhotoToTask(taskId, path){
    const task = tasks.value.find(task => task.id === taskId);

    if(task){
        task.photo = path
    }
  }

   return {
    tasks,
    nextId,
    totalCount,
    doneCount,
    pendingCount,
    addTask,
    toggleTask,
    removeTask,
    addPhotoToTask
  }
})

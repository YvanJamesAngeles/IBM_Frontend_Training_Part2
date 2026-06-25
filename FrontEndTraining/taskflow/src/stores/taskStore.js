import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Preferences } from '@capacitor/preferences'

export const useTaskStore = defineStore('tasks', () => {
  const tasks  = ref([])
  const nextId = ref(1)

  const totalCount   = computed(() =>  tasks.value.length)
  const doneCount    = computed(() =>  tasks.value.filter(task => task.done).length)
  const pendingCount = computed(() => tasks.value.filter(task => !task.done).length)

  async function saveTasks() {
    await Preferences.set({
      key: 'tasks',
      value: JSON.stringify(tasks.value)
    })
    await Preferences.set({
      key: 'nextId',
      value: JSON.stringify(nextId.value)
    })
  }

  async function loadTasks() {
    const tasksData = await Preferences.get({ key: 'tasks' })
    const nextIdData = await Preferences.get({ key: 'nextId' })
    
    if (tasksData.value) {
      tasks.value = JSON.parse(tasksData.value)
    }
    if (nextIdData.value) {
      nextId.value = JSON.parse(nextIdData.value)
    }
  }

  function addTask(name) {
    if (!name || name.trim() === '') return
    tasks.value.push({
      id: nextId.value++,
      name,
      done: false
    })
    saveTasks()
  }

  function toggleTask(id) {
    const task = tasks.value.find(task => task.id === id);

    if(task){
        task.done = !task.done
        saveTasks()
    }
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter(task => task.id !== id);
    saveTasks()
  }

  function addPhotoToTask(taskId, path){
    const task = tasks.value.find(task => task.id === taskId);

    if(task){
        task.photo = path
        saveTasks()
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
    addPhotoToTask,
    saveTasks,
    loadTasks
  }
})

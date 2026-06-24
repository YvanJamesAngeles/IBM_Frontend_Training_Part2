<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>📝 Tasks</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div class="container">
        <!-- Stats -->
        <div class="stats-card">
          <IonChip color="medium">
            Total: {{ totalCount }}
          </IonChip>
          <IonChip color="success">
            Done: {{ doneCount }}
          </IonChip>
          <IonChip color="warning">
            Pending: {{ pendingCount }}
          </IonChip>
        </div>
        <!-- Input -->
        <IonItem class="input-card" lines="none">
          <IonInput
            v-model="newTaskName"
            placeholder="Add a new task..."
            @keyup.enter="handleAdd"
            clearInput
          />
        </IonItem>
        <!-- Empty -->
        <IonText v-if="tasks.length === 0" color="medium">
          <p class="empty-state">
            No tasks yet!
          </p>
        </IonText>
        <!-- Tasks -->
        <IonList class="task-list">
          <IonItem
            v-for="task in tasks"
            :key="task.id"
            class="task-item"
            lines="none"
            button
            @click="goToDetail(task.id)"
          >
            <IonCheckbox
              slot="start"
              :checked="task.done"
              @ionChange="toggleTask(task.id)"
              @click.stop
            />
            <IonThumbnail v-if="task.photo" slot="start" class="task-thumbnail">
              <IonImg :src="task.photo" />
            </IonThumbnail>
            <IonLabel
              :class="{ 'task-done': task.done }"
            >
              {{ task.name }}
            </IonLabel>
            <IonButton
              slot="end"
              fill="clear"
              color="danger"
              @click.stop="removeTask(task.id)"
            >
              <IonIcon :icon="trashOutline"/>
            </IonButton>
          </IonItem>
        </IonList>
        <!-- Add Button -->
        <IonFab
          slot="fixed"
          vertical="bottom"
          horizontal="end"
        >
          <IonFabButton @click="handleAdd">
            <IonIcon :icon="add"/>
          </IonFabButton>
        </IonFab>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../../stores/taskStore'
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton, IonCheckbox,
  IonList, IonText, IonChip, IonIcon, IonFab, IonFabButton,
  IonThumbnail, IonImg
} from '@ionic/vue'
import { trashOutline, add } from 'ionicons/icons'

const router = useRouter()
const taskStore = useTaskStore()
const { tasks, doneCount, pendingCount, totalCount } = storeToRefs(taskStore)
const { addTask, toggleTask, removeTask } = taskStore
const newTaskName = ref('')

function handleAdd() {
  if (!newTaskName.value.trim()) return
  addTask(newTaskName.value)
  newTaskName.value = ''
}

function goToDetail(id) {
  router.push(`/tabs/tasks/${id}`)
}
</script>
<style scoped>
.container {
  max-width: 520px;
  margin: auto;
  padding: 20px;
}
.stats-card {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  background: #f8f9fa;
  padding: 12px;
  border-radius: 14px;
  margin-bottom: 20px;
}
.input-card {
  background: white;
  border-radius: 14px;
  margin-bottom: 15px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
}
.empty-state {
  text-align: center;
  margin-top: 40px;
}
.task-list {
  background: transparent;
}
.task-item {
  background: white;
  border-radius: 14px;
  margin-bottom: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
  cursor: pointer;
}
.task-thumbnail {
  --size: 50px;
  --border-radius: 8px;
  margin-right: 8px;
}
.task-done {
  text-decoration: line-through;
  opacity: .5;
}
IonFabButton {
  --border-radius: 50%;
}
</style>
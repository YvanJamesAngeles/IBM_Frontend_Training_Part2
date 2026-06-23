<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>✅ Completed</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div class="container">
        <!-- Stats -->
        <div class="stats-card">
          <IonChip color="success">
            Completed: {{ completedTasks.length }}
          </IonChip>
        </div>
        <!-- Empty -->
        <IonText v-if="completedTasks.length === 0" color="medium">
          <p class="empty-state">
            No completed tasks yet!
          </p>
        </IonText>
        <!-- Completed Tasks -->
        <IonList class="task-list">
          <IonItem
            v-for="task in completedTasks"
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
            <IonLabel class="task-done">
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
      </div>
    </IonContent>
  </IonPage>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../../stores/taskStore'
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonButton, IonCheckbox,
  IonList, IonText, IonChip, IonIcon
} from '@ionic/vue'
import { trashOutline } from 'ionicons/icons'
const router = useRouter()
const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)
const { toggleTask, removeTask } = taskStore
const completedTasks = computed(() => {
  return tasks.value.filter(task => task.done === true)
})
function goToDetail(id) {
  router.push(`/tabs/tasks/${id}`)
}
</script>
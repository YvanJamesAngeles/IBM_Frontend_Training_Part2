<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton default-href="/tabs/tasks"></IonBackButton>
        </IonButtons>
        <IonTitle>Task Detail</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div class="container">
        <IonCard v-if="task">
          <IonCardHeader>
            <IonCardTitle>{{ task.name }}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>
                  <strong>ID:</strong> {{ task.id }}
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <strong>Status:</strong>
                </IonLabel>
                <IonChip :color="task.done ? 'success' : 'warning'">
                  {{ task.done ? 'Completed' : 'Pending' }}
                </IonChip>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <strong>Task Name:</strong> {{ task.name }}
                </IonLabel>
              </IonItem>
            </IonList>
            
           
            <div v-if="task.photo" class="photo-container">
              <IonImg :src="task.photo" />
            </div>
            
            <div class="actions">
              <IonButton
                expand="block"
                color="primary"
                @click="handleTakePhoto"
              >
                <IonIcon slot="start" :icon="cameraOutline" />
                {{ task.photo ? 'Change Photo' : 'Add Photo' }}
              </IonButton>
              <IonButton
                expand="block"
                :color="task.done ? 'medium' : 'success'"
                @click="toggleTask(task.id)"
              >
                {{ task.done ? 'Mark as Pending' : 'Mark as Done' }}
              </IonButton>
              <IonButton
                expand="block"
                color="danger"
                @click="handleDelete"
              >
                Delete Task
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
        <IonText v-else color="danger">
          <p class="error-state">Task not found</p>
        </IonText>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../../stores/taskStore'
import { Camera, CameraResultType } from '@capacitor/camera'
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonList, IonItem,
  IonLabel, IonButton, IonChip, IonText, IonImg, IonIcon
} from '@ionic/vue'
import { cameraOutline } from 'ionicons/icons'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)
const { toggleTask, removeTask, addPhotoToTask } = taskStore

const taskId = computed(() => parseInt(route.params.id))
const task = computed(() => {
  return tasks.value.find(t => t.id === taskId.value)
})

async function handleTakePhoto() {
  try {
    const photo = await Camera.takePhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    })
    
    if (photo.webPath) {
      addPhotoToTask(taskId.value, photo.webPath)
    }
  } catch (error) {
    console.error('Error taking photo:', error)
  }
}

function handleDelete() {
  removeTask(taskId.value)
  router.push('/tabs/tasks')
}
</script>

<style scoped>
.container {
  max-width: 520px;
  margin: auto;
  padding: 20px;
}
.photo-container {
  margin: 20px 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.photo-container ion-img {
  width: 100%;
  height: auto;
}
.actions {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.error-state {
  text-align: center;
  margin-top: 40px;
  font-size: 18px;
}
</style>
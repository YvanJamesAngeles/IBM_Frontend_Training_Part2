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
          >
            <IonCheckbox
              slot="start"
              :checked="task.done"
              @ionChange="toggleTask(task.id)"
            />
            <IonLabel 
              :class="{ 'task-done': task.done }"
            >
              {{ task.name }}
            </IonLabel>
            <IonButton
              slot="end"
              fill="clear"
              color="danger"
              @click="removeTask(task.id)"
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
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../stores/taskStore'
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonCheckbox, IonList, IonText, IonChip, IonIcon,
} from '@ionic/vue'
import { trashOutline } from 'ionicons/icons'

import { IonFab, IonFabButton } from '@ionic/vue';
import { add } from 'ionicons/icons';

const taskStore = useTaskStore()
const { tasks, doneCount, pendingCount, totalCount } = storeToRefs(taskStore)
const { addTask, toggleTask, removeTask } = taskStore

const newTaskName = ref('')

function handleAdd() {
  if (!newTaskName.value.trim()) return
  addTask(newTaskName.value)
  newTaskName.value = ''
}
</script>



<style scoped>
.container {
  max-width: 520px;
  margin: auto;
  padding: 20px;
}


/* Stats */
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

/* Input */
.input-card {
  background: white;
  border-radius: 14px;
  margin-bottom: 15px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
}

/* Empty */
.empty-state {
  text-align: center;
  margin-top: 40px;
}

/* Tasks */
.task-list {
  background: transparent;
}


.task-item {
  background: white;
  border-radius: 14px;
  margin-bottom: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
}



.task-done {
  text-decoration: line-through;
  opacity: .5;
}

IonFabButton {
  --border-radius: 50%;
}
</style>

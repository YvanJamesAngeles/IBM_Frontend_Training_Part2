<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tasks" href="/tabs/tasks">
          <IonIcon :icon="listOutline" />
          <IonLabel>Tasks</IonLabel>
        </IonTabButton>
        <IonTabButton tab="completed" href="/tabs/completed">
          <IonIcon :icon="checkmarkDoneOutline" />
          <IonLabel>Completed</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>
<script setup>
import { 
  IonPage, 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonLabel, 
  IonIcon, 
  IonRouterOutlet 
} from '@ionic/vue';
import { listOutline, checkmarkDoneOutline } from 'ionicons/icons';
</script>
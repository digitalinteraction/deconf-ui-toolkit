<template>
  <div class="sessionActions">
    <div class="buttons is-right">
      <!-- 
        Register Interest
      -->
      <template v-if="canRegisterInterest">
        <RegisterInterest
          @click="registerInterest"
          :is-working="false"
          :is-registered="false"
        />
      </template>

      <!-- 
        Add to calendar
      -->
      <template v-if="canAddToCalendar">
        <AddToCalendar calendar-link="todo" @click="trackCalendar" />
      </template>

      <!-- 
        Join session
      -->
      <template v-if="canJoin">
        <JoinSession :slot-state="slotState" :session-id="session.id" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Session } from '@/types';
import { PropType } from 'vue';
import RegisterInterest from '@/components/schedule/actions/RegisterInterest.vue';
import AddToCalendar from '@/components/schedule/actions/AddToCalendar.vue';
import JoinSession from '@/components/schedule/actions/JoinSession.vue';

type SlotState = 'past' | 'soon' | 'present' | 'future';

export default {
  name: 'SessionActions',
  components: { RegisterInterest, AddToCalendar, JoinSession },
  props: {
    session: { type: Object as PropType<Session>, required: true },
    slotState: { type: String as PropType<SlotState>, required: true }
  },
  computed: {
    canRegisterInterest(): boolean {
      return ['soon', 'present', 'future'].includes(this.slotState);
    },
    canAddToCalendar(): boolean {
      return ['soon', 'future'].includes(this.slotState);
    },
    canJoin(): boolean {
      return true;
      // return ['soon', 'present', 'past'].includes(this.slotState);
    }
  },
  methods: {
    registerInterest(): void {
      // ...
    },
    trackCalendar(): void {
      // ...
    }
  }
};
</script>

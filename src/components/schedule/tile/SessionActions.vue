<template>
  <div class="sessionActions">
    <div class="buttons is-right">
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
import { Session, SlotState } from '../../../lib/module';
import { PropType } from 'vue';
import AddToCalendar from '../actions/AddToCalendar.vue';
import JoinSession from '../actions/JoinSession.vue';

//
// @deprecated TO_BE_REMOVED
//

export default {
  name: 'SessionActions',
  components: { AddToCalendar, JoinSession },
  props: {
    session: { type: Object as PropType<Session>, required: true },
    slotState: { type: String as PropType<SlotState>, required: true },
    actions: { type: Array as PropType<string[]>, required: true }
  },
  computed: {
    actionSet(): Set<string> {
      return new Set(this.actions);
    },
    canRegisterInterest(): boolean {
      if (!this.actionSet.has('register')) return false;
      return ['soon', 'present', 'future'].includes(this.slotState);
    },
    canAddToCalendar(): boolean {
      if (!this.actionSet.has('calendar')) return false;
      return ['soon', 'future'].includes(this.slotState);
    },
    canJoin(): boolean {
      if (!this.actionSet.has('join')) return false;
      return true;
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

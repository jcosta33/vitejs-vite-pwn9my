<template>
  <FullCalendar :options="calendar" />
</template>
<script>
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  props: ['config'],
  computed: {
    calendar() {
      return { ...this.calendarOptions, ...this.config };
    },
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin],
        initialView: 'listWeek',
        dateClick: this.handleDateClick,
        headerToolbar: {
          start: 'title', // will normally be on the left. if RTL, will be on the right
          end: 'listWeek,dayGridMonth,timeGridWeek,timeGridDay',
        },
        footerToolbar: {
          end: 'today prev,next', // will normally be on the right. if RTL, will be on the left
        },
        events: [],
      },
      ...this.config,
    };
  },
  methods: {
    handleDateClick(arg) {
      console.log(`date click! ${arg.dateStr}`);
    },
  },
};
</script>
<style lang="scss">
.fc {
  .fc-list-day-text,
  .fc-list-day-side-text,
  .fc-col-header-cell-cushion {
    color: $black;
    font-weight: 300;
  }
  .fc-list-day-cushion.fc-cell-shaded {
    background: $white-ter;
  }
  .fc-daygrid-day-number{
    color:$grey-darker;
  }
  .fc-button {
    @extend .button;
    @extend .is-small;
    box-shadow: none !important;
    min-width: 1rem;
    font-weight: 400;
    border: none;
    border-radius: $radius !important;
    margin-left: 1rem !important;

    &:disabled {
      color: $grey-darker;
    }
    .fc-icon {
      line-height: 1rem;
      font-size: $size-6;
    }
  }
  .fc-footer-toolbar {
    .fc-button {
      &.fc-today-button {
        @extend .is-black;
      }
      &.fc-prev-button {
        @extend .is-black;
      }
      &.fc-next-buttton {
        @extend .is-black;
      }
    }
  }
  .fc-header-toolbar {
    .fc-button {
      &:not(.fc-button-active):hover {
        color: $black;
        background: $light;
      }
    }
  }
}
</style>

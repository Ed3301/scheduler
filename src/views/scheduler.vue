<template>
  <div class="schedule-vue-sample">
    <div class="col-md-9 control-section">
      <div class="content-wrapper" id="scheduler">
        <DxScheduler
          text-expr="title"
          all-day-expr="dayLong"
          :views="views"
          :data-source="appointments"
          :show-all-day-panel="false"
          :groups="groups"
          :current-view="currentView"
          recurrence-rule-expr="recurrence"
          :current-date="currentDate"
          :customize-date-navigator-text="customizeDateNavigatorText"
        >
          <!-- <DxView
            :cell-duration="30"
            :interval-count="1"
            type="workWeek"
            name="Vertical Grouping"
            group-orientation="vertical"
          /> -->
          <DxResource
            :allow-multiple="false"
            :data-source="priorityData"
            field-expr="priorityId"
            label="Priority"
          />
          <template #dateCellTemplate="{ data }">
            <b v-bind:style="{ color: 'blue' }">{{ data.text }}</b>
          </template>
          <template #timeCellTemplate="{ data }">
            <b
              v-bind:style="{ color: 'green', height: '20px', fontSize: '8px' }"
              >{{ Number(data.text.match(/^(\d+)/)[1]) }}</b
            >
          </template>
        </DxScheduler>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import "devextreme/dist/css/dx.light.css";

import { DxScheduler, DxResource } from "devextreme-vue/scheduler";

export default Vue.extend({
  data: function() {
    return {
      appointments: [],
      groups: ["priorityId"],
      currentView: "timelineDay",
      currentDate: new Date(2020, 12, 14),
      views: [
        {
          name: "Days",
          type: "timelineDay",
          intervalCount: 15,
          startDate: new Date(2020, 12, 14),
        },
      ],
      priorityData: [
        {
          text: "Berth 1",
          id: 1,
          color: "#1e90ff",
        },
        {
          text: "Berth 2",
          id: 2,
          color: "#ff9747",
        },
        {
          text: "Berth 3",
          id: 3,
          color: "#2c39f5",
        },
      ],
    };
  },
  components: {
    DxScheduler,
    DxResource,
  },
  mounted() {
    this.getScheduleData();
  },
  methods: {
    getScheduleData() {
      Vue.$http.get("Callstestrw").then((data) => {
        console.log(data);
        const sheduleData = data.data.document.records;
        sheduleData.map((item) => {
          const sheduleObj = {
            title: item.vesselName,
            startDate: new Date(item.startDT),
            endDate: new Date(item.endDT),
            priorityId: item.berthID,
          };
          this.appointments.push(sheduleObj);
        });
      });
    },

    customizeDateNavigatorText(e) {
      const formatOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      const formattedStartDate = e.startDate.toLocaleString(
        "en",
        formatOptions
      );
      const formattedEndDate = e.endDate.toLocaleString("en", formatOptions);
      if ((this.currentView === "day") | "timelineDay")
        return formattedStartDate;
      if (this.currentView === "month")
        return e.startDate.toLocaleString("en", {
          year: "numeric",
          month: "numeric",
        });
      return formattedStartDate + " - " + formattedEndDate;
    },
  },
});
</script>

<style scoped>
#scheduler .dx-scheduler-cell-sizes-horizontal {
  padding: 0%;
  margin: 0%;
  width: 10px;
}
#scheduler .dx-scheduler-cell-sizes-vertical {
  height: 100%;
  padding: 0%;
  margin: 0%;
}
</style>

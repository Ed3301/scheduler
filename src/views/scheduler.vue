<template>
    <div class="schedule-vue-sample">
        <div class="col-md-9 control-section">
            <div class="content-wrapper" >
                <ejs-schedule id='Schedule' height="650px" :selectedDate='selectedDate' :eventSettings='eventSettings'></ejs-schedule>
            </div>
        </div>
        <!-- <div class="col-lg-3 property-section">
            <table id="property" title="Properties" style="width: 100%">
                <tbody>
                    <tr style="height: 50px">
                        <td style="width: 30%">
                            <div>Current Date</div>
                        </td>
                        <td style="width: 70%;">
                            <div>
                                <ejs-datepicker id='datepicker' :value='selectedDate' :showClearButton='false' :change='onDateChange'></ejs-datepicker>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> -->
    </div>
</template>
<script>
    import Vue from "vue";
    import { extend } from '@syncfusion/ej2-base';
    import { SchedulePlugin, Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop } from "@syncfusion/ej2-vue-schedule";
    // import { DatePickerPlugin } from '@syncfusion/ej2-vue-calendars';
    // import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
    Vue.use(SchedulePlugin);
    // Vue.use(DatePickerPlugin);

  //   var dataManger = new DataManager({
  //       url: 'https://5.189.167.236:44376/v1/api/Callstest',
  //       adaptor: new WebApiAdaptor,
  //       crossDomain: true,
  //       headers:[{'Content-Type': 'application/json',
  //   'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJhZG1pbiIsIkN1c3RvbU9iamVjdENhbkJlQWRkZWRIZXJlIl0sIm5iZiI6MTYzMjM3NTg1NywiZXhwIjoxNjMyOTgwNjU3LCJpYXQiOjE2MzIzNzU4NTd9.8ahLrsIzCEHW0EHk59dcG4Y3lF2lrao718QJ4pyQ2UY`
  //       }]
  //   });

  //   dataManger.ready().then((el) => {
  //     console.log('--------', el);   
  // });

    export default Vue.extend({
        data: function () {
            return {
              eventSettings: { 
                dataSource: extend([], [], null, true)
              },
              selectedDate: new Date(2021, 0, 26)
            }
        },
        provide: {
            schedule: [Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]
        },
        mounted() {
          this.getScheduleData();
        },
        methods: {
          getScheduleData() {

            let scheduleObj = document.getElementById('Schedule').ej2_instances[0];

            Vue.$http.get('Callstest').then((data) => {
              // console.log(data.data.document.records);
              //   let Data = [{
              //       Id: 1,
              //       Subject: 'Conference',
              //       StartTime: new Date(2021, 8, 26, 1, 0),
              //       EndTime: new Date(2021, 8, 26, 2, 0),
              //       IsAllDay: false
              //   },{
              //       Id: 2,
              //       Subject: 'Meeting',
              //       StartTime: new Date(2021, 8, 26, 3, 0),
              //       EndTime: new Date(2021, 8, 26, 4, 0),
              //       IsAllDay: false
              //   }];
              let arr = [];
              data.data.document.records.map(obj => {
                // let sDt = obj['startDT'].split('T');
                // let sDt0 = sDt[0].split('-');
                // let sDt1 = sDt[1].split(':');
                // let eDt = obj['endDT'].split('T');
                // let eDt0 = eDt[0].split('-');
                // let eDt1 = eDt[1].split(':');

                // console.log('---------');
                // console.log(parseInt(sDt0[0]));
                // console.log(parseInt(sDt0[1]) - 1);
                // console.log(parseInt(sDt0[2]));
                // console.log(parseInt(sDt1[0]));
                // console.log(parseInt(sDt1[1]));
                
                obj['Subject'] = obj['berthName'];
                obj['Location'] = obj['berthName'];
                // obj['RecurrenceRule'] = 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1';
                obj['StartTime'] = new Date(obj['startDT']);
                obj['EndTime'] = new Date(obj['endDT']);
                arr.push(obj); 
              });
console.log('-------',arr);
              scheduleObj.addEvent(arr);

            });
          },
          onDateChange: function (args) {
              this.selectedDate = args.value;
          }
        }
    });

</script>
<template>
    <section class="section">
        <h1 class="title">2020-05-05 (수)</h1>
        <b-field
          horizontal
          label="날짜">
            <b-datepicker
              v-model="daily.workDate"
              :date-formatter="select => getToDate(select)"
              placeholder="업무일을 선택해주세요."
              trap-focus>
            </b-datepicker>
        </b-field>
        <b-field
          horizontal
          label="제목">
          <b-input v-model="daily.title"></b-input>
        </b-field>

        <b-field
          horizontal
          label="업무 리스트">
          <b-table
            bordered
            hoverable
            narrowed
            :data="daily.task"
            ref="taskTable">
            <b-table-column field="number" label="No" numeric width="50" v-slot="props">
              <b-input v-model="props.row.number" disabled></b-input>
            </b-table-column>
            <b-table-column field="contents" label="시간" width="100" v-slot="props">
              <b-timepicker
                v-model="props.row.taskTime"
                hour-format="24"
                :date-formatter="select => getToDate(select)"
                placeholder="시간"
                trap-focus>
              </b-timepicker>
            </b-table-column>
            <b-table-column field="contents" label="내용" v-slot="props">
              <b-input v-model="props.row.contents"></b-input>
            </b-table-column>
          </b-table>
        </b-field>

        <b-field
          horizontal
          label="특이사항">
          <b-input maxlength="200" type="textarea" v-model="daily.memo"></b-input>
        </b-field>
    </section>
</template>

<script>
export default {
  name: 'DailyDetail',
  created () {
  },
  data () {
    return {
      daily: {
        title: '오늘의 할 일',
        workDate: new Date(),
        memo: '오늘도 잘 놀았다.',
        createtime: '',
        task: [
          {
            number: 1,
            taskTime: new Date('2020-05-05 10:20'),
            contents: '산책가기',
          },
          {
            number: 2,
            taskTime: new Date('2020-05-05 16:50'),
            contents: '코 자기',
          },
        ],
      },
      date: new Date(),
      name: 'John Silver'
    }
  },
  methods: {
    hi () {
      alert('hi')
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: right;
}
</style>

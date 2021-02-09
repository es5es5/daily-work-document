<template>
  <div>
    <main>
      <section class="section">
          <h1 class="title">일일업무일지</h1>
          <b-table
              :data="data"
              ref="table"
              paginated
              per-page="20"
              detail-key="id"
              aria-next-label="Next page"
              aria-previous-label="Previous page"
              aria-page-label="Page"
              aria-current-label="Current page"
              @click="goDetail">

              <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
                {{ props.row.id }}
              </b-table-column>

              <b-table-column field="user.first_name" label="First Name" sortable v-slot="props">
                {{ props.row.user.first_name }}
              </b-table-column>

              <b-table-column field="user.last_name" label="Last Name" sortable v-slot="props">
                {{ props.row.user.last_name }}
              </b-table-column>

              <b-table-column field="date" label="Date" sortable centered v-slot="props">
                <span class="tag is-success">
                  {{ new Date(props.row.date).toLocaleDateString() }}
                </span>
              </b-table-column>
          </b-table>
      </section>
    </main>
  </div>
</template>

<script>
const data = require('./sample.json')

export default {
  name: 'DayilyList',
  data () {
    return {
      data,
      defaultOpenedDetails: [1],
      showDetailIcon: true
    }
  },
  methods: {
    goDetail (item) {
      this.$router.push({
        name: 'DailyDetail',
        params: {
          detailId: item.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

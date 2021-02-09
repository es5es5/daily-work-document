<template>
    <section class="section">
        <h1 class="title">일일업무일지</h1>
        <b-field label="업무일자">
            <b-datepicker
                v-model="date"
                :date-formatter="select => getToDate(select)"
                placeholder="Click to select..."
                trap-focus>
            </b-datepicker>
        </b-field>
        <b-field label="Name">
            <b-input v-model="name"></b-input>
        </b-field>

        <b-field label="Email"
          type="is-danger"
          message="This email is invalid">
          <b-input type="email"
            value="john@"
            maxlength="30">
          </b-input>
        </b-field>

        <b-field label="Username"
          type="is-success"
          message="This username is available">
          <b-input value="johnsilver" maxlength="30"></b-input>
        </b-field>

        <b-field label="Password">
          <b-input type="password"
            value="iwantmytreasure"
            password-reveal>
          </b-input>
        </b-field>

        <b-field label="Message">
          <b-input maxlength="200" type="textarea"></b-input>
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
      date: new Date(),
      name: 'John Silver'
    }
  }
}
</script>

<template>
  <v-layout class="front-background" row wrap justify-center>
    {{ performanceReviews }}
    <v-dialog v-model="isEditFormShown">
      <v-card>
        <v-card-title>
          <span class="headline">
            Review for {{ editingItem.targetName }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <template v-if="editingItem.completed_at">
                  <!-- TODO: filter for human-readable date -->
                  <p>You finished this performance review on {{ editingItem.completed_at | date }}</p>
                    <v-textarea v-model.lazy="editingItem.payload"
                                 name="payload"
                                 label="Review notes"
                                 disabled />
                </template>
                <v-textarea v-else
                             v-model.lazy="editingItem.payload"
                             v-validate="'required|max:500'"
                             name="payload"
                             label="Review notes"
                             :error-messages="errors.first('payload')"/>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <template v-if="editingItem.completed_at">
            <v-btn color="teal darken-1" text @click="close">
              OK
            </v-btn>
          </template>
          <template v-else>
            <v-btn color="teal darken-1" text @click="close">
              Cancel
            </v-btn>
            <v-btn color="teal darken-1" text @click="save">
              Save
            </v-btn>
          </template>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-flex xs10 md6>
      <v-simple-table :fixed-header="true">
        <thead>
          <tr>
            <th class="text-left">Performance Review Target Name</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in performanceReviews" :key="item.performance_review_id">
            <td>{{ item.employee_name }}</td>
            <!-- TODO: styling in the table. Need to space things better -->
            <td>
              <!-- TODO: align right -->
              <v-btn @click="edit(item.performance_review_id, item.employee_name)">
                <span v-if="item.completed_at">
                  View 🔍
                </span>
                <span v-else>
                  Edit ✏️
                </span>
                <!-- TODO: get the icon system working <v-icon>pencil</v-icon>-->
              </v-btn>
              <!--<v-icon v-if="item.completed_at">check_bold</v-icon>-->
              <span v-if="item.completed_at" class="completed">✔ completed</span>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-flex>

  </v-layout>
</template>

<script>
import moment from 'moment'

export default {
  head () {
    return {
      title: 'Feedback Front'
    }
  },
  data () {
    return {
      performanceReviews: [],
      isEditFormShown: false,
      editingIndex: null,
      editingItem: {
        performance_review_id: null,
        employee_name: '',
        payload: '',
        completed_at: ''
      }
    }
  },
  filters: {
    date: (date) => {
      date = String(date)
      // HACK: Unix epoch 3 additional characters at the end
      // TODO: track down the source of the bug (bad data? Knex not ok with new Date?)
      if (date.length > 10) {
        console.log('Invalid Unix epoch received')
        date = date.slice(0, (date.length - 10) * -1)
      }
      return moment.unix(date).format('YYYY/MM/DD hh:mm')
    }
  },
  watch: {
    isEditFormShown (val) {
      val || this.close()
    }
  },
  // This is the "SSR section" for Nuxt
  async asyncData ({ app, redirect }) {
    const employeeId = 1 // NOTE: hard-coding this here. I won't be implementing a login system (yet!)
    // TODO: set the base URL in Axios
    const response = await app.$axios.$get(`http://localhost:9000/employees/${employeeId}/performance_reviews/assigned`)

    // TODO: conversion of snakecase to camelcase on receiving API responses
    return {
      performanceReviews: response.data
    }
  },
  methods: {
    async edit (performanceReviewId, targetName) {
      this.errors.clear()

      this.editingIndex = this.performanceReviews.findIndex(item => item.performance_review_id === performanceReviewId)

      console.log('editingIndex', this.editingIndex)

      const response = await this.$axios.$get(`http://localhost:9000/performance_reviews/${performanceReviewId}`)
      this.editingItem = response.data[0]
      this.editingItem.targetName = targetName

      this.isEditFormShown = true
    },
    async save () {
      await this.$validator.validateAll()
      // Validation system
      if (this.errors.any()) return

      const performanceReview = {
        payload: this.editingItem.payload
      }

      await this.$axios.$put(`http://localhost:9000/performance_reviews/${this.editingItem.performance_review_id}`, { data: performanceReview })

      // Update the completed_at with a "good enough" number for instant updates without hitting the API
      this.$set(this.performanceReviews[this.editingIndex], 'completed_at', moment().format())

      // TODO: content into the performanceReviews object

      this.close()
    },
    close () {
      this.isEditFormShown = false
      this.errors.clear()
    }
  }
}
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
  // This is being used because of the icon issue
  .completed {
    color: #12a293;
  }
</style>

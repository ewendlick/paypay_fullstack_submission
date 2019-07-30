<template>
  <v-layout class="front-background" row wrap>
    <v-dialog v-model="isEditFormShown">
      <v-card>
        <v-card-title>
          <span class="headline">
            Review for {{ editingItem.employee_name }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <template v-if="editingItem.completed_at">
                  <!-- TODO: filter for human-readable date -->
                  <p>On {{ editingItem.completed_at }} you submitted</p>
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
            <v-btn color="blue darken-1" text @click="close">
              OK
            </v-btn>
          </template>
          <template v-else>
            <v-btn color="blue darken-1" text @click="close">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="save">
              Save
            </v-btn>
          </template>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-flex xs12>
      <v-simple-table :fixed-header="true">
        <thead>
          <tr>
            <th class="text-left">Performance Review Target Name</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in performanceReviews" :key="item.id">
            <td>{{ item.employee_name }}</td>
            <!-- TODO: styling. Need to space things better -->
            <td>
              <v-btn @click="edit(item.id)">
                <v-icon>pencil</v-icon>
              </v-btn>
              <v-icon v-if="item.completed_at">check_bold</v-icon>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-flex>

  </v-layout>
</template>

<script>
export default {
  // TODO: confirm this in here
  head () {
    return {
      title: 'Mymy Front'
    }
  },
  data () {
    return {
      performanceReviews: [],
      isEditFormShown: false,
      editingIndex: null,
      editingItem: {
        id: null,
        employee_name: '',
        payload: '',
        completed_at: ''
      }
    }
  },
  computed: {
  },
  watch: {
    isEditFormShown (val) {
      val || this.close()
    }
  },
  // This is the "SSR section" for Nuxt
  async asyncData ({ app, redirect }) {
    const employeeId = 1 // NOTE: hard-coding this here. I won't be implementing a login system...yet
    // TODO: set the base URL in Axios
    const response = await app.$axios.$get(`http://localhost:9000/employees/${employeeId}/performance_reviews/assigned`)

    // TODO: conversion of snakecase to camelcase on receiving API responses
    return {
      performanceReviews: response.data,
      isLoading: false
    }
  },
  methods: {
    async edit (performanceReviewId) {
      this.$validator.reset()

      this.editingIndex = this.performanceReviews.findIndex(item => item.id === performanceReviewId)
      const response = await this.$axios.$get(`http://localhost:9000/performance_reviews/${performanceReviewId}`)
      this.editingItem = response.data[0]

      // TODO: model system?
      /*
      this.editingItem.id = response.id
      this.editingItem.employee_name = response.employee_name
      this.editingItem.payload = response.payload
      this.editingItem.completed_at = response.completed_at
      */

      this.isEditFormShown = true
    },
    async save () {
      await this.$validator.validateAll()
      if (this.errors.any()) return
      // TODO: Error message system

      const performanceReview = {
        payload: this.editingItem.payload
      }

      await this.$axios.$put(`http://localhost:9000/performance_reviews/${this.editingItem.id}`, { data: performanceReview })
      // const response = await this.$axios.$get(`http://localhost:9000/performance_reviews/${this.editingItem.id}`)
      // TODO: refresh page content with an API call?

      // TODO: content into the performanceReviews object

      this.isEditFormShown = false
      // this.close()
    },

    close () {
      this.isEditFormShown = false
      this.$validator.reset()
    }
  }
}
</script>

<style lang="scss">
  .v-content__wrap {
    // TODO: revist. Maybe just the header
    background: linear-gradient(107deg, rgb(37, 96, 159) 0%, rgb(20, 37, 54) 100%);
  }
</style>

<style lang="scss" scoped>
</style>

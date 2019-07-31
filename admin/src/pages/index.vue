<template>
  <div>
    <v-dialog v-model="isEditFormShown" max-width="100%">
      <v-card>
        <v-card-title>
          <span class="headline">
            {{ this.isCreate ? 'Create User' : 'Edit User' }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6 sm4 md3>
                <v-text-field v-model="editingItem.employee_name"
                              v-validate="'required|min:2|max:20'"
                              type="text"
                              label="Name"
                              name="name"
                              :error-messages="errors.first('name')" />
              </v-flex>
              <v-flex xs6 sm4 md3>
                <v-text-field v-model="editingItem.email"
                              v-validate="'required|email'"
                              type="text"
                              label="Email"
                              name="email"
                              :error-messages="errors.first('email')" />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-2" text @click="close">
            Cancel ❌
          </v-btn>
          <v-btn color="blue darken-2" text @click="save">
            Save 💾
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn class="ma-4" large outlined color="light-blue accent-3" @click="create">
      Create new employee ＋
    </v-btn>

    <!--
    <v-layout justify-end>
      <v-flex xs6>
        <v-btn large outlined color="light-blue accent-3" class="ma-4" @click="create">
          Create new employee ＋
        </v-btn>
      </v-flex>
    </v-layout>
    -->

    <v-layout row wrap>
      <v-flex xs12 md10>
        <!-- Vuetify's table doesn't play well with SSR -->
        <no-ssr>
          <v-data-table
            :headers="headers"
            :loading="isLoading"
            :no-data-text="isNoResults ? 'No data' : ''"
            :page.sync="page"
            :items-per-page="10"
            :items="employees"
            item-key="employee_id"
            hide-default-footer
            class="elevation-1">

            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Employees</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>

            <template v-slot:item.action="{ item }">
              <v-btn text @click="edit(item.employee_id)">
                Edit ✏️
              </v-btn>
              <v-btn text @click="remove(item.employee_id)">
                Delete 🗑
              </v-btn>
            </template>

            <template v-if="isNoResults" v-slot:no-results>
              <!-- TODO: icons -->
              <v-alert :value="true" color="error" icon="warning">
              </v-alert>
            </template>
          </v-data-table>
        </no-ssr>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Feedback Admin'
    }
  },
  data () {
    return {
      employees: [],
      isLoading: true,
      isCreate: true,
      isEditFormShown: false,
      editingItem: {
        employee_id: null,
        employee_name: null,
        email: null
      },
      page: 1,
      // Vuetify table requires that this be reactive
      headers: [
        {
          text: 'ID',
          value: 'employee_id'
        },
        {
          text: 'Name',
          value: 'employee_name'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Created at',
          value: 'created_at'
        },
        {
          text: 'Updated at',
          value: 'updated_at'
        },
        { text: 'Actions',
          value: 'action',
          sortable: false
        }
      ]
    }
  },
  computed: {
    isNoResults () {
      return !this.isLoading && this.employees.length === 0
    }
  },
  watch: {
    isEditFormShown (val) {
      val || this.close()
    }
  },
  async asyncData ({ app, redirect }) {
    // TODO: set the base URL in Axios
    const response = await app.$axios.$get('http://localhost:9000/employees')

    // TODO: better query building via the API

    // TODO: conversion of snakecase to camelcase on receiving API responses

    return {
      employees: response.data,
      isLoading: false
    }
  },
  async created () {
    // Vuetify's table seems to require reactive headers. However, if things don't need to be reactive and won't change, I'd do this here:
    // this.headers = Object.freeze([
  },
  methods: {
    create () {
      // BUG: this isn't doing anything
      this.errors.clear()

      this.isCreate = true

      this.editingItem = {
        employee_name: '',
        email: ''
      }

      this.isEditFormShown = true
    },
    async edit (employeeId) {
      this.errors.clear()

      this.isCreate = false

      // Gets newest data from API. This could just use information we have and skip the API call
      const response = await this.$axios.$get(`http://localhost:9000/employees/${employeeId}`)

      this.editingItem = response.data[0]

      this.isEditFormShown = true
    },
    async save () {
      await this.$validator.validateAll()
      // Run validation
      if (this.errors.any()) return

      const employee = {
        employee_name: this.editingItem.employee_name,
        email: this.editingItem.email
      }

      if (this.isCreate) {
        await this.$axios.$post(`http://localhost:9000/employees`, { data: employee })
      } else {
        await this.$axios.$put(`http://localhost:9000/employees/${this.editingItem.employee_id}`, { data: employee })
      }

      // TODO: link up API return messages to display to the user

      // NOTE: Could just slip the content into this.employees...
      this.refresh()

      this.close()
    },
    async refresh () {
      const response = await this.$axios.$get('http://localhost:9000/employees')
      this.employees = response.data
    },
    async remove (employeeId) {
      // TODO: trigger a popup prompting about deletion, or some sort of indication to the user
      // TODO: toastr or Vuetify's options
      const response = await this.$axios.$delete(`http://localhost:9000/employees/${employeeId}`)

      // NOTE: Could just splice out the content from this.employees...
      this.refresh()
    },
    close () {
      this.isEditFormShown = false
      this.errors.clear()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

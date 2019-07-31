<template>
  <div>
    {{ employees }}
    <v-layout align-center justify-space-between>
      <v-flex>
        <v-text-field v-model="employeeName"
                      label="Name">
        </v-text-field>
      </v-flex>
      <v-flex>
        <v-text-field v-model="email"
                      label="Name">
        </v-text-field>
      </v-flex>
      <!--
        TODO: switch to flatpickr or remove
      <v-flex>
        <v-calendar
                  v-model="createdAtDateStart"
                  :value="createdAtDateFilter"
                  type="month"
                  :end="createdAtDateEnd"
                  color="primary" />
      </v-flex>
      <v-flex>
        <v-calendar
            v-model="updatedAtDateStart"
            :value="updatedAtDateFilter"
            type="month"
            :end="updatedAtDateEnd"
            color="primary" />
      </v-flex>
      -->
      <v-flex>
        <v-btn large @click="console.log('pretend we are searching')">
          Search
          <v-icon right>
            search
          </v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <!--
      <v-dialog v-if="currentExperimentsType === experimentsTypes.experiments" v-model="isEditFormShown" max-width="100%">
        <v-card>
          <v-card-title>
            <span class="headline">
              {{ isNewExperiment ? 'New' : 'Edit' }} AB Testing
            </span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex v-show="isNewExperiment" xs4 sm4 md2>
                  <v-text-field
                    v-model.lazy="editedItem.key"
                    v-validate="'required'"
                    name="key"
                    label="key"
                    :error-messages="errors.first('key')" />
                </v-flex>
                <v-flex v-show="!isNewExperiment" xs4 sm4 md2>
                  <v-text-field v-model="editedItem.key" name="key" label="key" disabled />
                </v-flex>
                <v-flex xs8 sm6 md4 v-show="isNewExperiment">
                  <v-text-field
                    v-model.lazy="editedItem.name"
                    v-validate="'required'"
                    name="name"
                    label="name"
                    :error-messages="errors.first('name')" />
                </v-flex>
                <v-flex xs4 sm4 md2 v-show="!isNewExperiment">
                  <v-text-field
                    v-model="editedItem.name"
                    name="name"
                    label="name"
                    disabled />
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="editedItem.note"
                    v-validate="'required'"
                    type="text"
                    label="note"
                    name="note"
                    :error-messages="errors.first('note')" />
                </v-flex>
                <v-flex xs4 sm4 md2>
                  <v-text-field v-model.number="editedItem.chance" label="chance" type="number" />
                </v-flex>
                <v-flex xs4 sm4 md2>
                  Enabled: <v-switch v-model="editedItem.enabled" />
                </v-flex>
                <v-flex xs12>
                  <v-btn color="primary" dark @click="addVariants">
                    <v-icon>add</v-icon> Add Variants
                  </v-btn>
                </v-flex>
                <v-flex xs12>
                  <tr v-for="(variant, index) in editedItem.variants" :key="index">
                    <td class="pa-2">
                      <v-text-field
                        v-model="variant.name"
                        v-validate="'required'"
                        :item="variant.name"
                        label="variant name"
                        name="variantName"
                        :error-messages="errors.first('variantName')" />
                    </td>
                    <td class="pa-2">
                      <v-text-field
                        v-model.number="variant.value"
                        v-validate="'required'|'numeric'"
                        :item="variant.value"
                        type="number"
                        name="variantValue"
                        label="variant value"
                        :error-messages="errors.first('variantValue')" />
                    </td>
                    <td class="pa-2">
                      {{ weightedValue(editedItem.variants, variant) }}
                    </td>
                    <td class="pa-2">
                      <v-btn color="red" fab small dark @click="removeVariants(index)">
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="close">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="save">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      -->

      <v-flex xs12>
        <!-- Vuetify's table doesn't play well with SSR -->
        <no-ssr>
          <v-data-table
            :search="search"
            :headers="headers"
            :loading="isLoading"
            :no-data-text="isNoResults ? 'No data' : ''"
            :page.sync="page"
            :items-per-page="10"
            :expanded.sync="expanded"
            show-expand

            :items="employees"
            item-key="employee_name"
            hide-default-footer
            class="elevation-1">

            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Employees</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>


            <template v-slot:expanded-item="{ employees, headers }">
              <td :colspan="headers.length">
                <v-layout row wrap>
                  <v-flex xs12 ma-3>
                    <v-toolbar-title>Performance Reviews</v-toolbar-title>
                    <!--
                    <th v-for="(header, index) in expandedTableHeaders" :key="`${header.value}-${index}`" class="text-xs-center font-weight-bold pa-3">
                      {{ header.text }}
                    </th>
                    <tr v-for="(variant,index) in props.item.variants" :key="`${variant.name}-${index}`">
                      <td class="text-xs-center pa-3">
                        {{ variant.name }}
                      </td>
                      <td class="text-xs-center pa-3">
                        {{ variant.value }}
                      </td>
                      <td class="text-xs-center pa-3">
                        {{ weightedValue(props.item.variants,variant) }}
                      </td>
                    </tr>
                    -->
                  </v-flex>
                </v-layout>
              </td>
            </template>

            <!--
              TODO: Vuetify changed a lot
              https://vuetifyjs.com/en/components/data-tables#customizing-default-rows
                  <v-btn text icon @click="console.log('Pretend we are editing')">
                    <v-icon small>
                      edit
                    </v-icon>
                  </v-btn>
                  <v-btn v-if="isDeleteMode" text icon @click="console.log('Pretend we were prompted to delete')">
                    <v-icon small>
                      delete
                    </v-icon>
                  </v-btn>
            -->

            <template v-if="isNoResults" v-slot:no-results>
              <v-alert :value="true" color="error" icon="warning">
                <!-- TODO: Vuetify filter added -->
                Your search for "{{ search }}" found no results.
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
      employeeName: null,
      email: null,
      isLoading: true,
      search: null,
      expanded: [],
      page: 1,
      isDeleteMode: false, // TODO: active for certain users, or from a button click
      createdAtDateStart: null,
      createdAtDateFilter: null,
      createdAtDateEnd: null,
      updatedAtDateStart: null,
      updatedAtDateFilter: null,
      updatedAtDateEnd: null,
      // Vuetify table requires that this be reactive
      headers: [
      {
        text: '1'
      },
      {
        text: '2'
      },
      {
        text: '3'
      },
      {
        text: '4'
      },
      {
        text: '5'
      },
      {
        text: '6'
      },
      {
        text: '7'
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

    // TODO: conversion of snakecase to camelcase on receiving API responses

    return {
      employees: response.data,
      isLoading: false
    }

  },
  async created () {
    /*
    const result = await this.$axios.$get('http://localhost:9000/employees')
    this.employees = result.data
    console.log(this.employees)
    this.isLoading = false
    */
    // Ekes out performance for this thing that won't be changing, and also gives a talking point for the interview
    // Vuetify requires headers to be reactive
    /*
    this.headers = Object.freeze([
      {
        text: '1'
      },
      {
        text: '2'
      },
      {
        text: '3'
      },
      {
        text: '4'
      },
      {
        text: '5'
      },
      {
        text: '6'
      },
      {
        text: '7'
      }
    ])*/
  },
  methods: {
    generateFakeReviews () {
      // TODO: Vue.set on each item of employees

    }
    // TODO: createEmployee/editEmployee (includes performance reviews)
    // TODO: search date ranges, filter for names/emails
  }
}
</script>

<style lang="scss" scoped>

</style>

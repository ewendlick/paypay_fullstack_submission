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
          <tr v-for="item in employees" :key="item.employee_name">
            <td>{{ item.employee_name }}</td>
            <td>
              ICON
              {{ item.id }}
              <v-btn @click="isEditFormShown = true"></v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-flex>

  </v-layout>
</template>

<script>
export default {
  head () {
    return {
      title: 'Mymy Front'
    }
  },
  data () {
    return {
      employees: [],
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
  async asyncData ({ app, redirect }) {
    // TODO: set the base URL in Axios
    const response = await app.$axios.$get('http://localhost:9000/employees')

    return {
      employees: response.data,
      isLoading: false
    }
  },
  async created () {
  },
  methods: {
    async edit () {
      this.$validator.reset()

      this.editingIndex = this.employees.findIndex(item => item.id === employeeId)
      const response = await this.$axios.$get(`employees/${employeeId}`)
      this.editingItem = response.data
      this.isEditFormShown = true
    },

    async save () {
      await this.$validator.validateAll()
      if (this.errors.any()) return

      await this.$axios.$put(`employees/${this.editedItem.employeeId}`, this.editedItem)
      const response = await this.$axios.$get(`employees/${this.editedItem.employeeId}`)

      this.close()
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
    // TODO: Make this look nicer
    // background-color: #009900;
  }
</style>

<style lang="scss" scoped>
</style>

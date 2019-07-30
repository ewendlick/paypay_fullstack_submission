<template>
  <v-layout row wrap>
    {{ employees }}====
    <!--
    <v-dialog v-if="employees" v-model="isEditFormShown" max-width="100%">
      <v-card>
        <v-card-title>
          <span class="headline">

          </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex v-show="false" xs4 sm4 md2>
                <v-text-field
                  v-model.lazy="editedItem.key"
                  v-validate="'required'"
                  name="key"
                  label="key" />
              </v-flex>
              <v-flex xs4 sm4 md2>
                <v-text-field v-model="editedItem.key" name="key" label="key" disabled />
              </v-flex>
              <v-flex xs8 sm6 md4>
                <v-text-field
                  v-model.lazy="editedItem.name"
                  v-validate="'required'"
                  name="name"
                  label="name" />
                   Vee-validate (nuxt-validate) hook up :error-messages="errors.first('name')" />
              </v-flex>
              <v-flex xs4 sm4 md2>
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
                  name="note"/>
                   :error-messages="errors.first('note')" />
              </v-flex>
              <v-flex xs4 sm4 md2>
                <v-text-field v-model.number="editedItem.chance" label="chance" type="number" />
              </v-flex>
              <v-flex xs4 sm4 md2>
                Enabled: <v-switch v-model="editedItem.enabled" />
              </v-flex>
              <v-flex xs12>
                <v-btn color="primary" dark>
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
                      name="variantName" />

                  </td>
                  <td class="pa-2">
                    <v-text-field
                      v-model.number="variant.value"
                      v-validate="'required'|'numeric'"
                      :item="variant.value"
                      type="number"
                      name="variantValue"
                      label="variant value" />

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
          <v-btn color="blue darken-1" flat @click="close">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" flat @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    -->
    <!-- :headers="headers" -->
    <!-- :options.sync="options" -->
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
            </td>
          </tr>
        </tbody>
      </v-simple-table>



      <v-data-table
        v-if="employees"
        :search="search"
        :items-per-page="5"
        :loading="isLoading"
        :no-data-text="isNoResults ? 'No data' : ''"
        :headers="headers"
        :items="employees"
        item-key="employee_name"
        hide-default-footer
        class="elevation-1">

        <template v-slot:items="props">
          <tr :key="`row-${props.item.employee_name}`">
            <td class="text-xs-center">
              <v-btn flat icon @click="props.expanded = !props.expanded">
                <v-icon small>
                  <template v-if="props.expanded">expand_more</template>
                  <template v-else>chevron_right</template>
                </v-icon>
              </v-btn>
            </td>

            <td class="text-xs-center">
              {{ props.item.employee_name }}
            </td>
            <td class="text-xs-center note">
              {{ props.item.email }}
            </td>

            <td class="justify-center layout py-3">
              <v-btn flat icon @click="editItem(props.item.id)">
                <v-icon small>
                  edit
                </v-icon>
              </v-btn>
              <v-btn v-if="isDeleteMode" flat icon @click="deleteItem(props.item.id)">
                <v-icon small>
                  delete
                </v-icon>
              </v-btn>
            </td>
          </tr>
        </template>

        <template v-slot:expand="props">
          <v-layout row wrap>
            <v-flex xs12 ma-3>

              <th v-for="(header,index) in expandedTableHeaders" :key="`${header.value}-${index}`" class="text-xs-center font-weight-bold pa-3">
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

            </v-flex>
          </v-layout>
        </template>


        <template v-if="isNoResults" v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </template>
      </v-data-table>

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
      // isLoading: true,
      search: null,
      isEditFormShown: false,
      isDeleteMode: false,
      isDeleteDialogShown: false,
      /*
      options: {
        rowsPerPage: 10,
        totalItems: 0 // TODO get the total number of row from API?
      },
      */
      editingIndex: null,
      editingItem: {
        id: null,
        employee_name: '',
        email: ''
        // List of performance reviews to add or remove
      }
      ,
      headers: [
        {
          text: ''
        },
        {
          text: 'asdf'
        },
        {
          text: 'dfg'
        },
        {
          text: ''
        }
      ]

    }
  },
  computed: {
    isNoResults () {
      return false
      // return !this.isLoading && this.employees.length === 0
    }
  },

  watch: {
    isEditFormShown (val) {
      val || this.close()
    }
  },
  async asyncData ({ app, redirect }) {
    // TODO: set the base URL in Axios
    // TODO: handle hydration issues with Vuetify's table
    const response = await app.$axios.$get('http://localhost:9000/employees')

    return {
      employees: response.data,
      // pagination: { totalItems: response.data.length },
      // options: { totalItems: 5 },
      isLoading: false
    }
  },
  async created () {
    // TODO: try server side again
    /*
    const response = await this.$axios.$get('http://localhost:9000/employees')
    this.employees = response.data
    */
  },
  methods: {
    async editItem (experimentId) {
      this.$validator.reset()
      /*
      this.editedIndex = this.experiments.findIndex(item => item.experimentId === experimentId)
      const response = await this.$axios.$get(`experiment/${experimentId}`)
      this.editedItem = response.data
      this.isEditFormShown = true
      */
    },

    async save () {
      await this.$validator.validateAll()
      // if (this.errors.any()) return
      if (true) {
        const createResponse = await this.$axios.$post('experiment', this.editedItem)
        const fetchResponse = await this.$axios.$get(`experiment/${createResponse.data.experimentId}`)
        // this.experiments.push(fetchResponse.data)
      } else {
        await this.$axios.$patch(`experiment/${this.editedItem.experimentId}`, this.editedItem)
        const response = await this.$axios.$get(`experiment/${this.editedItem.experimentId}`)
        // this.$set(this.experiments, this.editedIndex, response.data)
      }
      this.close()
    },

    close () {
      this.isEditFormShown = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = null
        this.$validator.reset()
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

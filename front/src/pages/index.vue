<template>
  <v-layout row wrap>

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
          <v-btn color="blue darken-1" flat @click="close">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" flat @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-flex xs12>
      <v-data-table
        :expand="expand"
        :search="search"
        :headers="currentExperimentsType === experimentsTypes.experiments ? headers: snapshotHeaders"
        :loading="isLoading"
        :no-data-text="isNoResults ? 'No data' : ''"
        :pagination.sync="pagination"
        :items="experiments ? experiments : currentExperiments.experiments"
        item-key="key"
        hide-actions
        class="elevation-1">
        <template v-slot:items="props">
          <tr :key="`row-${props.item.key}`">
            <td class="text-xs-center">
              <v-btn flat icon @click="props.expanded = !props.expanded">
                <v-icon small>
                  <template v-if="props.expanded">expand_more</template>
                  <template v-else>chevron_right</template>
                </v-icon>
              </v-btn>
            </td>
            <td class="text-xs-center">
              {{ props.item.key }}
            </td>
            <td class="text-xs-center">
              {{ props.item.name }}
            </td>
            <td class="text-xs-center note">
              {{ props.item.note }}
            </td>
            <td class="text-xs-center">
              {{ props.item.chance }}
            </td>
            <td class="text-xs-center">
              <template>
                <timeago :datetime="props.item.createdAt" />
              </template>
              <br>{{ props.item.createdByEmployee && props.item.createdByEmployee.employeename }}
            </td>
            <td class="text-xs-center">
                <timeago :datetime="props.item.editedAt" />

              <br>{{ (props.item.editedByEmployee && props.item.editedByEmployee.employeename) || '-' }}
            </td>
            <td class="text-xs-center" v-if="currentExperimentsType === experimentsTypes.experiments">
              <v-switch v-model="props.item.enabled" class="pt-4" @change="switchUpdate(props.item.experimentId, props.item.enabled)" />
            </td>
            <td class="justify-center layout py-3" v-if="currentExperimentsType === experimentsTypes.experiments">
              <v-btn flat icon @click="editItem(props.item.experimentId)">
                <v-icon small>
                  edit
                </v-icon>
              </v-btn>
              <v-btn v-if="isDeleteMode" flat icon @click="deleteItem(props.item.experimentId)">
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
              <v-toolbar-title>Variance</v-toolbar-title>
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
      title: 'Front EDITME'
    }
  },
  data () {
    return {
      isLoading: true,
      search: null,
      expand: false,
      selectedCurrentExperiments: 'Current Draft',
      isEditFormShown: false,
      isPublishDialogShown: false,
      isRollbackDialogShown: false,
      isDateFilterDialogShown: false,
      isCompareExperimentDialogShown: false,
      isDeleteMode: false,
      isDeleteDialogShown: false,
      experimentSnapshot: {},
      experimentSnapshots: [],
      currentExperimentsType: null,
      currentExperiments: null,
      pagination: {
        rowsPerPage: ROWS_PER_PAGE,
        totalItems: 0 // TODO get the total number of row from API?
      },
      editedIndex: null,
      editedItem: {
        experimentId: null,
        type: 'experiment',
        key: '',
        name: '',
        note: '',
        chance: 100,
        variants: [{
          name: null,
          value: null
        }],
        enabled: true
      },
      sourceExperiments: null,
      destinationExperiments: null,
      sourceCompareItems: [],
      destinationCompareItems: [],
      sourceExperimentSelected: false,
      destinationExperimentSelected: false,
      sourceTree: [],
      destinationTree: [],
      dateFilterEvents: {}
    }
  },
  computed: {
    employee () {
      return this.$store.state.employee
    },
    isNoResults () {
      return !this.isLoading && this.experiments.length === 0
    }
  },

  watch: {
    isEditFormShown (val) {
      val || this.close()
    }
  },
  async asyncData ({ app, redirect }) {
    // if (!app.$can('experiment.read')) return redirect('/error', { message: 'Unauthorized' })

    // const response = await app.$axios.$post('experiment/search')

    /*
    return {
      experiments: response.data,
      pagination: { totalItems: response.data.length, rowsPerPage: ROWS_PER_PAGE },
      isLoading: false
    }
    */
  },
  /*
  async created () {
    await this.getExperimentSnapshots()
  },
  */
  methods: {

    async editItem (experimentId) {
      this.$validator.reset()
      this.editedIndex = this.experiments.findIndex(item => item.experimentId === experimentId)
      const response = await this.$axios.$get(`experiment/${experimentId}`)
      this.editedItem = response.data
      this.isEditFormShown = true
    },

    async save () {
      await this.$validator.validateAll()
      if (this.errors.any()) return
      if (this.isNewExperiment) {
        const createResponse = await this.$axios.$post('experiment', this.editedItem)
        const fetchResponse = await this.$axios.$get(`experiment/${createResponse.data.experimentId}`)
        this.experiments.push(fetchResponse.data)
      } else {
        await this.$axios.$patch(`experiment/${this.editedItem.experimentId}`, this.editedItem)
        const response = await this.$axios.$get(`experiment/${this.editedItem.experimentId}`)
        this.$set(this.experiments, this.editedIndex, response.data)
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
    },


    async chooseDateFilter (version) {
      this.currentExperiments = this.experimentSnapshots.find(r => r.version === version)
      this.currentExperimentsType = this.experimentsTypes.snapshot

      for (const date of Object.values(this.dateFilterEvents)) {
        for (const event of date) {
          event.open = false
        }
      }

      this.selectedCurrentExperiments = this.getLabelFromExperiment(this.currentExperiments)

      this.selectCurrentExperiments(this.selectedCurrentExperiments)

      this.isDateFilterDialogShown = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

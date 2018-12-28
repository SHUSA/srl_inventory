<template>
  <v-card v-if="loadComponent">
    <v-card-title>
      <v-dialog
        v-model="dialog"
        max-width="500px"
        @keydown.enter="save(false)"
      >
        <!-- <v-btn v-if="admin" slot="activator" color="primary" class="mb-0" dark>New Item</v-btn> -->
        <v-card>
          <v-card-title>
            <span class="headline">{{formTitle}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <!-- admin input -->
                <template v-if="admin">
                  <v-flex xs6>
                    <v-text-field v-model="editedItem.name" :rules="[rules.item]" label="Item Name" required/>
                  </v-flex>
                  <v-flex xs6>
                    <v-autocomplete
                      :items="assayList"
                      label="Assay"
                      item-text="name"
                      item-value="id"
                      v-model="editedItem.AssayId"
                      append-icon="fa-plus-circle "
                      @click:append="addAssay"
                      :rules="[rules.assay]"
                      dense
                      required
                    />
                  </v-flex>
                  <v-flex xs6>
                    <v-autocomplete
                      :items="vendorList"
                      label="Vendor"
                      item-text="name"
                      item-value="id"
                      v-model="editedItem.VendorId"
                      append-icon="fa-plus-circle "
                      @click:append="addVendor"
                      :rules="[rules.vendor]"
                      dense
                      required
                    />
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field v-model="editedItem.catalogNumber" :rules="[rules.catalog]" label="Catalog Number" required/>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field v-model="editedItem.itemDescription" label="Item Description"/>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field v-model="editedItem.reactionsPerItem" validate-on-blur :rules="[rules.number]" ref="reactionsPerItem" type="number" min=0 hint="Use 0 for general items." persistent-hint label="Reactions per Item"/>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field v-model="editedItem.currentStock" validate-on-blur :rules="[rules.number]" ref="currentStock" type="number" min=0 label="Current Stock"/>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field disabled v-model="editedItem.safetyStock" label="Safety Stock"/>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field v-model="editedItem.weeksOfSafetyStock" validate-on-blur :rules="[rules.number]" ref="safetyStock" type="number" min=0 label="Safety Weeks"/>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field v-model="editedItem.leadTimeDays" validate-on-blur :rules="[rules.number]" ref="leadtimeDays" type="number" min=0 label="Lead Time (Days)"/>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field v-model="editedItem.weeksOfReorder" validate-on-blur :rules="[rules.number]" ref="weeksOfReorder" type="number" min=0 label="Reorder Weeks"/>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field v-model="editedItem.reorderPoint" validate-on-blur :rules="[rules.number]" ref="reorderPoint" type="number" min=0 label="Reorder Point"/>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field v-model="editedItem.reorderQuantity" validate-on-blur :rules="[rules.wholeNumber]" ref="reorderQuantity" type="number" min=0 label="Reorder Quantity"/>
                  </v-flex>
                </template>
                <!-- user input -->
                <template v-if="user">
                  <v-flex xs6 fill-height justify-center>
                    <v-chip label color="light-blue lighten-1" class="label" small>Reactions per Item</v-chip>
                  </v-flex>
                  <v-flex class="dashed-border pa-2 text-xs-right" xs6>
                    {{editedItem.reactionsPerItem}}
                  </v-flex>

                  <v-flex xs6 fill-height justify-center>
                    <v-chip label color="light-blue lighten-1" class="label" small>Reorder Point</v-chip>
                  </v-flex>
                  <v-flex class="dashed-border pa-2 text-xs-right" xs6>
                    {{editedItem.reorderPoint}}
                  </v-flex>

                  <v-flex xs6 fill-height justify-center>
                    <v-chip label color="light-blue lighten-1" class="label" small>Reorder Quantity</v-chip>
                  </v-flex>
                  <v-flex class="dashed-border pa-2 text-xs-right" xs6>
                    {{editedItem.reorderQuantity}}
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field
                      v-model="editedItem.currentStock"
                      validate-on-blur :rules="[rules.number]"
                      autofocus
                      type="number"
                      min=0
                      label="Current Stock"
                      persistent-hint
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                    v-model="editedItem.comment"
                    outline
                    no-resize
                    counter=140
                    validate-on-blur
                    :rules="[rules.text]"
                    label="Comment"/>
                  </v-flex>
                </template>
                <v-flex xs12>
                  <v-alert
                    :value="alert"
                    type="error"
                  >
                    {{alertMessage}}
                  </v-alert>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <!-- to do: enable deactivation button once reactivation is complete -->
            <v-btn v-if="currentItem.name && admin" color="error" @click.native="deactivationDialog = !deactivationDialog" small>Deactivate</v-btn>
            <v-btn v-if="user" color="orange" small @click.native="save(true)">Manual Order</v-btn>
            <v-spacer/>
            <v-progress-circular indeterminate color="primary" v-if="loading"/>
            <v-btn color="red darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save(false)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="assayDialog"
        max-width="500px"
        @keydown.enter="saveAssay"
      >
        <v-card>
          <v-card-title>
            <span class="headline">{{assayForm}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs6>
                  <v-text-field v-model="editedAssay.name" :rules="[rules.assay]" label="Name" required/>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="editedAssay.weeklyVolume" ref="weeklyVolume" validate-on-blur :rules="[rules.wholeNumber]" type="number" min=0 label="Weekly Volume"/>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="editedAssay.weeklyRuns" ref="weeklyRuns" validate-on-blur :rules="[rules.wholeNumber]" type="number" min=0 label="Runs per Week"/>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="editedAssay.controlsPerRun" ref="controlsPerRun" validate-on-blur :rules="[rules.wholeNumber]" type="number" min=0 label="Controls per Run"/>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="editedAssay.maxBatchSize" ref="maxBatchSize" validate-on-blur :rules="[rules.wholeNumber]" type="number" min=0 label="Max Batch Size"/>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="editedAssay.sampleReplicates" ref="sampleReplicates" validate-on-blur :rules="[rules.wholeNumber]" type="number" min=0 label="Sample Replicates"/>
                </v-flex>
                <v-flex xs12>
                  <v-alert
                    :value="alert"
                    type="error"
                  >
                    {{alertMessage}}
                  </v-alert>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-progress-circular indeterminate color="primary" v-if="loading"/>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="saveAssay">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="vendorDialog"
        max-width="500px"
        @keydown.enter="saveVendor"
      >
        <v-card>
          <v-card-title>
            <span class="headline">{{vendorForm}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedVendor.name" label="Name" :rules="[rules.vendor]" required/>
                </v-flex>
                <v-flex xs12>
                  <v-alert
                    :value="alert"
                    type="error"
                  >
                    {{alertMessage}}
                  </v-alert>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-progress-circular indeterminate color="primary" v-if="loading"/>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="saveVendor">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="deactivationDialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Deactivate {{currentItem.name}}?</span>
          </v-card-title>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="blue darken-1" flat @click="deactivationDialog = false">No</v-btn>
            <v-btn color="red darken-1" flat @click="deactivateItem(currentItem)">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-container>
        <v-layout row wrap>
          <v-btn small dark color="primary" @click="dialog = !dialog" v-if="admin">
            Add Item
          </v-btn>
          <v-btn href="javascript:void(0)" id="csvbtn" small dark @click="getCSV">
            <v-icon small class="pr-1">fa-file-download</v-icon>CSV
          </v-btn>
          <v-btn href="javascript:void(0)" id="backup" small dark @click="getBackup">
            <v-icon small class="pr-1">fa-file-download</v-icon>Backup Parameters
          </v-btn>

          <v-spacer/>

          <v-spacer/>

          <!-- all in one filter -->
          <v-text-field
            v-model="search"
            append-icon="fa-search"
            label="Search for item, assay, vendor, etc"
            hint="test"
            persistent-hint
            clearable
            single-line
            hide-details
          />
        </v-layout>
        <v-layout row wrap>
          <!-- displays each assay with outstanding orders -->
          <v-card-text>
            Assays not updated since {{lastOrderPeriod}} will look like so
            <v-chip small>
              <v-badge color="red" right>
                <span slot="badge">EX</span>
                <span>Example</span>
              </v-badge>
            </v-chip>
          </v-card-text>
          <v-chip v-for="(value, index) in outstandingAssays" :key="index" @click="searchTerm(value.name)">
            <v-badge color="red" right>
              <span v-if="value.count > 0" slot="badge">{{value.count}}</span>
              <span>{{value.name}}</span>
            </v-badge>
          </v-chip>
        </v-layout>
      </v-container>
    </v-card-title>

    <v-snackbar
      v-model="snackbar"
      color="primary"
      bottom
    >
      <v-flex class="text-xs-center">
        {{snackText}}
      </v-flex>
    </v-snackbar>

    <v-data-table
      ref="search"
      :headers="headers"
      :items="supplies"
      :search="search"
      must-sort
      hide-actions
    >
      <!-- item name -->
      <template slot="items" slot-scope="props">
        <td class="pointer" @click="editItem(props.item)">
          <v-tooltip top open-delay=50>
            <span slot="activator">{{props.item.name}}</span>
            <span>Edit {{props.item.name}} info</span>
          </v-tooltip>
        </td>
        <!-- vendor name -->
        <td v-if="admin" class="pointer" @click="editVendor(props.item.VendorId)">
          <v-tooltip top open-delay=50>
            <span slot="activator">{{getVendor(props.item)}}</span>
            <span>Edit Vendor</span>
          </v-tooltip>
        </td>
        <td v-else>{{getVendor(props.item)}}</td>
        <!-- assay name -->
        <td v-if="admin" class="pointer" @click="editAssay(props.item.AssayId)">
          <v-tooltip top open-delay=50>
            <span slot="activator">{{getAssay(props.item)}}</span>
            <span>Edit Assay</span>
          </v-tooltip>
        </td>
        <td v-else>{{getAssay(props.item)}}</td>
        <!-- catalog number -->
        <td>{{props.item.catalogNumber}}</td>
        <!-- item description -->
        <td>{{props.item.itemDescription}}</td>
        <!-- current stock -->
        <td class="pointer" @click="editItem(props.item)">
          <v-badge color="red">
            <span slot="badge" v-if="checkQuantity(props.item)">!</span>
            {{props.item.currentStock}}
          </v-badge>
        </td>
        <!-- inline edit for current stock -->
        <!-- <td>
          <v-edit-dialog
            :return-value.sync="props.item.currentStock"
            lazy
          > {{ props.item.currentStock }}
            <v-text-field
              slot="input"
              v-model="props.item.currentStock"
              :label="`${props.item.name} Stock`"
              :hint="`${props.item.name} Stock`"
              :rules="[rules.number]"
              type="number"
              persistent-hint
              single-line
            />
          </v-edit-dialog>
        </td> -->
        <!-- reorder quantity -->
        <td>{{toOrder(props.item)}}</td>
        <!-- comment -->
        <td class="pointer" @click="editItem(props.item)">{{props.item.comment}}</td>
        <!-- last update -->
        <td>{{time(props.item)}}</td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="fa-exclamation-triangle">Nothing here!</v-alert>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        No results for {{search}}.
      </v-alert>
    </v-data-table>
    <scroll/>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import itemService from '@/services/ItemService.js'
import assayService from '@/services/AssayService.js'
import vendorService from '@/services/VendorService.js'
import entryService from '@/services/EntryService.js'
import orderService from '@/services/OrderService.js'
import saveAs from 'file-saver'
import JSZip from 'jszip'
const Json2csvParser = require('json2csv').Parser
// Notes on number input type
// -unable to block e, -, +
// -unable to prevent mouse scroll
// -possible vue limitation?
// -look into https://www.npmjs.com/package/@paulpv/vuetify-number-field?activeTab=readme
// in the meantime, treat as text and only allow real and positive numbers to pass through

export default {
  data () {
    return {
      currentItem: {},
      catalogNumbers: [],
      vendorNames: [],
      assayNames: [],
      dialog: false,
      assayDialog: false,
      vendorDialog: false,
      snackbar: false,
      snackText: '',
      deactivationDialog: false,
      alert: false,
      loading: false,
      loadComponent: false,
      search: '',
      alertMessage: '',
      assayForm: '',
      vendorForm: '',
      errors: {
        assay: false,
        vendor: false,
        catalog: false,
        item: false,
        text: false,
        num: []
      },
      rules: {
        number: (val) => {
          const num = parseFloat(val)
          // to do: create error object with all number validated refs, check $ref.<refname>.value to see if is num, true if yes, false if no
          if (!isNaN(num) && num >= 0) {
            this.errors.num.pop()
            return true
          } else {
            this.errors.num.push('')
            return 'Please enter a valid number'
          }
        },
        wholeNumber: (val) => {
          const num = parseFloat(val)
          if (!isNaN(num) && num >= 0 && Number.isInteger(num)) {
            this.errors.num.pop()
            return true
          } else {
            this.errors.num.push('')
            return 'Please enter an integer'
          }
        },
        text: (v) => {
          if (v.length <= 140) {
            this.errors.text = false
            return true
          } else {
            this.errors.text = true
            return 'Max 140 characters'
          }
        },
        catalog: (text) => {
          if (text.length === 0) {
            this.errors.catalog = true
            return 'Please enter a unique catalog number'
          } else if (this.catalogNumbers.includes(text.toUpperCase())) {
            // fixes error throwing on existing items
            if (this.editedIndex > -1) {
              this.errors.catalog = false
              return true
            } else {
              this.errors.catalog = true
              return 'Duplicate catalog found'
            }
          } else {
            this.errors.catalog = false
            return true
          }
        },
        assay: (text) => {
          if (text.length === 0) {
            this.errors.assay = true
            return 'Please enter a valid name'
          } else if (this.assayNames.includes(text.toUpperCase())) {
            if (this.editedIndex > -1) {
              this.errors.assay = false
              return true
            } else {
              this.errors.assay = true
              return 'Duplicate assay name found'
            }
          } else {
            this.errors.assay = false
            return true
          }
        },
        vendor: (text) => {
          if (text.length === 0) {
            this.errors.vendor = true
            return 'Please enter a valid name'
          } else if (this.vendorNames.includes(text.toUpperCase())) {
            if (this.editedIndex > -1) {
              this.errors.vendor = false
              return true
            } else {
              this.errors.vendor = true
              return 'Duplicate vendor name found'
            }
          } else {
            this.errors.vendor = false
            return true
          }
        },

        item: (text) => {
          if (text.length === 0) {
            this.errors.item = true
            return 'Please enter a valid name'
          } else {
            this.errors.item = false
            return true
          }
        }
      },
      headers: [
        {text: 'Item', value: 'name', width: '15%'},
        {text: 'Vendor', value: 'vendor'},
        {text: 'Assay', value: 'assay.name'},
        {text: 'Catalog #', value: 'catalogNumber'},
        {text: 'Desc', value: 'itemDescription', width: '10%'},
        {text: 'Stock', value: 'currentStock'},
        {text: 'To Order', value: 'reorderQuantity'},
        {text: 'Comment', value: 'comment', width: '15%'},
        {text: 'Last Update', value: 'updatedAt'}
      ],
      supplies: [],
      assayList: [],
      vendorList: [],
      orderList: [],
      editedAssay: {
        name: '',
        weeklyVolume: 0,
        weeklyRuns: 0,
        controlsPerRun: 0,
        maxBatchSize: 0,
        sampleReplicates: 1
      },
      defaultAssay: {
        name: '',
        weeklyVolume: 0,
        weeklyRuns: 0,
        controlsPerRun: 0,
        maxBatchSize: 0,
        sampleReplicates: 1
      },
      editedVendor: {
        name: ''
      },
      defaultVendor: {
        name: ''
      },
      editedIndex: -1,
      editedItem: {
        name: '',
        AssayId: '',
        VendorId: '',
        catalogNumber: '',
        itemDescription: '',
        reactionsPerItem: 0,
        currentStock: 0,
        weeksOfSafetyStock: 2,
        leadTimeDays: 7,
        weeksOfReorder: 8,
        reorderPoint: 0,
        reorderQuantity: 0,
        comment: ''
      },
      defaultItem: {
        name: '',
        AssayId: '',
        VendorId: '',
        catalogNumber: '',
        itemDescription: '',
        reactionsPerItem: 0,
        currentStock: 0,
        weeksOfSafetyStock: 2,
        leadTimeDays: 7,
        weeksOfReorder: 8,
        reorderPoint: 0,
        reorderQuantity: 0,
        comment: ''
      }
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : `Editing ${this.editedItem.name}`
    },

    ...mapState([
      'pageTitle',
      'admin',
      'user',
      'storedFilters'
    ]),

    lastOrderPeriod () {
      return this.$moment().startOf('week').subtract(7, 'day').format('MMM DD, YYYY')
    },

    outstandingAssays () {
      let obj = {}
      this.supplies.map(item => {
        this.recentlyUpdated(item)
        this.getAssay(item)
        // check if assay object is attached and make sure it's not a duplicate
        if (item.assay) {
          let assayName = item.assay.name
          // create object for each assay in supplies
          if (!obj.hasOwnProperty(assayName)) {
            obj[assayName] = {}
            obj[assayName].count = 0
            obj[assayName].recentlyUpdated = item.recentlyUpdated
          }
          // count number of outstanding items with same assay name
          if (!item.recentlyUpdated) obj[assayName].count += 1
        }
      })

      let arr = []
      Object.keys(obj).forEach((key, i) => {
        arr.push({
          name: key,
          count: obj[key].count,
          recentlyUpdated: obj[key].recentlyUpdated
        })
      })

      return arr.sort((a, b) => a.name.localeCompare(b.name, 'en', {'sensitivity': 'base'}))
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },

    assayDialog (val) {
      if (!val) {
        this.alert = false
      }
    },

    vendorDialog (val) {
      if (!val) {
        this.alert = false
      }
    }
  },

  async mounted () {
    // initialize variables
    this.loadComponent = false
    this.supplies = (await itemService.show(this.storedFilters)).data
    this.catalogNumbers = (await itemService.index(['catalogNumber'])).data.map(item => item.catalogNumber)
    this.vendorList = (await vendorService.index()).data
    this.vendorNames = this.vendorList.map(vendor => vendor.name.toUpperCase())
    this.assayList = (await assayService.index()).data
    this.assayNames = this.assayList.map(assay => assay.name.toUpperCase())
    this.orderList = (await orderService.index()).data

    // go to top
    window.scroll({
      top: 0,
      left: 0
    })
    this.loadComponent = true
  },

  methods: {
    getCSV () {
      const csvbtn = document.getElementById('csvbtn')
      const fields = ['vendor', 'catalogNumber', 'assay.name', 'name', 'currentStock', 'lastUpdate']
      const json2csv = new Json2csvParser({fields})
      const results = this.$refs.search.filteredItems
      const csv = json2csv.parse(results)
      const blob = new Blob([csv], {type: 'text/csv'})

      csvbtn.href = URL.createObjectURL(blob)
      csvbtn.download = `${this.$moment().format('YYYY-MM-DD')} Inventory.csv`
    },

    async getBackup () {
      const json2csv = new Json2csvParser()
      const json2csv2 = new Json2csvParser()
      const json2csv3 = new Json2csvParser()
      const zip = new JSZip()
      const csv = json2csv.parse((await assayService.index()).data)
      const blob = new Blob([csv], {type: 'text/csv'})
      const csv2 = json2csv2.parse((await itemService.index()).data)
      const blob2 = new Blob([csv2], {type: 'text/csv'})
      const csv3 = json2csv3.parse((await vendorService.index()).data)
      const blob3 = new Blob([csv3], {type: 'text/csv'})

      zip.file(`${this.$moment().format('YYYY-MM-DD')} Assay Backup.csv`, blob)
      zip.file(`${this.$moment().format('YYYY-MM-DD')} Item Backup.csv`, blob2)
      zip.file(`${this.$moment().format('YYYY-MM-DD')} Vendor Backup.csv`, blob3)

      zip.generateAsync({type: 'blob'})
        .then(content => {
          saveAs(content, `${this.$moment().format('YYYY-MM-DD')} Inventory Backup.zip`)
        })
    },

    time (item) {
      item.lastUpdate = this.$moment(item.updatedAt).format('MMM-DD-YYYY HH:mm:ss')
      return item.lastUpdate
    },

    recentlyUpdated (item) {
      let oneWeekAgo = this.$moment().startOf('week').subtract(7, 'day').format()

      // checks to see if item was updated in the past 2 weeks, starting from Sunday
      // does not account if user or admin did the update
      // does not account if order was triggered
      if (item.updatedAt < oneWeekAgo) {
        item.recentlyUpdated = false
      } else {
        item.recentlyUpdated = true
      }

      return item.recentlyUpdated
    },

    searchTerm (term) {
      this.search = term
    },

    checkQuantity (item) {
      return item.currentStock <= item.reorderPoint
    },

    checkPreviousOrder (recentOrder) {
      const lastSunday = this.$moment().startOf('week').format()

      return recentOrder.createdAt < lastSunday || recentOrder.completed
    },

    createEntry (editedItem) {
      return {
        ItemId: editedItem.id,
        updatedAt: editedItem.updatedAt,
        currentStock: editedItem.currentStock,
        orderQuantity: editedItem.currentStock + editedItem.reorderQuantity,
        comment: editedItem.comment
      }
    },

    toOrder (item) {
      return this.checkQuantity(item) ? item.reorderQuantity : 0
    },

    checkErrorMessage (resp) {
      if (resp.status !== 200) {
        // stop process and display error message
        this.loading = false
        this.alert = true
        this.alertMessage = Array.isArray(resp.data) ? resp.data[0].message : resp.statusText
        return true
      } else {
        // no errors received
        return false
      }
    },

    openSnack (text) {
      this.snackText = text
      this.snackbar = true
    },

    customFilter (item, queryText, itemText) {
      console.log('customFilter')
      console.log(`item ${item}`)
      console.log(`queryText ${queryText}`)
      console.log(`itemText ${itemText}`)

      return null
    },

    getAssay (item) {
      if (this.assayList.length === 0) {
        return null
      }
      item.assay = this.assayList.find(assay => assay.id === item.AssayId)
      return item.assay.name
    },

    getVendor (item) {
      if (this.vendorList.length === 0) {
        return null
      }
      item.vendor = this.vendorList.find(vendor => vendor.id === item.VendorId).name
      return item.vendor
    },

    addAssay () {
      this.assayForm = 'New Assay'
      this.assayDialog = true
      this.alert = false
    },

    addVendor () {
      this.vendorForm = 'New Vendor'
      this.vendorDialog = true
      this.alert = false
    },

    editAssay (id) {
      this.snackbar = false
      this.assayForm = 'Edit Assay'
      this.editedAssay = Object.assign({}, this.assayList.find((assay, index) => {
        if (assay.id === id) {
          this.editedIndex = index
          return assay
        }
      }))
      this.assayDialog = true
    },

    editVendor (id) {
      this.snackbar = false
      this.vendorForm = 'Edit Vendor'
      this.editedVendor = Object.assign({}, this.vendorList.find((vendor, index) => {
        if (vendor.id === id) {
          this.editedIndex = index
          return vendor
        }
      }))
      this.vendorDialog = true
    },

    editItem (item) {
      this.snackbar = false
      this.currentItem = item
      this.editedIndex = this.supplies.indexOf(item)
      this.editedItem = Object.assign(this.editedItem, item)
      this.dialog = true
    },

    async deactivateItem (item) {
      // to do: deactivate all associated items if Assay is deactivated
      const index = this.supplies.indexOf(item)
      item.active = false
      await itemService.put(item.id, item)
      this.supplies.splice(index, 1)
      this.dialog = false
      this.deactivationDialog = false
      this.currentItem = {}
      this.openSnack(`${item.name} deactivated`)
    },

    close () {
      if (this.assayDialog) {
        this.assayDialog = false
        this.editedAssay = Object.assign({}, this.defaultAssay)
        if (!this.dialog) this.editedItem.AssayId = ''
      } else if (this.vendorDialog) {
        this.vendorDialog = false
        this.editedVendor = Object.assign({}, this.defaultVendor)
        if (!this.dialog) this.editedItem.VendorId = ''
      } else if (this.dialog && !this.assayDialog && !this.vendorDialog) {
        this.dialog = false
        this.currentItem = {}
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      } else {
        this.currentItem = {}
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      }
    },

    async saveAssay () {
      const num = this.errors.num.length
      this.alertMessage = 'Please use a valid name or fix form'

      if (this.errors.assay || num) {
        this.alert = true
      } else {
        let assayInfo = {}
        let edited = this.editedAssay
        this.loading = true
        this.alert = false
        if (this.assayForm === 'Edit Assay') {
          // existing assay
          let response = await assayService.put(edited)

          if (this.checkErrorMessage(response)) {
            // do nothing
          } else {
            assayInfo = this.assayList.find(assay => assay.id === edited.id)
            this.editedItem.AssayId = assayInfo.id
            Object.assign(assayInfo, response.data)
            // update all items with edited assay
            let itemList = []
            this.supplies.map(item => {
              if (item.AssayId === assayInfo.id) {
                itemList.push(item)
              }
            })
            let recalcOrder = await itemService.put(null, null, null, itemList)

            if (this.checkErrorMessage(recalcOrder)) {
              // do nothing
            } else {
              let index = 0
              // reassign new values to supplies
              recalcOrder.data.map(item => {
                index = this.supplies.findIndex(x => x.id === item.id)
                this.supplies.splice(index, 1)
                this.supplies.push(item)
              })
            }
          }
        } else {
          // new assay
          assayInfo = (await assayService.post(edited)).data
          this.editedItem.AssayId = assayInfo.id
          this.assayList.push(assayInfo)
        }
      }

      if (!this.alert) {
        this.loading = false
        this.openSnack('Assay saved')
        this.editedIndex = -1
        this.close()
      }
    },

    async saveVendor () {
      const num = this.errors.num.length
      this.alertMessage = 'Please enter a valid name'

      if (this.errors.vendor || num) {
        this.alert = true
      } else {
        let vendorInfo = {}
        let edited = this.editedVendor
        this.loading = true
        this.alert = false
        if (this.vendorForm === 'Edit Vendor') {
          // existing vendor
          let response = await vendorService.put(edited)

          if (this.checkErrorMessage(response)) {
            // do nothing
          } else {
            vendorInfo = this.vendorList.find(vendor => vendor.id === edited.id)
            this.editedItem.VendorId = vendorInfo.id
            Object.assign(vendorInfo, response.data)
          }
        } else {
          // new vendor
          vendorInfo = (await vendorService.post(edited)).data
          this.editedItem.VendorId = vendorInfo.id
          this.vendorList.push(vendorInfo)
        }
      }

      if (!this.alert) {
        this.loading = false
        this.openSnack('Vendor saved')
        this.editedIndex = -1
        this.close()
      }
    },

    async save (order) {
      const num = this.errors.num.length
      this.alertMessage = 'Please fix errors'

      if (this.errors.item || num || this.errors.catalog) {
        this.alert = true
      } else {
        let assayInfo = this.assayList.find(assay => assay.id === this.editedItem.AssayId)
        this.loading = true
        this.alert = false
        for (let key in this.editedItem) {
          if (typeof this.editedItem[key] === 'string') {
            this.editedItem[key] = this.editedItem[key].trim()
          }
        }
        this.editedItem.catalogNumber = this.editedItem.catalogNumber.toUpperCase()
        // scaling to account for weird JS math
        this.editedItem.currentStock = parseInt(this.editedItem.currentStock * 100 + 0.01) / 100

        if (this.editedIndex > -1) {
          // existing item
          let focusedItem = this.supplies[this.editedIndex]
          this.editedItem.updatedAt = Date.now()
          let response = await itemService.put(focusedItem.id, this.editedItem, assayInfo)

          if (this.checkErrorMessage(response)) {
            // do nothing
          } else {
            Object.assign(focusedItem, response.data)
            this.snackText = 'Item updated'
          }
        } else {
          // new item
          this.supplies.push((await itemService.post(this.editedItem, assayInfo)).data)
          this.snackText = 'Item saved'
        }

        // add more robust conditions to ensure true orders go through
        if (order || (this.checkQuantity(this.editedItem) && this.user)) {
          let entry = this.createEntry(this.editedItem)
          if (this.orderList.length === 0) {
            // initial orders
            const newOrder = (await orderService.post()).data
            this.orderList.pop()
            this.orderList.push(newOrder)
            entry.OrderId = newOrder.id
            await entryService.post([entry])
          } else {
            const recentOrder = this.orderList[0]

            if (this.checkPreviousOrder(recentOrder)) {
              // recent order too old or completed, create new order and associate OrderId
              const newOrder = (await orderService.post()).data
              this.orderList.splice(0, 0, newOrder)
              entry.OrderId = newOrder.id
              await entryService.post([entry])
            } else {
              // add current OrderId to entry
              let matchedEntry = null
              const orderEntries = (await orderService.show(recentOrder.id)).data
              matchedEntry = orderEntries.Entries.find(orderEntry => orderEntry.ItemId === entry.ItemId)
              // check if current entry's ItemId is in recentOrder, update if so
              if (matchedEntry === undefined) {
                // ItemId not in Order Entries
                entry.OrderId = recentOrder.id
                await entryService.post([entry])
              } else {
                // ItemId in Order Entries
                Object.assign(matchedEntry, entry)
                await entryService.put([matchedEntry])
              }
            }
          }
          this.snackText += ' and ordered'
        } else if (!this.checkQuantity(this.editedItem) && this.user) {
          // delete Entry if currentStock > reorderPoint AND user is logged in
          let entry = this.createEntry(this.editedItem)
          const recentOrder = this.orderList[0]
          const orderEntries = (await orderService.show(recentOrder.id)).data
          let matchedEntry = orderEntries.Entries.find(orderEntry => orderEntry.ItemId === entry.ItemId)
          if (matchedEntry) {
            await entryService.delete(matchedEntry.id)
            if (orderEntries.Entries.length === 1) {
              // Entry deleted in previous promise
              await orderService.delete(orderEntries.id)
            }
            this.snackText += ' and removed from current order'
          }
        }
      }

      if (!this.alert) {
        this.loading = false
        this.openSnack(this.snackText)
        this.close()
      }
    }
  }
}
</script>

<style scoped>

  /* deprecated but kept in case needed to reimplement
  used to do smart table display
  add 'fixed' class to v-data-table
  @media screen and (min-width: 1200px){
    .fixed >>> .v-table {
      table-layout: fixed;
      width: 100%;
      white-space: nowrap;
    }
  }

  @media screen and (max-width: 800px) {
    .fixed td {
    white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  } */

  .box {
    min-width: 25%;
  }

  .label {
    width: 95%;
  }

  .dashed-border:after {
    content: "";
    display: block;
    width: 105%;
    float: right;
    border-bottom: 1px dotted gray;
  }

  .pointer {
    cursor: pointer;
  }

  .help {
    cursor: help;
  }
</style>
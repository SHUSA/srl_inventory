<template>
  <div>
    <error :response="response"/>

    <!-- dialog -->
    <v-dialog
      v-model="dialog"
      max-width="500px"
      @keydown.enter="validateData()"
    >
      <dialog-base :formTitle="formTitle" :dataInfo.sync="currentVendor" :vendors="vendors" :reassigned.sync="resData">
        <v-form slot="input-fields" ref="form" v-model="form" lazy-validation>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field v-model.trim="editedVendor.name" validate-on-blur label="Name" :rules="[rules.vendor]" required/>
              </v-flex>
              <!-- hidden input to prevent page reload on keydown.enter -->
              <v-flex xs12 v-show="false">
                <v-text-field disabled/>
              </v-flex>
              <!-- alert -->
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
        </v-form>
        <!-- actions -->
        <template slot="buttons">
          <v-progress-circular indeterminate color="primary" v-if="loading"/>
          <v-btn flat color="error" @click="close()">Cancel</v-btn>
          <v-btn flat color="primary" @click="validateData()">Save</v-btn>
        </template>
      </dialog-base>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import vendorService from '@/services/VendorService.js'
import Deactivation from './Deactivation'
import DialogBase from './DialogBase'

export default {
  props: [
    'vendorDialog',
    'selectedVendor',
    'vendorNameList',
    'vendorList',
    'vendorIndex',
    'editedItem',
    'reassigned'
  ],

  components: {
    Deactivation,
    DialogBase
  },

  data () {
    return {
      form: true,
      deactivationDialog: false,
      response: '',
      alert: false,
      alertMessage: '',
      loading: false,
      snackText: '',
      formTitle: 'New Vendor',
      rules: {
        vendor: (text) => {
          if (text.length === 0) {
            return 'Please enter a valid name'
          } else if (this.vendorNames.find(vendor => vendor.toUpperCase() === text.toUpperCase())) {
            if (this.index > -1) {
              return true
            } else {
              return 'Duplicate vendor name found'
            }
          } else {
            return true
          }
        }
      },
      editedVendor: {
        name: ''
      },
      defaultVendor: {
        name: ''
      }
    }
  },

  watch: {
    dialog (val) {
      if (val) {
        if (this.index > -1) {
          // existing vendor
          this.editedVendor = Object.assign(this.editedVendor, this.currentVendor)
          this.formTitle = `Editing ${this.selectedVendor.name}`
        } else {
          // new vendor
          this.formTitle = 'New Vendor'
        }
      } else {
        this.close()
      }
    }
  },

  computed: {
    ...mapState([
      'user'
    ]),

    dialog: {
      get () {
        return this.vendorDialog
      },

      set (value) {
        this.$emit('update:vendorDialog', value)
      }
    },

    index: {
      get () {
        return this.vendorIndex
      },

      set (value) {
        this.$emit('update:vendorIndex', value)
      }
    },

    currentItem: {
      get () {
        return this.editedItem
      },

      set (value) {
        this.$emit('update:editedItem', value)
      }
    },

    currentVendor: {
      get () {
        return this.selectedVendor
      },

      set (value) {
        this.$emit('update:selectedVendor', value)
      }
    },

    vendorNames: {
      get () {
        return this.vendorNameList
      },

      set (value) {
        this.$emit('update:vendorNameList', value)
      }
    },

    vendors: {
      get () {
        return this.vendorList
      },

      set (value) {
        this.$emit('update:vendorList', value)
      }
    },

    resData: {
      get () {
        return this.reassigned
      },

      set (value) {
        this.$emit('update:reassigned', value)
      }
    }
  },

  methods: {
    close () {
      setTimeout(() => {
        this.editedVendor = Object.assign({}, this.defaultVendor)
        // this.index = -1
        // this.currentVendor = {}
        this.loading = false
        this.dialog = false
      }, 300)
    },

    validateData () {
      this.$validate.form(this)
    },

    async save () {
      let vendorInfo = {}

      if (this.index > -1) {
        // existing vendor
        // update active state if changed
        if (this.currentVendor.active !== this.editedVendor.active) {
          this.editedVendor.active = this.currentVendor.active
        }
        this.response = await vendorService.put(this.editedVendor)

        if (this.response.status === 200) {
          vendorInfo = this.editedVendor
          // only run currentItem.VendorId if editing item
          if (this.currentItem.VendorId) {
            this.currentItem.VendorId = vendorInfo.id
          }
          Object.assign(this.vendors[this.index], vendorInfo)
          this.snackText = `${vendorInfo.name} updated`
        }
      } else {
        // new vendor
        this.response = await vendorService.post(this.editedVendor)

        if (this.response.status === 200) {
          let data = this.response.data

          data.hasItem = true
          this.currentItem.VendorId = data.id
          this.vendors.push(data)
          this.vendorNames.push(data.name)
          this.snackText = `${data.name} saved`
        }
      }

      if (!this.alert && this.response.status === 200) {
        this.loading = false
        this.$store.dispatch('setSnack', {
          text: this.snackText,
          color: 'success',
          icon: 'fa-shop'
        })
        this.close()
      }
    }
  }
}
</script>

<style scoped>

</style>

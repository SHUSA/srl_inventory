<template>
  <v-card v-if="loadComponent" flat color="#fafafa">
    <error :response="response"/>
    <!-- use this component to pre-select options before rendering table -->
    <!-- options: choose assays and/or vendors; some, one, or all -->
    <v-container fluid fill-height grid-list-md>
      <v-layout row wrap>
        <template v-if="assays.length !== 0">
          <v-flex xs12>
            <v-card-text>Choose your filters</v-card-text>
          </v-flex>
          <v-flex xs4 v-if="user.isAdmin || user.isSubAdmin">
            <v-card-text class="warning">Warning: Displaying too much data can slow processing</v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-btn @click="populateList('assays')" :dark="shown === 'assays' && show ? true : false">Assays</v-btn>
            <v-btn @click="populateList('vendors')" :dark="shown === 'vendors' && show ? true : false">Vendors</v-btn>
            <v-btn @click="submit(true)">Show All</v-btn>
          </v-flex>
          <v-flex xs12>
            <!-- select all -->
            <transition name="chips">
              <v-chip v-if="show"  @click="selectAll(list)" :color="allSelected ? 'error' : someSelected ? 'warning' : ''">
                {{!allSelected ? 'SELECT ALL' : 'DESELECT ALL'}}
              </v-chip>
            </transition>
            <!-- submit -->
            <transition name="submit" mode="out-in">
              <v-chip v-if="(allSelected || someSelected) && show" key="submit" @click="submit()" color="success">Go!</v-chip>
            </transition>
            <br>
            <!-- filter chips -->
            <transition-group name="chips" tag="span">
              <v-chip
                v-for="item in list"
                :key="item.id"
                :color="isSelected(item.id) ? 'blue lighten-2' : ''"
                @click="add(item)"
              >
                {{item.name}}
              </v-chip>
            </transition-group>
          </v-flex>
        </template>
        <v-flex xs12>
          <v-alert :value="assays.length === 0" color="error" icon="fa-exclamation-triangle">No filters to display!</v-alert>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import assayService from '@/services/AssayService.js'
import vendorService from '@/services/VendorService.js'

export default {
  data () {
    return {
      assays: [],
      vendors: [],
      list: [],
      selected: [],
      response: '',
      show: false,
      shown: '',
      loadComponent: false
    }
  },

  mounted () {
    this.loadComponent = false
    this.initialize()
    // go to top
    window.scroll({
      top: 0,
      left: 0
    })
  },

  computed: {
    ...mapState([
      'user',
      'route',
      'storedFilters'
    ]),

    allSelected () {
      if (this[this.shown]) {
        return this.selected.length === this[this.shown].length
      } else {
        return false
      }
    },

    someSelected () {
      return this.selected.length > 0 && !this.allSelected
    }
  },

  methods: {
    async initialize () {
      this.$store.dispatch('setTitle', this.route.name)
      this.response = (await assayService.index(['name', 'id']))

      if (this.response.status === 200) {
        this.assays = this.response.data
        this.vendors = (await vendorService.index(['name', 'id'])).data

        // initial db state; no data
        if (this.assays.length === 0 || this.vendors.length === 0) {
          this.submit()
        }
      }
      this.loadComponent = true
    },

    populateList (type) {
      // control chip visibility
      if (this.show) {
        if (this.shown === type) {
          this.show = false
          this.list = []
        } else {
          this.selected = []
        }
      } else {
        this.show = true
      }

      // pass data to list
      if (type === 'assays' && this.show) {
        this.list = this.assays
      } else if (type === 'vendors' && this.show) {
        this.list = this.vendors
      }
      this.shown = type
    },

    add (item) {
      let arr = this.selected
      if (!arr.includes(item.id)) {
        arr.push(item.id)
      } else {
        arr.splice(arr.indexOf(item.id), 1)
      }
    },

    isSelected (item) {
      return this.selected.includes(item)
    },

    selectAll (list) {
      if (this.selected.length === list.length) {
        this.selected = []
      } else {
        this.selected = list.map(x => x.id)
      }
    },

    submit (showAll = false) {
      if (showAll) {
        this.selected = this.assays.map(x => x.id)
      }
      this.$store.dispatch('setFilters', this.selected)
      let route = (this.user.isAdmin || this.user.isSubAdmin) ? 'inventory-admin' : 'inventory-user'
      this.$router.push({
        name: route
      })
    }
  }

}
</script>

<style scoped>
  .chips-enter-active, .chips-enter-leave {
    transition: all 1s;
  }

  .chips-enter {
    opacity: 0;
    transform: translateX(-100px);
  }

  .chips-leave-to {
    opacity: 0;
    transform: translateX(100px);
  }

  .submit-enter-active, .submit-leave-active {
    transition: opacity .3s ease;
  }

  .submit-enter, .submit-leave-to {
    opacity: 0;
  }
</style>

<template>
  <Admin>
    <div
      class="max-w-7xl flex justify-end mx-auto px-4 sm:px-6 md:px-8 mb-8 gap-x-4"
    >
      <h1 class="text-2xl font-semibold text-gray-900 mr-auto">Rit</h1>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- //!SECTION -->
      <!-- //SECTION - Tab Belum Ada Harga -->
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
          >
            <div
              class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Kode - Tanggal Datang
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Keterangan
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="rit in rits" :key="rit.id">
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ rit.item.code }} -
                          {{ formatDate(rit.delivery_date) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col gap-y-2">
                        <div class="font-medium text-gray-900">
                          Customer: {{ formatNumber(rit.customer_tonnage) }} kg
                        </div>
                        <div class="font-medium text-gray-900">
                          Cabang: {{ formatNumber(rit.branch_tonnage) }} kg
                        </div>
                        <div class="font-medium text-gray-900">
                          Pusat: {{ formatNumber(rit.arrived_tonnage) }} kg
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          @click="openEditRitPriceForm(rit.id)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="uil:edit"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Edit</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- //!SECTION -->
    </div>
    <!-- //SECTION Edit Rit  -->
    <TransitionRoot as="template" :show="showEditRitPriceForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showEditRitPriceForm = false"
      >
        <div
          class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />
          </TransitionChild>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
            >&#8203;</span
          >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6"
            >
              <form class="space-y-8 divide-y divide-gray-200">
                <div class="space-y-8 divide-y divide-gray-200">
                  <div>
                    <div>
                      <h3 class="text-lg leading-6 font-medium text-gray-900">
                        Edit Harga Jual
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan data sudah benar.
                      </p>
                    </div>
                    <hr />
                    <div class="grid grid-cols-6 gap-x-4">
                      <h3
                        class="col-span-6 text-md leading-6 font-medium text-gray-900"
                      >
                        Barang: {{ selectedData.item.code }}
                      </h3>
                      <h3
                        class="col-span-2 text-md leading-6 font-medium text-gray-900"
                      >
                        Customer:
                        {{ formatNumber(selectedData.customer_tonnage) }} kg
                      </h3>
                      <h3
                        class="col-span-2 text-md leading-6 font-medium text-gray-900"
                      >
                        Cabang:
                        {{ formatNumber(selectedData.branch_tonnage) }} kg
                      </h3>
                      <h3
                        class="col-span-2 text-md leading-6 font-medium text-gray-900"
                      >
                        Pusat: {{ formatNumber(selectedData.main_tonnage) }} kg
                      </h3>
                    </div>
                    <hr />

                    <div
                      class="mt-2 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-6"
                    >
                      <div class="sm:col-span-6 mt-1">
                        <SwitchGroup as="div" class="flex items-center">
                          <Switch
                            v-model="pricedRit.is_hold"
                            :class="[
                              pricedRit.is_hold
                                ? 'bg-indigo-600'
                                : 'bg-gray-200',
                              'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                            ]"
                          >
                            <span
                              aria-hidden="true"
                              :class="[
                                pricedRit.is_hold
                                  ? 'translate-x-5'
                                  : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                              ]"
                            />
                          </Switch>
                          <SwitchLabel as="span" class="ml-3">
                            <span class="text-sm font-medium text-gray-900"
                              >Hold Rit (Tidak bisa dijual)
                            </span>
                          </SwitchLabel>
                        </SwitchGroup>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="tonnage_left"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Sisa Tonase
                        </label>
                        <div class="mt-1">
                          <input
                            id="tonnage_left"
                            v-model="pricedRit.tonnage"
                            type="number"
                            :disabled="selectedData.arrival_date == null"
                            class="disabled:opacity-50 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="sell_price"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Harga Jual (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="sell_price"
                            v-model="pricedRit.sell_price"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="buy_price"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Harga Beli (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="buy_price"
                            v-model="pricedRit.buy_price"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="pt-5">
                  <div class="flex justify-end">
                    <button
                      :disabled="selectedData.transactions.length > 0"
                      type="button"
                      @click.once="rejectRit()"
                      class="disabled:opacity-50 bg-red-500 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      :disabled="
                        pricedRit.sell_price <= 0 ||
                        pricedRit.buy_price <= 0 ||
                        pricedRit.tonnage < 0
                      "
                      @click.once="ritHasBeenPriced()"
                      class="disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      {{ "Save" }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
    <!-- //!SECTION -->
  </Admin>
</template>

<!-- //ANCHOR - Script  -->
<script setup>
import Admin from "../../../layouts/Admin.vue";
import { Icon } from "@iconify/vue";
import axios from "axios";
</script>
<script>
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
  Switch,
  SwitchGroup,
  SwitchLabel,
} from "@headlessui/vue";
export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    Switch,
    SwitchGroup,
    SwitchLabel,
  },
  methods: {
    changeTab(index) {
      this.tabs.forEach((tab) => {
        if (tab.current) {
          tab.current = false;
        }
      });
      this.tabs[index].current = true;
      this.currentTab = this.tabs[index].name;
    },
    changeTabMobile(event) {
      this.tabs.forEach((tab) => {
        if (tab.name == event.target.value) {
          tab.current = true;
          this.currentTab = tab.name;
        } else {
          tab.current = false;
        }
      });
    },
    getAllData: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/rit/get_owner_stock")
        .then((data) => {
          this.rits = data.data.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openEditRitPriceForm(id) {
      this.showEditRitPriceForm = true;
      this.selectedData = this.rits.find((obj) => {
        return obj.id === id;
      });
      this.pricedRit.tonnage = this.selectedData.tonnage_left;
      this.pricedRit.sell_price = this.selectedData.sell_price;
      this.pricedRit.buy_price = this.selectedData.buy_price;
      this.pricedRit.is_hold = this.selectedData.is_hold == 1 ? true : false;
    },
    ritHasBeenPriced() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(`admin/rit/${this.selectedData.id}/priced`, this.pricedRit)
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetPricedRit() {
      this.pricedRit = {
        sell_price: null,
        buy_price: null,
        is_hold: false,
      };
    },
    rejectRit() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("admin/rit/" + this.selectedData.id + "/reject_finance")
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getAllData();
  },
  data() {
    return {
      //ini buat owner kalo mau edit harga
      showEditRitPriceForm: false,
      rits: [],
      selectedData: null,
      pricedRit: {
        tonnage: null,
        sell_price: null,
        buy_price: null,
        is_hold: false,
      },
    };
  },
};
</script>

<style></style>

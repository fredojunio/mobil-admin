<template>
  <div>
    <!-- Profile header -->
    <div>
      <div class="mx-auto px-4 sm:px-6 mb-2">
        <div class="sm:flex sm:items-end sm:space-x-5">
          <div
            class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
          >
            <div
              class="flex sm:hidden 2xl:flex min-w-0 flex-1 justify-between items-center"
            >
              <h1 class="text-2xl font-bold text-gray-900 truncate">
                Laporan -
                {{
                  formatDate(
                    selectedData.created_at ?? new Date().toLocaleDateString()
                  )
                }}
              </h1>
            </div>
          </div>
        </div>
        <div class="hidden sm:flex 2xl:hidden min-w-0 flex-1 gap-2">
          <h1
            class="text-2xl font-bold text-gray-900 truncate mr-auto flex flex-col"
          >
            Laporan -
            {{
              formatDate(
                selectedData.created_at ?? new Date().toLocaleDateString()
              )
            }}
          </h1>
        </div>
      </div>
    </div>
    <hr />
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <!-- //NOTE - ini itu total pemasukan - total pengeluaran - transaksi yang belum bayar -->
          <dt class="text-xl font-medium text-gray-500">
            Total Penerimaan Uang
          </dt>
          <dd class="mt-1 text-xl text-gray-900">
            Rp. {{ formatNumber(selectedData.money) }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <!-- //NOTE - ini itu total pemasukan - total pengeluaran - transaksi yang belum bayar -->
          <dt class="text-xl font-medium text-gray-500">
            Total Penerimaan Uang Fisik
          </dt>
          <dd class="mt-1 text-xl text-gray-900">
            Rp.
            {{ formatNumber(selectedData.real_income) }}
            <span
              :class="
                selectedData.real_income - selectedData.money < 0
                  ? 'text-red-500'
                  : 'text-green-500'
              "
              class="text-sm"
              v-if="
                formatNumber(selectedData.real_income - selectedData.money) !=
                '-'
              "
            >
              (Selisih Rp.
              {{ formatNumber(selectedData.real_income - selectedData.money) }})
            </span>
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Total Pemasukan</dt>
          <dd class="mt-1 text-sm text-gray-900">
            Rp. {{ formatNumber(selectedData.income) }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Total Pengeluaran</dt>
          <dd class="mt-1 text-sm text-gray-900">
            Rp. {{ formatNumber(selectedData.expense) }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Penjualan</dt>
          <dd class="mt-1 text-sm text-gray-900">
            Rp. {{ formatNumber(selectedData.item_income) }} -
            {{ formatNumber(totalTonnageSold()) }} kg
          </dd>
        </div>

        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Pemasukan Lain-lain</dt>
          <dd class="mt-1 text-sm text-gray-900">
            Rp. {{ formatNumber(selectedData.other_income) }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">
            Pengeluaran Operasional
          </dt>
          <dd class="mt-1 text-sm text-gray-900">
            Rp. {{ formatNumber(selectedData.operational_expense) }}
          </dd>
        </div>
        <div class="w-full col-span-2 border-t">
          <div class="border-b border-gray-200">
            <div class="mx-auto">
              <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                <div
                  @click="changeTab(index)"
                  v-for="(tab, index) in tabs"
                  :key="tab.name"
                  :class="[
                    tab.current
                      ? 'border-indigo-700 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'cursor-pointer whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                  ]"
                >
                  {{ tab.name }}
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div v-if="tabs[0].current" class="col-span-2">
          <!-- <form class="flex space-x-4" action="#">
            <div class="relative rounded-md shadow-sm w-full">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <Icon icon="fa:calendar" class="h-5 w-5 text-gray-400" />
              </div>
              <VueDatePicker
                v-model="date"
                locale="id"
                :start-time="[
                  { hours: 0, minutes: 0, seconds: 0 },
                  { hours: 23, minutes: 59, seconds: 59 },
                ]"
                range
                :enable-time-picker="false"
              />
            </div>
          </form> -->
          <div class="mb-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                        Sisa Tonase Sistem
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Sisa Tonase Fisik
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Selisih Penyusutan
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr
                      v-for="ritReport in selectedData.rits"
                      :key="ritReport.id"
                    >
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ ritReport.rit.item.code }} -
                            {{ formatDate(ritReport.rit.arrival_date) }}
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ formatNumber(ritReport.tonnage_left) }} kg
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ formatNumber(ritReport.real_tonnage) }} kg
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div
                            v-if="ritReport.report_id"
                            class="font-medium text-gray-900"
                          >
                            {{
                              formatNumber(
                                parseFloat(
                                  parseFloat(ritReport.real_tonnage) -
                                    parseFloat(ritReport.tonnage_left)
                                ).toFixed(2)
                              )
                            }}
                            kg
                          </div>
                          <div v-else class="font-medium text-gray-900">
                            {{
                              formatNumber(
                                parseFloat(ritReport.real_tonnage) -
                                  parseFloat(ritReport.tonnage_left)
                              )
                            }}
                            kg
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
        <div v-if="tabs[1].current" class="col-span-2">
          <!-- <form class="flex space-x-4" action="#">
            <div class="relative rounded-md shadow-sm w-full">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <Icon icon="fa:calendar" class="h-5 w-5 text-gray-400" />
              </div>
              <VueDatePicker
                v-model="date"
                locale="id"
                :start-time="[
                  { hours: 0, minutes: 0, seconds: 0 },
                  { hours: 23, minutes: 59, seconds: 59 },
                ]"
                range
                :enable-time-picker="false"
              />
            </div>
          </form> -->
          <div class="mb-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                        Tonase Penjualan Harian
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Total Penjualan Harian
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Total Penjualan Barang
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr
                      v-for="ritReport in selectedData.rits"
                      :key="ritReport.id"
                    >
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ ritReport.rit.item.code }} -
                            {{ formatDate(ritReport.rit.arrival_date) }}
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ formatNumber(ritReport.tonnage_sold) }} kg
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            Rp. {{ formatNumber(ritReport.tonnage_sold_price) }}
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ formatNumber(ritReport.total_tonnage_sold) }} kg
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
        <div v-if="tabs[2].current" class="col-span-2">
          <!-- <form class="flex space-x-4" action="#">
            <div class="relative rounded-md shadow-sm w-full">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <Icon icon="fa:calendar" class="h-5 w-5 text-gray-400" />
              </div>
              <VueDatePicker
                v-model="date"
                locale="id"
                :start-time="[
                  { hours: 0, minutes: 0, seconds: 0 },
                  { hours: 23, minutes: 59, seconds: 59 },
                ]"
                range
                :enable-time-picker="false"
              />
            </div>
          </form> -->
          <div class="mb-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                        Customer
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Jumlah (Rp.)
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Tanggal Transaksi
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Tanggal Lunas
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr
                      v-for="transaction in selectedData.transactions"
                      :key="transaction.id"
                    >
                      <td
                        v-if="shouldShowDate(transaction.settled_date)"
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div
                            v-if="transaction.transaction.customer"
                            class="font-medium text-gray-900"
                          >
                            {{ transaction.transaction.customer.nickname }}
                          </div>
                          <div v-else class="font-medium text-gray-900">
                            {{ transaction.transaction.type }}
                          </div>
                        </div>
                      </td>
                      <td
                        v-if="shouldShowDate(transaction.settled_date)"
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ formatNumber(transaction.amount) }}
                          </div>
                        </div>
                      </td>
                      <td
                        v-if="shouldShowDate(transaction.settled_date)"
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ formatDate(transaction.transaction_date) }}
                          </div>
                        </div>
                      </td>
                      <td
                        v-if="shouldShowDate(transaction.settled_date)"
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ formatDate(transaction.settled_date) }}
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
      </dl>
    </div>
  </div>
  <TransitionRoot as="template" :show="showEditRitDailyReportForm">
    <Dialog
      as="div"
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="showEditRitDailyReportForm = false"
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
                      {{ "Edit Jumlah Tonase Hari Ini" }}
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                      Pastikan data sudah benar.
                    </p>
                  </div>
                  <hr />
                  <div class="grid grid-cols-2 gap-x-4">
                    <h3 class="text-md leading-6 font-medium text-gray-900">
                      Barang: {{ "K-ABC" }}
                    </h3>
                    <h3 class="text-md leading-6 font-medium text-gray-900">
                      Kendaraan: Truk A
                    </h3>
                    <h3 class="text-md leading-6 font-medium text-gray-900">
                      Tonase Awal: {{ "10.000" }} kg
                    </h3>
                    <h3 class="text-md leading-6 font-medium text-gray-900">
                      Tanggal Berangkat: 30/03/2023
                    </h3>
                  </div>
                  <hr />

                  <div
                    class="mt-6 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-6"
                  >
                    <div class="sm:col-span-6">
                      <label
                        for="original_weight"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Tonase Asli (kg)
                      </label>
                      <div class="mt-1">
                        <input
                          id="original_weight"
                          v-model="original_weight"
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
                    type="button"
                    @click="showEditRitDailyReportForm = false"
                    class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    @click="showEditRitDailyReportForm = false"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
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
</template>

<script setup>
import { Icon } from "@iconify/vue";
import axios from "axios";
</script>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
export default {
  props: ["selectedData"],
  watch: {
    selectedData: function (newVal, oldVal) {
      // this.getAllTransactions();
    },
  },
  components: {
    VueDatePicker,
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  },
  data() {
    return {
      showEditRitDailyReportForm: false,
      date: [
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 59)),
      ],
      tabs: [
        { name: "Sisa Stok", current: true },
        { name: "Penjualan", current: false },
        { name: "Transaksi", current: false },
      ],
    };
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
    totalTonnageSold() {
      var total = 0;
      this.selectedData.rits.forEach((rit) => {
        total += rit.tonnage_sold;
      });
      return total;
    },
    shouldShowDate(inputDate) {
      if (inputDate !== null) {
        const currentDate = new Date();
        const endDate = new Date(inputDate);
        endDate.setDate(endDate.getDate() + 7);
        return currentDate <= endDate;
      } else {
        return true;
      }
    },
  },
};
</script>

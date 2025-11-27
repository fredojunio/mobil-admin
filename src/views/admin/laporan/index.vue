<template>
  <div
    id="loading-modal"
    class="fixed items-center justify-center min-w-full min-h-full z-50"
    :class="isLoading ? 'flex' : 'hidden'"
  >
    <div
      class="absolute z-50 min-w-full min-h-screen bg-black opacity-50"
    ></div>
    <div class="text-6xl animate-spin z-50 text-white">
      <Icon icon="fa:circle-o-notch" />
    </div>
  </div>
  <Admin>
    <div class="flex-1 relative z-0 flex overflow-hidden">
      <main
        class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last h-screen"
      >
        <!-- Breadcrumb -->
        <nav
          class="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
          aria-label="Breadcrumb"
        >
          <div
            @click="showDirectory = !showDirectory"
            class="inline-flex items-center space-x-3 text-sm font-medium text-gray-900 cursor-pointer"
          >
            <Icon
              :icon="showDirectory ? 'fa:chevron-left' : 'fa:chevron-right'"
            />
            <span>Directory</span>
          </div>
        </nav>

        <div v-if="selectedData">
          <DailyReportDetail :selectedData="selectedData" />
        </div>
      </main>
      <aside
        :class="[
          showDirectory ? '' : 'hidden',
          'order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200 h-screen',
        ]"
      >
        <div class="px-6 pt-6 pb-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-900">Directory</h2>
            <button
              @click="showSaveDailyReportForm = true"
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
            >
              Simpan Laporan Harian
            </button>
          </div>
          <form class="mt-6 flex space-x-4" action="#">
            <div class="relative rounded-md shadow-sm w-96">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <Icon icon="fa:calendar" class="h-5 w-5 text-gray-400" />
              </div>
              <VueDatePicker
                v-model="date"
                @update:model-value="filterData"
                locale="id"
                :start-time="[
                  { hours: 0, minutes: 0, seconds: 0 },
                  { hours: 23, minutes: 59, seconds: 59 },
                ]"
                range
                :enable-time-picker="false"
              />
            </div>
          </form>
        </div>
        <!-- Directory list -->
        <nav class="flex-1 min-h-0 overflow-y-auto" aria-label="Directory">
          <div class="relative">
            <div
              class="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500"
            >
              <h3>Laporan</h3>
            </div>
            <ul role="list" class="relative z-0 divide-y divide-gray-200">
              <li
                v-for="report in filteredReports"
                :key="report.id"
                @click="selectData(report.id)"
              >
                <div
                  class="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500"
                >
                  <div class="flex-1 min-w-0">
                    <a href="#" class="focus:outline-none">
                      <!-- Extend touch target to entire panel -->
                      <span class="absolute inset-0" aria-hidden="true" />
                      <p class="text-sm font-medium text-gray-900">
                        {{ formatDate(report.created_at) }}
                      </p>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </div>
    <TransitionRoot as="template" :show="showSaveDailyReportForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showSaveDailyReportForm = false"
      >
        <div
          class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
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
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <Icon
                      icon="fa:exclamation-triangle"
                      class="h-6 w-6 text-yellow-400"
                    />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-lg leading-6 font-medium text-gray-900"
                    >
                      Submit Data
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Pastikan data sudah benar ketika mensubmit laporan
                        harian!
                      </p>
                    </div>
                    <div>
                      <label
                        for="real_income"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Total Penerimaan Uang Fisik
                      </label>
                      <div class="mt-1">
                        <input
                          id="real_income"
                          v-model="real_income"
                          type="text"
                          class="disabled:bg-gray-100 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div
                      v-for="(rit, index) in todayReport.rits"
                      :key="index"
                      class="grid grid-cols-4 gap-x-2 justify-center items-center"
                    >
                      <div class="col-span-2">
                        <label
                          for="product_id"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Rit {{ index + 1 }} - {{ rit.rit.arrival_date }} ({{
                            formatNumber(rit.tonnage_left)
                          }}
                          kg)
                        </label>
                        <div class="mt-1">
                          <input
                            id="name"
                            v-model="rit.rit.item.code"
                            type="text"
                            disabled
                            class="disabled:bg-gray-100 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div class="col-span-2">
                        <label
                          for="real_tonnage"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Tonase Fisik (kg)
                        </label>
                        <div class="mt-1">
                          <input
                            id="real_tonnage"
                            v-model="rit.real_tonnage"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md"
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
                      @click="showSaveDailyReportForm = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      :disabled="
                        todayReport.rits.some(
                          (rit) =>
                            rit.real_tonnage == null ||
                            rit.real_tonnage > rit.tonnage_left + 200 ||
                            rit.real_tonnage < rit.tonnage_left - 20
                        ) ||
                        real_income < 0 ||
                        real_income == null
                      "
                      @click.once="createDailyReport()"
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
  </Admin>
</template>

<script setup>
import Admin from "../../../layouts/Admin.vue";
import DailyReportDetail from "../../../components/DailyReportDetail.vue";
import { Icon } from "@iconify/vue";
import axios from "axios";
</script>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {
  Dialog,
  DialogTitle,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
export default {
  components: {
    VueDatePicker,
    Dialog,
    DialogTitle,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  },
  setup() {
    return {};
  },
  data() {
    return {
      isLoading: false,
      showSaveDailyReportForm: false,
      showDirectory: false,
      selectedData: null,
      todayReport: null,
      real_income: null,
      reports: [],
      filteredReports: [],
      date: [
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 59)),
      ],
      rits: [],
    };
  },
  created() {
    this.getAllReports();
    this.getTodayReport();
  },
  methods: {
    getAllReports: function () {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/report")
        .then((data) => {
          this.reports = data.data.data.results;
          this.filteredReports = this.reports;
          this.filteredReports = this.filteredReports.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateA - dateB;
          });
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTodayReport: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/report/get_today_report")
        .then((data) => {
          this.selectedData = data.data.data.results[0];
          this.selectedData.rits = data.data.data.results[1];
          this.selectedData.transactions = data.data.data.results[2];
          this.todayReport = data.data.data.results[0];
          this.todayReport.rits = data.data.data.results[1];
          this.todayReport.transactions = data.data.data.results[2];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createDailyReport: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post("/admin/report/create_daily_report", {
          rits: this.todayReport.rits,
          real_income: this.real_income,
        })
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectData(id) {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/report/" + id)
        .then((data) => {
          this.selectedData = data.data.data.results;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filterData() {
      let startDate = new Date(this.date[0]);
      let untilDate = new Date(this.date[1]);
      this.filteredReports = this.reports.filter((report) => {
        let reportDate = new Date(report.created_at);
        return reportDate >= startDate && reportDate <= untilDate;
      });
      this.filteredReports = this.filteredReports.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA - dateB;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>

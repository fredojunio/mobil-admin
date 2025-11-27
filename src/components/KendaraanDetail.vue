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
                {{ selectedData.name }} (Toll:
                {{ formatNumber(selectedData.toll) }})
              </h1>
              <div class="flex flex-col gap-2">
                <button
                  @click="toggleForm"
                  class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden sm:flex 2xl:hidden min-w-0 flex-1 gap-2">
          <h1
            class="text-2xl font-bold text-gray-900 truncate mr-auto flex flex-col"
          >
            {{ selectedData.name }} (Toll:
            {{ formatNumber(selectedData.toll) }})
            <span class="text-gray-400 text-sm font-normal">{{
              selectedData.type
            }}</span>
          </h1>
          <button
            @click="toggleForm"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
    <hr />
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="w-full col-span-2">
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
          <form class="flex space-x-4" action="#">
            <div class="relative rounded-md shadow-sm w-full">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <Icon icon="fa:calendar" class="h-5 w-5 text-gray-400" />
              </div>
              <VueDatePicker
                v-model="date"
                @update:model-value="filterTrip"
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
          <div class="my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                        Tanggal Perjalanan
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Note
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        BBM (Rp.)
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        E-Toll (Rp.)
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Sangu (Rp.)
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr
                      v-for="trip in filteredTrips.filter(
                        (expense) => expense.finance_approved == 1
                      )"
                      :key="trip.id"
                    >
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ formatDate(trip.created_at) }}
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ trip.note }}
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            Rp. {{ formatNumber(trip.gas) }}
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            Rp. {{ formatNumber(trip.toll - trip.toll_used) }}
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            Rp. {{ formatNumber(trip.allowance) }}
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
      this.filterTrip();
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
      isLoading: false,
      date: [
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 59)),
      ],
      tabs: [{ name: "Daftar Perjalanan", current: true }],
      filteredTrips: [],
    };
  },
  methods: {
    toggleForm() {
      this.$emit("toggle-form", true); // true to open the form, false to close it
    },
    changeTab(index) {
      this.tabs.forEach((tab) => {
        if (tab.current) {
          tab.current = false;
        }
      });
      this.tabs[index].current = true;
      this.currentTab = this.tabs[index].name;
    },
    filterTrip() {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post("/admin/vehicle/" + this.selectedData.id + "/get_vehicle_trips", {
          start_date: this.date[0].toString(),
          end_date: this.date[1].toString(),
        })
        .then((data) => {
          this.filteredTrips = data.data.data.results;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

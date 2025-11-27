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
    <div
      class="max-w-7xl flex justify-end mx-auto px-4 sm:px-6 md:px-8 mb-8 gap-x-4"
    >
      <h1 class="text-2xl font-semibold text-gray-900 mr-auto">Nota</h1>
      <div class="relative flex gap-2 text-left">
        <div class="relative rounded-md shadow-sm w-96">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <Icon icon="fa:calendar" class="h-5 w-5 text-gray-400" />
          </div>
          <VueDatePicker
            v-model="date"
            @update:model-value="getAllTransactions"
            locale="id"
            :start-time="[
              { hours: 0, minutes: 0, seconds: 0 },
              { hours: 23, minutes: 59, seconds: 59 },
            ]"
            range
            :enable-time-picker="false"
          />
        </div>
      </div>
    </div>
    <!-- //SECTION - Main Page  -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      Customer
                    </th>
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
                      Tonase - Harga
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Tabungan
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Tonase Asli
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr
                    v-for="transaction in transactions.filter(
                      (transaction) =>
                        transaction.owner_approved != 0 &&
                        transaction.owner_approved != 3 &&
                        transaction.type == 'Kiriman'
                    )"
                    :key="transaction.id"
                  >
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div class="font-medium text-gray-900">
                          {{ transaction.customer.nickname }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          class="font-medium text-gray-900"
                          v-for="rit in transaction.rits"
                          :key="rit.id"
                        >
                          {{ rit.rit.item.code }} - ({{ rit.rit.arrival_date }})
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          class="font-medium text-gray-900"
                          v-for="rit in transaction.rits"
                          :key="rit.id"
                        >
                          {{ formatNumber(rit.tonnage * rit.masak) }} kg - Rp.
                          {{ formatNumber(rit.total_price) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col gap-y-2">
                        <div class="font-medium text-gray-900">
                          TB: Rp. {{ formatNumber(transaction.tb) }}
                        </div>
                        <!-- <div class="font-medium text-gray-900">
                          TW: Rp. {{ formatNumber(transaction.tw) }}
                        </div> -->
                        <div class="font-medium text-gray-900">
                          THR: Rp. {{ formatNumber(transaction.thr) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(transaction.total_price) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          class="font-medium text-gray-900"
                          v-for="rit in transaction.rits"
                          :key="rit.id"
                        >
                          {{ formatNumber(rit.tonnage_left) }} kg
                        </div>
                      </div>
                    </td>
                    <td
                      v-if="transaction.owner_approved == 1"
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <router-link
                          :to="{
                            path: `/admin/rit/nota/detail/${transaction.id}`,
                          }"
                          target="_blank"
                        >
                          <div
                            class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                          >
                            <Icon
                              icon="uil:print"
                              class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                            ></Icon>
                            <span class="ml-3">Print</span>
                          </div>
                        </router-link>
                      </div>
                    </td>
                    <td
                      v-else-if="transaction.owner_approved == 2"
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <router-link
                          :to="{
                            path: `/admin/rit/jual_barang/${transaction.id}`,
                            query: { isForcedRevision: true },
                          }"
                          target="_blank"
                        >
                          <div
                            class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                          >
                            <Icon
                              icon="fa:repeat"
                              class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                            ></Icon>
                            <span class="ml-3">Revisi</span>
                          </div>
                        </router-link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Admin>
</template>

<script setup>
import Admin from "../../../layouts/Admin.vue";
import { Icon } from "@iconify/vue";
import axios from "axios";
</script>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
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
    VueDatePicker,
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
  created() {
    this.getAllTransactions();
  },
  methods: {
    getAllTransactions: function () {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post("/admin/transaction/get_nota", {
          start_date: this.date[0].toString(),
          end_date: this.date[1].toString(),
        })
        .then((data) => {
          this.transactions = data.data.data.results;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data() {
    return {
      transactions: [],
      isLoading: false,
      date: [
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 59)),
      ],
    };
  },
};
</script>

<style></style>

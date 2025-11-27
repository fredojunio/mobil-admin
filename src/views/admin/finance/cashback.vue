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
      <h1 class="text-2xl font-semibold text-gray-900 mr-auto">
        Daftar Cashback
      </h1>
    </div>
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
                      Jumlah (Rp.)
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
                  <tr v-for="cashback in cashbacks" :key="cashback.id">
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ cashback.customer.nickname }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ formatNumber(cashback.amount) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          @click="showApprovalForm(cashback.id)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="fa:check"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Approve</span>
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
    </div>
    <TransitionRoot as="template" :show="showCashbackApprovalForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showCashbackApprovalForm = false"
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
                        Pastikan data sudah benar!
                      </p>
                    </div>
                  </div>
                </div>

                <div class="pt-5">
                  <div class="flex justify-end">
                    <button
                      type="button"
                      @click="showCashbackApprovalForm = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      @click.once="approveCashback()"
                      class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      {{ "Submit" }}
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
    this.getAllData();
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
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/cashback")
        .then((data) => {
          this.isLoading = false;
          this.cashbacks = data.data.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showApprovalForm(id) {
      this.showCashbackApprovalForm = true;
      this.selectedData = this.cashbacks.find((obj) => {
        return obj.id === id;
      });
    },
    approveCashback() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("admin/cashback/" + this.selectedData.id)
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data() {
    return {
      showCashbackApprovalForm: false,
      date: [
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 59)),
      ],
      cashbacks: [],
      isLoading: false,
    };
  },
};
</script>

<style></style>

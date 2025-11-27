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
      <h1 class="text-2xl font-semibold text-gray-900 mr-auto">Daftar Rit</h1>
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
                      Tanggal
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Kendaraan
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Barang
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Sangu
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      BBM
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      E-Toll
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Approve
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr
                    v-for="rit in rits.filter(
                      (rit) => rit.finance_approved == 0
                    )"
                    :key="rit.id"
                  >
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ formatDate(rit.created_at) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ rit.trip.vehicle.name }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ rit.item.code }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(rit.trip.allowance) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(rit.trip.gas) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(rit.trip.toll) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          @click="showApprovalForm(rit.id)"
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
    <!-- //SECTION - Form Approve Rit -->
    <TransitionRoot as="template" :show="showRitApprovalForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showRitApprovalForm = false"
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
                        Approve Perjalanan Rit
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan data sudah benar.
                      </p>
                    </div>
                    <hr />
                    <div class="grid grid-cols-2 gap-x-4">
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        <!-- Kosong -->
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        BBM: {{ formatNumber(selectedData.trip.gas) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Kendaraan: {{ selectedData.trip.vehicle.name }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        E-Toll: {{ formatNumber(selectedData.trip.toll) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        <!-- Kosong -->
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Sangu: Rp.
                        {{ formatNumber(selectedData.trip.allowance) }}
                      </h3>
                    </div>
                    <hr />

                    <div
                      class="mt-2 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-6"
                    >
                      <div class="sm:col-span-6">
                        <label
                          for="money"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Total (Rp.)
                        </label>
                        <div class="mt-1">
                          Rp.
                          {{
                            formatNumber(
                              selectedData.trip.allowance +
                                selectedData.trip.toll +
                                selectedData.trip.gas
                            )
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="pt-5">
                  <div class="flex justify-end">
                    <button
                      type="button"
                      @click.once="rejectRit()"
                      class="bg-red-500 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      @click.once="approveRit()"
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
    <!-- //!SECTION -->
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
    getAllData: function () {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/rit/get_created_stock")
        .then((data) => {
          this.isLoading = false;
          this.rits = data.data.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showApprovalForm(id) {
      this.showRitApprovalForm = true;
      this.selectedData = this.rits.find((obj) => {
        return obj.id === id;
      });
    },
    approveRit() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("admin/rit/" + this.selectedData.id + "/approve_finance")
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
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
  data() {
    return {
      showRitApprovalForm: false,
      rits: [],
      selectedData: null,
      isLoading: false,
    };
  },
};
</script>

<style></style>

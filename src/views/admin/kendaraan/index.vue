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

        <div>
          <KendaraanDetail
            :selectedData="selectedData"
            @toggle-form="showEdit"
          />
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
            <h2 class="text-lg font-medium text-gray-900">Kendaraan</h2>
            <button
              @click="showAddVehicleForm = true"
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
            >
              Tambah Kendaraan
            </button>
          </div>
          <form class="mt-6 flex space-x-4" action="#">
            <div class="flex-1 min-w-0">
              <label for="search" class="sr-only">Search</label>
              <div class="relative rounded-md shadow-sm">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <Icon icon="uil:search" class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  v-model="searchQuery"
                  @keyup="filterData()"
                  type="search"
                  name="search"
                  id="search"
                  class="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search"
                />
              </div>
            </div>
          </form>
        </div>
        <!-- Directory list -->
        <nav class="flex-1 min-h-0 overflow-y-auto" aria-label="Directory">
          <div class="relative">
            <div
              class="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500"
            >
              <h3>Kendaraan</h3>
            </div>
            <ul role="list" class="relative z-0 divide-y divide-gray-200">
              <li
                v-for="vehicle in filteredVehicles"
                :key="vehicle.id"
                @click="selectData(vehicle.id)"
              >
                <div
                  class="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500"
                >
                  <div class="flex-1 min-w-0">
                    <a href="#" class="focus:outline-none">
                      <!-- Extend touch target to entire panel -->
                      <span class="absolute inset-0" aria-hidden="true" />
                      <p class="text-sm font-medium text-gray-900">
                        {{ vehicle.name }}
                      </p>
                      <p class="text-sm text-gray-500 truncate">
                        {{ vehicle.type }}
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
    <TransitionRoot as="template" :show="showAddVehicleForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showAddVehicleForm = false"
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
                <div class="space-y-8 divide-y divide-gray-200">
                  <div>
                    <div>
                      <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {{
                          tempData.id
                            ? "Edit Kendaraan"
                            : "Tambah Kendaraan Baru"
                        }}
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan semua data sudah benar.
                      </p>
                    </div>
                    <hr />
                    <div
                      class="max-w-7xl mt-2 grid grid-cols-1 mx-auto mb-8 gap-x-4"
                    >
                      <div class="flex flex-col col-span-1 h-full gap-y-2">
                        <div class="sm:col-span-6">
                          <label
                            for="name"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Nama
                          </label>
                          <div class="mt-1">
                            <input
                              type="text"
                              v-model="tempData.name"
                              id="name"
                              name="name"
                              class="shadow-sm focus:ring-black border focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div class="sm:col-span-6">
                          <label
                            for="type"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Tipe
                          </label>
                          <div class="mt-1">
                            <select
                              v-model="tempData.type"
                              id="type"
                              name="type"
                              class="shadow-sm focus:ring-black focus:border-tukimring-black block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option value="Truk">Truk</option>
                              <option value="Pickup">Pickup</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="pt-5">
                  <div class="flex justify-end">
                    <button
                      type="button"
                      @click="showAddVehicleForm = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      @click.once="tempData.id ? updateData() : createData()"
                      class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      {{ tempData.id ? "Update" : "Save" }}
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
import KendaraanDetail from "../../../components/KendaraanDetail.vue";
import axios from "axios";
</script>
<script>
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
export default {
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  },
  data() {
    return {
      isLoading: false,
      showAddVehicleForm: false,
      showDirectory: false,
      tempData: {
        id: null,
        name: null,
        type: null,
        trip_count: null,
        trips: [],
      },
      selectedData: {
        id: null,
        name: null,
        type: null,
        trip_count: null,
        trips: [],
        toll: null,
      },
      vehicles: [],
      searchQuery: null,
      filteredVehicles: [],
    };
  },
  created() {
    this.getAllData();
  },
  methods: {
    resetData: function () {
      this.tempData = {
        id: null,
        name: null,
        type: null,
      };
    },
    getAllData: function () {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/vehicle")
        .then((data) => {
          this.vehicles = data.data.data.results;
          this.filteredVehicles = this.vehicles;
          this.selectData(this.vehicles[0].id);
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createData() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post("admin/vehicle", {
          name: this.tempData.name,
          type: this.tempData.type,
        })
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateData() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post("admin/vehicle/" + this.tempData.id, {
          _method: "PATCH",
          name: this.tempData.name,
          type: this.tempData.type,
        })
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showEdit(openForm) {
      this.showAddVehicleForm = openForm;
      this.tempData = this.selectedData;
    },
    selectData(id) {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/vehicle/" + id)
        .then((data) => {
          this.selectedData = data.data.data.results;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filterData() {
      this.filteredVehicles = this.vehicles.filter((vehicle) => {
        return vehicle.name.toLowerCase().includes(this.searchQuery);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>

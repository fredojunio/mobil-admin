<template>
  <div class="font-poppins">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="fixed inset-0 flex z-40"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800"
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <Icon icon="uil:times" class="h-6 w-6 text-white"></Icon>
                </button>
              </div>
            </TransitionChild>
            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div class="flex-shrink-0 flex items-center px-4 gap-x-4">
                <span class="text-xl text-white font-semibold">Admin</span>
              </div>
              <nav class="mt-5 px-2 space-y-1">
                <template v-for="item in navigation" :key="item.name">
                  <div v-if="!item.children">
                    <a
                      href="#"
                      class="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
                    >
                      <Icon
                        :icon="item.icon"
                        class="text-gray-400 group-hover:text-gray-300 mr-4 flex-shrink-0 h-6 w-6"
                      ></Icon>
                      {{ item.name }}
                    </a>
                  </div>
                  <Disclosure
                    as="div"
                    v-else
                    class="space-y-1"
                    v-slot="{ open }"
                  >
                    <DisclosureButton
                      v-if="role_id == 1 || item.name != 'Owner'"
                      :class="[
                        item.current
                          ? 'bg-gray-100 text-gray-900'
                          : ' text-gray-50 hover:bg-gray-50 hover:text-gray-900',
                        'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500',
                      ]"
                    >
                      <Icon
                        :icon="item.icon"
                        class="text-gray-400 group-hover:text-gray-300 mr-4 flex-shrink-0 h-6 w-6"
                      ></Icon>
                      <span class="flex-1">
                        {{ item.name }}
                      </span>
                      <svg
                        :class="[
                          open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                          'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150',
                        ]"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                      </svg>
                    </DisclosureButton>
                    <DisclosurePanel class="space-y-1">
                      <a
                        v-for="subItem in item.children"
                        :key="subItem.name"
                        as="a"
                        :href="subItem.href"
                        class="group w-full ml-1 flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-50 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        {{ subItem.name }}
                      </a>
                    </DisclosurePanel>
                  </Disclosure>
                </template>
              </nav>
            </div>
            <div class="flex-shrink-0 flex bg-gray-700 p-4">
              <div
                @click.once="submitLogout()"
                class="flex-shrink-0 w-full group block cursor-pointer"
              >
                <div class="flex items-center group/logout">
                  <div>
                    <Icon
                      icon="bx:log-out"
                      class="text-gray-300 group-hover/logout:text-gray-400 mr-3 flex-shrink-0 h-6 w-6"
                    ></Icon>
                  </div>
                  <div class="ml-3">
                    <p
                      class="text-sm font-medium text-gray-300 group-hover/logout:text-gray-400"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14">
          <!-- Force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>
    <div class="flex flex-col">
      <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          type="button"
          class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          @click="sidebarOpen = true"
        >
          <Icon icon="game-icons:hamburger-menu" class="h-6 w-6"></Icon>
          <span class="sr-only">Open sidebar</span>
        </button>
        <div class="flex-1 px-4 flex justify-between">
          <div class="flex-1 flex"></div>
          <div class="ml-4 flex items-center md:ml-6">
            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton
                  @click="getNotifications()"
                  class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span class="sr-only">Open user menu</span>
                  <Icon
                    icon="ic:outline-notifications-active"
                    class="h-8 w-8 rounded-full"
                  ></Icon>
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem>
                    <div
                      class="flex flex-col gap-y-2 p-2 overflow-y-scroll max-h-96"
                    >
                      <div
                        v-for="(notification, index) in notifications"
                        :key="index"
                        class="rounded-md !bg-yellow-50 p-4"
                      >
                        <a
                          :href="
                            notification.title != 'Barang Cabang'
                              ? notification.title != 'Barang Dalam Perjalanan'
                                ? notification.title != 'Input Pemasukan'
                                  ? notification.title != 'Penjualan Customer'
                                    ? ''
                                    : '/admin/owner/jual_barang'
                                  : '/admin/finance/pemasukan'
                                : '/admin/rit'
                              : '/admin/owner/jual_barang'
                          "
                        >
                          <div class="flex">
                            <div class="flex-shrink-0">
                              <Icon
                                icon="fa:exclamation-triangle"
                                class="h-5 w-5 text-yellow-400"
                              ></Icon>
                            </div>
                            <div class="ml-3">
                              <h3 class="text-sm font-medium text-yellow-800">
                                {{ notification.title }}
                              </h3>
                              <div class="mt-2 text-sm text-yellow-700">
                                <p>
                                  {{ notification.description }}
                                </p>
                              </div>
                            </div>
                          </div></a
                        >
                      </div>
                    </div>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col flex-1">
      <main class="flex-1">
        <div class="py-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import axios from "axios";
</script>

<script>
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
var navigation = [
  {
    name: "Barang",
    icon: "mdi-sack",
    children: [{ name: "Daftar Barang", href: "/admin/barang" }],
  },
  {
    name: "Rit",
    icon: "mdi:truck",
    children: [
      { name: "Daftar Rit", href: "/admin/rit" },
      { name: "Input Data Keluar", href: "/admin/rit/jual_barang" },
      { name: "Nota", href: "/admin/rit/nota" },
    ],
  },
  {
    name: "Customer",
    icon: "fa-user",
    children: [
      { name: "Database Customer", href: "/admin/customer" },
      { name: "Database Mobil", href: "/admin/mobil" },
    ],
  },
  {
    name: "Finance",
    icon: "mdi:cash",
    children: [
      { name: "Daftar Pemasukan", href: "/admin/finance/pemasukan" },
      { name: "Daftar Pengeluaran", href: "/admin/finance" },
      { name: "Daftar Rit", href: "/admin/finance/rit" },
      // { name: "Daftar Cashback", href: "/admin/finance/cashback" },
    ],
  },
  {
    name: "Kendaraan",
    icon: "mdi:car",
    children: [{ name: "Daftar Kendaraan", href: "/admin/kendaraan" }],
  },
  {
    name: "Laporan",
    icon: "majesticons:file-report",
    children: [
      { name: "Laporan Harian", href: "/admin/laporan" },
      { name: "Laporan Bulanan", href: "/admin/laporan/bulanan" },
    ],
  },
  {
    name: "Owner",
    icon: "tabler:tie",
    children: [
      { name: "Daftar Rit", href: "/admin/owner" },
      { name: "Jual Barang", href: "/admin/owner/jual_barang" },
      // { name: "Pemasukan", href: "/admin/owner/pemasukan" },
      // { name: "Gaji", href: "/admin/owner/gaji" },
      { name: "Laba Rugi", href: "/admin/owner/laba_rugi" },
    ],
  },
];

export default {
  props: ["currentPage"],
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },
  setup() {
    return {
      navigation,
    };
  },
  methods: {
    submitLogout: function () {
      localStorage["access_token"] = null;
      localStorage["user_id"] = null;
      localStorage["role_id"] = null;
      this.$router.push("/");
    },
    getNotifications: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/get_notification")
        .then((data) => {
          if (this.role_id == 1) {
            this.notifications = data.data.data.results;
          } else {
            this.notifications = data.data.data.results.filter((item) => {
              return (
                item.title == "Barang Dalam Perjalanan" ||
                item.title == "Input Pemasukan"
              );
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data() {
    return {
      sidebarOpen: false,
      notifications: [],
    };
  },
};
</script>

<style scoped>
.router-link-active {
  @apply bg-gray-900 text-white;
}
</style>

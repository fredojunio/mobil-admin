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
      <h1 class="text-2xl font-semibold text-gray-900 mr-auto">Jual Barang</h1>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
        <select
          @change="changeTabMobile($event)"
          id="tabs"
          name="tabs"
          class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
            {{ tab.name }}
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <div
              @click="changeTab(index)"
              v-for="(tab, index) in tabs"
              :key="tab.name"
              :class="[
                tab.current
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'cursor-pointer whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              ]"
              :aria-current="tab.current ? 'page' : undefined"
            >
              {{ tab.name }}
            </div>
          </nav>
        </div>
      </div>
    </div>
    <!-- //SECTION - Main Page  -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="currentTab == tabs[0].name" class="mt-8 flex flex-col">
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
                      Tanggal Pengiriman
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Detail
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
                          {{ rit.item.code }} - ({{
                            formatDate(rit.delivery_date)
                          }})
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
                          Pusat: {{ formatNumber(rit.main_tonnage) }} kg
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ formatDate(rit.delivery_date) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          v-if="rit.branches.length > 0"
                          class="flex flex-col items-start"
                        >
                          <div
                            @click="openRitBranchDetail(rit.id)"
                            class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                          >
                            <Icon
                              icon="uil:home"
                              class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                            ></Icon>
                            <span class="ml-3">Cabang</span>
                          </div>
                        </div>
                        <div
                          v-if="
                            rit.customer_tonnage > 0 &&
                            rit.customer_transaction == null &&
                            rit.sell_price > 0
                          "
                          @click="openAddOwnerTransaction(rit)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="uil:edit"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Penjualan (Owner)</span>
                        </div>
                        <div
                          v-if="
                            rit.branch_tonnage > 0 &&
                            rit.sold_date != null &&
                            rit.branches.some(
                              (ritBranch) => ritBranch.income == null
                            )
                          "
                          @click="openAddBranchTransaction(rit)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="uil:edit"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Penjualan (Cabang)</span>
                        </div>
                        <div
                          v-if="
                            rit.branch_tonnage > 0 &&
                            rit.branches.some(
                              (ritBranch) => ritBranch.income == null
                            )
                          "
                          @click="openTransferFromBranch(rit)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="uil:edit"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Kirim ke Pusat</span>
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
      <div v-if="currentTab == tabs[1].name" class="mt-8 flex flex-col">
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
                      Tonase Sistem
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
                  <tr v-for="transaction in transactions" :key="transaction.id">
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
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          class="font-medium text-gray-900"
                          v-for="rit in transaction.rits"
                          :key="rit.id"
                        >
                          {{ formatNumber(rit.actual_tonnage) }} kg
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          @click="openNotaApprovalForm(transaction.id)"
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
      <div v-if="currentTab == tabs[2].name" class="mt-8 flex flex-col">
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
                      Tonase Sistem
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
                  <tr v-for="transaction in transactions" :key="transaction.id">
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
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          class="font-medium text-gray-900"
                          v-for="rit in transaction.rits"
                          :key="rit.id"
                        >
                          {{ formatNumber(rit.actual_tonnage) }} kg
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          @click="openRevisionApprovalForm(transaction.id)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="fa:check"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Approve Revisi</span>
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
    <!-- //!SECTION  -->
    <!-- //SECTION Cabang -->
    <TransitionRoot as="template" :show="showRitBranchDetail">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showRitBranchDetail = false"
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
              class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6"
            >
              <form class="space-y-8 divide-y divide-gray-200">
                <div class="space-y-8 divide-y divide-gray-200">
                  <div>
                    <div>
                      <h3 class="text-lg leading-6 font-medium text-gray-900">
                        Riwayat Pengiriman ke Cabang
                      </h3>
                    </div>
                    <hr />
                    <div
                      class="max-w-7xl mt-2 grid grid-cols-1 mx-auto mb-8 gap-x-4"
                    >
                      <div class="mt-8 flex flex-col">
                        <div
                          class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8"
                        >
                          <div
                            class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
                          >
                            <div
                              class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
                            >
                              <table
                                class="min-w-full divide-y divide-gray-300"
                              >
                                <thead class="bg-gray-50">
                                  <tr>
                                    <th
                                      scope="col"
                                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                      Tanggal Pengiriman
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
                                      Tonase (kg)
                                    </th>
                                    <th
                                      scope="col"
                                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                                <tbody
                                  class="divide-y divide-gray-200 bg-white"
                                >
                                  <tr
                                    v-for="ritBranch in selectedData.branches"
                                    :key="ritBranch.id"
                                  >
                                    <td
                                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                    >
                                      <div class="flex items-center">
                                        <div class="font-medium text-gray-900">
                                          {{ formatDate(ritBranch.created_at) }}
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                    >
                                      <div class="flex items-center">
                                        <div class="font-medium text-gray-900">
                                          {{ selectedData.item.code }} -
                                          {{ selectedData.arrival_date }}
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                    >
                                      <div class="flex items-center">
                                        <div class="font-medium text-gray-900">
                                          {{
                                            formatNumber(ritBranch.sent_tonnage)
                                          }}
                                          kg
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                    >
                                      <router-link
                                        :to="{
                                          path: `/admin/rit/surat_jalan/${ritBranch.trip.id}`,
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
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
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
                      @click="showRitBranchDetail = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
    <!-- //SECTION - Popup Penjualan (Owner)  -->
    <TransitionRoot as="template" :show="showAddOwnerTransaction">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showAddOwnerTransaction = false"
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
              class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full sm:p-6"
            >
              <form class="space-y-8 divide-y divide-gray-200">
                <div class="space-y-8 divide-y divide-gray-200">
                  <div>
                    <div>
                      <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {{ "Penjualan (Owner)" }}
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan data sudah benar.
                      </p>
                    </div>
                    <hr />
                    <div
                      class="max-w-7xl grid grid-cols-1 sm:grid-cols-5 mx-auto mb-8 gap-x-4"
                    >
                      <div
                        class="flex flex-col col-span-3 sm:border-r-2 h-full sm:pr-2 gap-y-2"
                      >
                        <div
                          class="flex justify-between items-center gap-2 mb-2"
                        >
                          <div class="text-md font-medium">Daftar Barang</div>
                        </div>
                        <div
                          v-for="(rit, index) in newTransaction.rits"
                          :key="index"
                          class="grid grid-cols-8 gap-x-2 justify-center items-center"
                        >
                          <div class="col-span-2">
                            <label
                              for="product_id"
                              class="block text-sm font-medium text-gray-700"
                            >
                              Tipe Mobil {{ index + 1 }}
                            </label>
                            <div class="mt-1">
                              <Combobox
                                disabled
                                as="div"
                                v-model="rit.item"
                                @update:modelValue="updateRit(index, rit)"
                              >
                                <div class="relative mt-1">
                                  <ComboboxInput
                                    class="disabled:bg-gray-100 w-full rounded-md border border-gray-300 bg-white py-2 px-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                    @change="ritQuery = $event.target.value"
                                    @keyup="filterRit"
                                    :display-value="
                                      (rit) =>
                                        `${rit.item.code} - ${formatDate(
                                          rit.arrival_date
                                        )}`
                                    "
                                  />
                                  <ComboboxButton
                                    class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
                                  >
                                    <SelectorIcon
                                      class="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </ComboboxButton>

                                  <ComboboxOptions
                                    v-if="availableRits.length > 0"
                                    class="absolute z-10 mt-1 max-h-60 w-[50vw] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                  >
                                    <ComboboxOption
                                      v-for="rite in availableRits"
                                      :key="rite.id"
                                      v-model="rit.item"
                                      :value="rite"
                                      as="template"
                                      v-slot="{ active, selected }"
                                    >
                                      <li
                                        :class="[
                                          'relative cursor-default select-none py-2 pl-3 pr-9',
                                          active
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-gray-900',
                                        ]"
                                      >
                                        <span
                                          :class="[
                                            'block truncate',
                                            selected && 'font-semibold',
                                          ]"
                                        >
                                          {{ rite.item.code }} -
                                          {{ formatDate(rite.arrival_date) }}
                                        </span>

                                        <span
                                          v-if="selected"
                                          :class="[
                                            'absolute inset-y-0 right-0 flex items-center pr-4',
                                            active
                                              ? 'text-white'
                                              : 'text-indigo-600',
                                          ]"
                                        >
                                          <CheckIcon
                                            class="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      </li>
                                    </ComboboxOption>
                                  </ComboboxOptions>
                                </div>
                              </Combobox>
                            </div>
                          </div>
                          <div class="col-span-2">
                            <label
                              for="tonnage"
                              class="block text-sm font-medium text-gray-700"
                            >
                              Tipe Karpet
                            </label>
                            <div class="mt-1">
                              <input
                                disabled
                                id="tonnage"
                                v-model="rit.tonnage"
                                @keyup="updateRit(index, rit)"
                                type="number"
                                class="disabled:bg-gray-100 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                          <div class="col-span-2">
                            <label
                              for="price"
                              class="block text-sm font-medium text-gray-700"
                            >
                              Ukuran
                            </label>
                            <div class="mt-1">
                              <input
                                id="price"
                                v-model="rit.price"
                                type="number"
                                disabled
                                class="disabled:bg-gray-100 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                          <div class="col-span-2">
                            <label
                              for="total_price"
                              class="block text-sm font-medium text-gray-700"
                            >
                              Total
                            </label>
                            <div class="mt-1">
                              <input
                                id="total_price"
                                v-model="rit.total_price"
                                @keyup="updateRitKiriman(index, rit)"
                                type="number"
                                class="disabled:bg-gray-100 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                        <hr class="border-2" />
                        <div class="text-md font-medium">Total</div>
                        <div
                          class="grid grid-cols-3 gap-x-2 justify-center items-center"
                        >
                          <div class="col-span-1">Harga Barang:</div>
                          <div class="col-span-2">
                            Rp. {{ formatNumber(newTransaction.item_prices) }}
                          </div>
                          <div class="col-span-1">Harga Ongkir:</div>
                          <div class="col-span-2">
                            Rp. {{ formatNumber(newTransaction.ongkir) }}
                          </div>
                          <hr class="col-span-3 border" />
                          <div class="col-span-1">Harga Total:</div>
                          <div class="col-span-2">
                            Rp. {{ formatNumber(newTransaction.total_price) }}
                          </div>
                        </div>
                        <div
                          class="grid grid-cols-3 gap-x-2 justify-center items-center"
                        >
                          <div class="col-span-1">
                            <label
                              for="money_brought"
                              class="block text-sm font-medium text-gray-700"
                            >
                              Uang yang dibawa (Rp.)
                            </label>
                            <div class="mt-1">
                              <input
                                v-model="money_brought"
                                id="money_brought"
                                type="number"
                                class="shadow-sm disabled:bg-gray-100 focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                              />
                            </div>
                          </div>
                          <div class="col-span-2">
                            <label
                              for="money_kurang"
                              class="block text-sm font-medium text-gray-700"
                            >
                              Kurang Bayar (Rp.)
                            </label>
                            <div class="mt-1">
                              <input
                                disabled
                                id="money_kurang"
                                :value="
                                  newTransaction.total_price - money_brought
                                "
                                type="number"
                                class="shadow-sm disabled:bg-gray-100 focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="flex flex-col col-span-2 border-t-4 mt-12 sm:border-t-0 sm:mt-0"
                      >
                        <!-- //ANCHOR - Customer Detail  -->
                        <CustomerDetail :selectedData="selectedCustomer" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="pt-5">
                  <div class="flex justify-end">
                    <button
                      type="button"
                      @click="showAddOwnerTransaction = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      @click="showConfirmationPopup = true"
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
    <!-- //SECTION - Popup Confirmation  -->
    <TransitionRoot as="template" :show="showConfirmationPopup">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showConfirmationPopup = false"
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
              class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            >
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
                      Pastikan data sudah benar ketika mensubmit penjualan!
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  class="disabled:opacity-50 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:ml-3 sm:w-auto sm:text-sm"
                  @click.once="submitOwnerTransaction()"
                >
                  Submit
                </button>
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:mt-0 sm:w-auto sm:text-sm"
                  @click="showConfirmationPopup = false"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
    <!-- //!SECTION  -->
    <!-- //SECTION - Popup Penjualan (Cabang)  -->
    <TransitionRoot as="template" :show="showAddBranchTransaction">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showAddBranchTransaction = false"
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
              class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6"
            >
              <form class="space-y-8 divide-y divide-gray-200">
                <div class="space-y-8 divide-y divide-gray-200">
                  <div>
                    <div>
                      <h3 class="text-lg leading-6 font-medium text-gray-900">
                        Riwayat Pengiriman ke Cabang
                      </h3>
                    </div>
                    <hr />
                    <div
                      class="max-w-7xl mt-2 grid grid-cols-1 mx-auto mb-8 gap-x-4"
                    >
                      <div class="mt-8 flex flex-col">
                        <div
                          class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8"
                        >
                          <div
                            class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
                          >
                            <div
                              class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
                            >
                              <table
                                class="min-w-full divide-y divide-gray-300"
                              >
                                <thead class="bg-gray-50">
                                  <tr>
                                    <th
                                      scope="col"
                                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                      Tanggal Pengiriman
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
                                      Tonase (kg)
                                    </th>
                                    <th
                                      scope="col"
                                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                      Total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody
                                  class="divide-y divide-gray-200 bg-white"
                                >
                                  <tr
                                    v-for="ritBranch in selectedRit.branches"
                                    :key="ritBranch.id"
                                  >
                                    <td
                                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                    >
                                      <div class="flex items-center">
                                        <div class="font-medium text-gray-900">
                                          {{
                                            formatDate(ritBranch.delivery_date)
                                          }}
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                    >
                                      <div class="flex items-center">
                                        <div class="font-medium text-gray-900">
                                          {{ selectedRit.item.code }} -
                                          {{
                                            formatDate(selectedRit.arrival_date)
                                          }}
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                    >
                                      <div class="flex items-center">
                                        <div class="font-medium text-gray-900">
                                          {{
                                            formatNumber(ritBranch.sent_tonnage)
                                          }}
                                          kg
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                    >
                                      <div class="flex items-center">
                                        <div class="font-medium text-gray-900">
                                          <input
                                            id="allowance_fee"
                                            v-model="ritBranch.income"
                                            type="number"
                                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                                          />
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
                  </div>
                </div>

                <div class="pt-5">
                  <div class="flex justify-end">
                    <button
                      type="button"
                      @click="showAddBranchTransaction = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      :disabled="
                        selectedRit.branches.some(
                          (ritBranch) =>
                            ritBranch.income <= 0 && ritBranch.sent_tonnage > 0
                        )
                      "
                      @click.once="submitBranchTransaction()"
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
    <!-- //!SECTION  -->
    <!-- //SECTION - Popup Pengembalian ke Pusat  -->
    <TransitionRoot as="template" :show="showTransferFromBranch">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showTransferFromBranch = false"
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
                        Pengembalian ke pusat
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan data sudah benar.
                      </p>
                    </div>
                    <hr />
                    <div
                      class="max-w-7xl mt-2 grid grid-cols-1 mx-auto mb-8 gap-x-4"
                    >
                      <div class="flex flex-col col-span-1 h-full gap-y-2">
                        <div class="sm:col-span-6">
                          <label
                            for="vehicle"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Kendaraan
                          </label>
                          <div class="mt-1">
                            <select
                              v-model="transferData.vehicle_id"
                              id="vehicle"
                              name="vehicle"
                              class="shadow-sm focus:ring-black focus:border-tukimring-black block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option
                                v-for="vehicle in vehicles"
                                :key="vehicle.id"
                                :value="vehicle.id"
                              >
                                {{ vehicle.name }} - ({{ vehicle.trip_count }}
                                Trip)
                              </option>
                            </select>
                          </div>
                        </div>
                        <div
                          class="grid grid-cols-1 gap-x-2 justify-center items-center"
                        >
                          <div>
                            <label
                              for="weight"
                              class="block text-sm font-medium text-gray-700"
                            >
                              Tonase (kg)
                            </label>
                            <div class="mt-1">
                              <input
                                id="weight"
                                v-model="transferData.tonnage"
                                type="number"
                                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                              />
                            </div>
                          </div>
                        </div>
                        <hr class="border-2" />
                        <div class="grid grid-cols-2 gap-x-4">
                          <h3
                            class="text-md leading-6 font-medium text-gray-900"
                          >
                            Barang: {{ selectedRit.item.code }}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="pt-5">
                  <div class="flex justify-end">
                    <button
                      type="button"
                      @click="showTransferFromBranch = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      :disabled="
                        selectedRit.branch_tonnage < transferData.tonnage
                      "
                      @click.once="submitTransferFromBranch()"
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
    <!-- //SECTION - Form Approve Rit -->
    <TransitionRoot as="template" :show="showNotaApprovalForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showNotaApprovalForm = false"
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
                        Approve Rit Kiriman
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan data sudah benar.
                      </p>
                    </div>
                    <hr />
                    <div class="grid grid-cols-2 gap-x-4">
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Customer: {{ selectedTransaction.customer?.nickname }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Ongkir: Rp.
                        {{ formatNumber(selectedTransaction.ongkir) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Sak: {{ selectedTransaction.sack }} (Rp.
                        {{ formatNumber(selectedTransaction.sack_price) }})
                        (Gratis: {{ selectedTransaction.sack_free }})
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        BBM: Rp.
                        {{ formatNumber(selectedTransaction.trip?.gas) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Lain-lain: Rp.
                        {{ formatNumber(selectedTransaction.other) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        E-Toll: Rp.
                        {{ formatNumber(selectedTransaction.trip?.toll) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Diskon: Rp.
                        {{ formatNumber(selectedTransaction.discount) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Sangu: Rp.
                        {{ formatNumber(selectedTransaction.trip?.allowance) }}
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
                          Total
                        </label>
                        <div class="mt-1">
                          Rp.
                          {{ formatNumber(selectedTransaction.total_price) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="pt-5">
                  <div class="flex justify-end">
                    <button
                      type="button"
                      @click.once="approveNota(2)"
                      class="bg-red-500 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      @click.once="approveNota(1)"
                      class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      {{ "Approve" }}
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
    <!-- //SECTION - Form Approve Revisi -->
    <TransitionRoot as="template" :show="showRevisionApprovalForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showRevisionApprovalForm = false"
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
                        Approve Revisi
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan data sudah benar.
                      </p>
                    </div>
                    <hr />
                    <div class="grid grid-cols-2 gap-x-4">
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Customer: {{ selectedTransaction.customer.nickname }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Ongkir: Rp.
                        {{ formatNumber(selectedTransaction.ongkir) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Sak: {{ selectedTransaction.sack }} (Rp.
                        {{ formatNumber(selectedTransaction.sack_price) }})
                        (Gratis: {{ selectedTransaction.sack_free }})
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        BBM: Rp.
                        <span v-if="selectedTransaction.trip">
                          {{ formatNumber(selectedTransaction.trip.gas) }}
                        </span>
                        <span v-else>-</span>
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Lain-lain: Rp.
                        {{ formatNumber(selectedTransaction.other) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        E-Toll: Rp.
                        <span v-if="selectedTransaction.trip">
                          {{ formatNumber(selectedTransaction.trip.toll) }}
                        </span>
                        <span v-else>-</span>
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Diskon: Rp.
                        {{ formatNumber(selectedTransaction.discount) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Sangu: Rp.
                        <span v-if="selectedTransaction.trip">
                          {{ formatNumber(selectedTransaction.trip.allowance) }}
                        </span>
                        <span v-else>-</span>
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
                          Total
                        </label>
                        <div class="mt-1">
                          Rp.
                          {{ formatNumber(selectedTransaction.total_price) }}
                        </div>
                      </div>
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
                          Note
                        </label>
                        <div class="mt-1">
                          {{ selectedTransaction.revision_note }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="pt-5">
                  <div class="flex justify-end">
                    <button
                      type="button"
                      @click="showRevisionApprovalForm = false"
                      class="bg-black py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      @click.once="approveRevision()"
                      class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      {{ "Approve" }}
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
import CustomerDetail from "../../../components/CustomerDetail.vue";
import axios from "axios";
import { computed, ref } from "vue";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";
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
  created() {
    this.getOwnerTransactions();
    this.getAllCustomers();
    this.getAllVehicles();
    this.getAllRits();
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
      if (this.currentTab == "Rit") {
        this.getOwnerTransactions();
      } else if (this.currentTab == "Nota") {
        this.getNotaTransactions();
      } else if (this.currentTab == "Revisi") {
        this.getRequestedRevisions();
      }
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
      if (this.currentTab == "Rit") {
        this.getOwnerTransactions();
      } else if (this.currentTab == "Nota") {
        this.getNotaTransactions();
      } else if (this.currentTab == "Revisi") {
        this.getRequestedRevisions();
      }
    },
    //NOTE - Section Jual ke Customer
    getOwnerTransactions: function () {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/transaction/get_owner_transactions")
        .then((data) => {
          this.transactions = data.data.data.results;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectCustomer(id) {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/customer/" + id)
        .then((data) => {
          this.selectedCustomer = data.data.data.results;
          this.newTransaction.ongkir = this.selectedCustomer.ongkir;
          this.updateTotalPrice();
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openRitBranchDetail(id) {
      this.showRitBranchDetail = true;
      this.selectedData = this.rits.find((obj) => {
        return obj.id === id;
      });
    },
    openAddOwnerTransaction(rit) {
      let ownerTransaction = this.transactions.find((obj) => {
        return (
          obj.customer.id == rit.customer.id &&
          obj.total_price == null &&
          obj.trip.id == rit.trip.id
        );
      });
      this.selectedTransaction = ownerTransaction;
      this.newTransaction.customer_id = ownerTransaction.customer.id;
      this.newTransaction.ongkir = ownerTransaction.ongkir;
      this.newTransaction.rits = [];
      this.newTransaction.rits.push({
        item: rit,
        tonnage: rit.customer_tonnage,
        real_tonnage: 0,
        masak: 1,
        price: rit.sell_price,
        total_price: rit.customer_tonnage * rit.sell_price,
      });
      this.newTransaction.vehicle_id = rit.trip.vehicle.id;
      setTimeout(() => {
        this.selectCustomer(this.newTransaction.customer_id);
      }, 500);
      this.showAddOwnerTransaction = true;
    },
    addNewRit() {
      var newRit = {
        item: this.availableRits[0],
        tonnage: 0,
        real_tonnage: 0,
        masak: 1,
        price: null,
        total_price: null,
      };
      this.newTransaction.rits.push(newRit);
      let newRitIndex = this.newTransaction.rits.length - 1;
      this.updateRit(newRitIndex, this.newTransaction.rits[newRitIndex]);
    },
    updateRit(i, rit) {
      let selectedRit = this.newTransaction.rits[i];
      selectedRit.price = rit.item.sell_price;
      selectedRit.total_price =
        selectedRit.price * selectedRit.tonnage * selectedRit.masak;
      this.updateTotalPrice();
    },
    updateRitKiriman(i, rit) {
      let selectedRit = this.newTransaction.rits[i];
      selectedRit.price = rit.item.sell_price;
      this.updateTotalPrice();
    },
    updateTotalPrice() {
      this.newTransaction.item_prices = 0;
      this.newTransaction.rits.forEach((rit) => {
        this.newTransaction.item_prices += rit.total_price;
      });
      let sackFee = this.newTransaction.sack_fee
        ? this.newTransaction.sack * 1500
        : 0;
      this.newTransaction.total_price =
        this.newTransaction.item_prices +
        this.newTransaction.ongkir -
        this.newTransaction.discount +
        this.newTransaction.tb +
        this.newTransaction.tw +
        this.newTransaction.thr +
        sackFee;
    },
    removeRit(index) {
      this.newTransaction.rits.splice(index, 1);
    },
    filterRit() {
      if (this.ritQuery == "") {
        this.availableRits = this.rits;
      } else {
        this.availableRits = this.rits.filter((rit) => {
          return rit.item.code
            .toLowerCase()
            .includes(this.ritQuery.toLowerCase());
        });
      }
      this.availableRits = this.availableRits.filter(
        (rit) =>
          rit.arrival_date != null && rit.sell_price > 0 && rit.is_hold == 0
      );
    },
    getAllRits: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/rit/get_sell_owner_stock")
        .then((data) => {
          this.rits = data.data.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllCustomers: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/customer/get_lean_data")
        .then((data) => {
          this.customers = data.data.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllVehicles: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/vehicle")
        .then((data) => {
          this.vehicles = data.data.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitOwnerTransaction() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(
          `admin/transaction/${this.selectedTransaction.id}/approve_owner`,
          this.newTransaction
        )
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //NOTE - Section Jual dari Cabang
    openAddBranchTransaction(rit) {
      this.selectedRit = rit;
      this.showAddBranchTransaction = true;
    },
    submitBranchTransaction() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(
          `admin/transaction/${this.selectedRit.id}/branch`,
          this.selectedRit
        )
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //NOTE - Section Kirim ke Pusat
    openTransferFromBranch(rit) {
      this.selectedRit = rit;
      this.showTransferFromBranch = true;
    },
    submitTransferFromBranch() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(
          `admin/rit/${this.selectedRit.id}/transfer_from_branch`,
          this.transferData
        )
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //NOTE - Section Nota
    getNotaTransactions: function () {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/transaction/get_owner_nota")
        .then((data) => {
          this.transactions = data.data.data.results;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openNotaApprovalForm(id) {
      this.selectedTransaction = this.transactions.find((obj) => {
        return obj.id === id;
      });
      this.showNotaApprovalForm = true;
    },
    approveNota(val) {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(`admin/transaction/${this.selectedTransaction.id}/approve_nota`, {
          owner_approved: val,
        })
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //NOTE - Section Revisi
    getRequestedRevisions: function () {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/transaction/get_requested_revisions")
        .then((data) => {
          this.transactions = data.data.data.results;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openRevisionApprovalForm(id) {
      this.selectedTransaction = this.transactions.find((obj) => {
        return obj.id === id;
      });
      this.showRevisionApprovalForm = true;
    },
    approveRevision(val) {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get(
          `admin/transaction/${this.selectedTransaction.id}/approve_revision`
        )
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
      isLoading: false,
      //ini buat masukin penjualan customer yang langsung dianter
      showAddOwnerTransaction: false,
      showConfirmationPopup: false,
      //ini buat cek pengiriman ke cabang
      showRitBranchDetail: false,
      //ini buat masukin penjualan cabang
      showAddBranchTransaction: false,
      //ini buat ngembalikin ke cabang
      showTransferFromBranch: false,
      // ini approval nota
      showNotaApprovalForm: false,
      // ini approval revisi
      showRevisionApprovalForm: false,
      tabs: [
        { name: "Rit", current: true },
        { name: "Nota", current: false },
        { name: "Revisi", current: false },
      ],
      currentTab: "Rit",
      products: [
        {
          product: { id: 0, name: "" },
          amount: 0,
          real_amount: 0,
          masak: 1,
          is_new: false,
        },
      ],
      transactions: [],
      selectedTransaction: null,
      //NOTE - Section Jual ke Customer
      rits: [],
      availableRits: [],
      ritQuery: "",
      selectedCustomer: {
        id: null,
        nik: null,
        name: null,
        nickname: null,
        address: null,
        ongkir: null,
        birthdate: null,
        type: null,
        tb: null,
        tw: null,
        thr: null,
        cashback_approved: null,
        tonnage: null,
        savings: [],
        transactions: [],
      },
      customers: [],
      vehicles: [],
      newTransaction: {
        customer_id: null,
        ongkir: null,
        vehicle_id: null,
        allowance: null,
        gas: null,
        toll: null,
        rits: [],
        tb: null,
        tw: null,
        thr: null,
        sack: null,
        sack_fee: false,
        item_prices: null,
        discount: null,
        total_price: null,
      },
      money_brought: null,
      calculator: {
        rit: { sell_price: 0 },
        tonnage: null,
        price: null,
      },
      //NOTE - Section Jual Barang Cabang
      selectedRit: null,
      //NOTE - Section Kirim ke Pusat
      transferData: {
        vehicle_id: null,
        tonnage: null,
      },
    };
  },
};
</script>

<style></style>

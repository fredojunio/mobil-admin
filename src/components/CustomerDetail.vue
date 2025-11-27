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
                {{ selectedData.nickname }} ({{ selectedData.phone }})
              </h1>
              <div class="flex flex-col gap-2">
                <button
                  v-if="$route.path == '/admin/customer'"
                  @click="toggleForm"
                  class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
                >
                  Edit
                </button>
                <button
                  v-if="$route.path == '/admin/customer'"
                  @click="showCashbackApprovalForm = true"
                  class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
                >
                  Approve Cashback
                </button>
                <!-- <button
                  v-if="$route.path == '/admin/customer'"
                  @click="showDepositSavingsForm = true"
                  class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
                >
                  Deposit Tabungan
                </button> -->
                <button
                  v-if="$route.path == '/admin/customer'"
                  @click="showWithdrawSavingsForm = true"
                  class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
                >
                  Tarik Tabungan
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden sm:flex 2xl:hidden min-w-0 flex-1 gap-2">
          <h1 class="text-2xl font-bold text-gray-900 truncate mr-auto">
            {{ selectedData.nickname }} ({{ selectedData.phone }})
          </h1>
          <button
            v-if="$route.path == '/admin/customer'"
            @click="toggleForm"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
          >
            Edit
          </button>
          <button
            v-if="
              $route.path == '/admin/customer' &&
              selectedData.cashback_approved == 0
            "
            @click="showCashbackApprovalForm = true"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
          >
            Approve Cashback
          </button>
          <!-- <button
            v-if="$route.path == '/admin/customer'"
            @click="showDepositSavingsForm = true"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
          >
            Deposit Tabungan
          </button> -->
          <button
            v-if="$route.path == '/admin/customer'"
            @click="showWithdrawSavingsForm = true"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
          >
            Tarik Tabungan
          </button>
        </div>
      </div>
    </div>
    <hr />

    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Alamat</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ selectedData.address }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">NIK</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ selectedData.nik }}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Ongkir</dt>
          <dd class="mt-1 text-sm text-gray-900">
            Rp. {{ formatNumber(selectedData.ongkir) }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Tanggal Lahir</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ selectedData.birthdate }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Tipe</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ selectedData.type }}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Cashback</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ selectedData.cashback_days }} Hari
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
        <!-- //SECTION - Tab Daftar Transaksi  -->
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
                @update:model-value="filterTransaction"
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
                        Tanggal
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
                    <tr
                      v-for="transaction in filteredTransactions.filter(
                        (transaction) => transaction.settled_date != null
                      )"
                      :key="transaction.id"
                    >
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ formatDate(transaction.created_at) }}
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex flex-col items-start">
                          <div
                            @click="openTransactionDetail(transaction.id)"
                            class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                          >
                            <Icon
                              icon="uil:eye"
                              class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                            ></Icon>
                            <span class="ml-3">Detail</span>
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
        <!-- //!SECTION  -->
        <!-- //SECTION - Tab Riwayat Tabungan  -->
        <div v-if="tabs[1].current" class="col-span-2">
          <form class="flex space-x-4" action="#">
            <div class="relative rounded-md shadow-sm w-full">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <Icon icon="fa:calendar" class="h-5 w-5 text-gray-400" />
              </div>
              <VueDatePicker
                v-model="date"
                @update:model-value="filterSaving"
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
                        Tanggal
                      </th>
                      <!-- <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Total TW
                      </th> -->
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Total TB
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Total THR
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Total Ton
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Tipe
                      </th>
                      <!-- <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        TW
                      </th> -->
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        TB
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        THR
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Ton
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="saving in filteredSavings" :key="saving.id">
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ formatDate(saving.created_at) }}
                          </div>
                        </div>
                      </td>
                      <!-- <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            Rp. {{ formatNumber(saving.total_tw) }}
                          </div>
                        </div>
                      </td> -->
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            Rp. {{ formatNumber(saving.total_tb) }}
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            Rp. {{ formatNumber(saving.total_thr) }}
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ formatNumber(saving.total_tonnage) }} kg
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ saving.type }}
                          </div>
                        </div>
                      </td>
                      <!-- <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            Rp. {{ formatNumber(saving.tw) }}
                          </div>
                        </div>
                      </td> -->
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            Rp. {{ formatNumber(saving.tb) }}
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            Rp. {{ formatNumber(saving.thr) }}
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ formatNumber(saving.tonnage) }} kg
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
        <!-- //!SECTION  -->
        <!-- //SECTION - Tab Daftar Transaksi  -->
        <div v-if="tabs[2].current" class="col-span-2">
          <form class="flex space-x-4" action="#">
            <div class="relative rounded-md shadow-sm">
              <p class="font-bold text-sm mb-1">Periode Bulan</p>
              <input
                @keydown.enter.prevent="filterTransactionByMonth()"
                id="month"
                v-model="month"
                type="month"
                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-4"
              />
            </div>
            <div v-if="filteredTransactionsMonth.length != 0">
              <p class="font-bold text-sm mb-1">Produk</p>
              <select
                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-4 pr-8"
                v-model="selectedProduk"
                @change="handleSelectionProduk"
              >
                <option value="">Semua</option>
                <option
                  v-for="(item, index) in produks"
                  :key="index"
                  :value="item"
                >
                  {{ item }}
                </option>
              </select>
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
                        Tanggal
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
                        Tonase ({{ sumTonnage }} kg)
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Total Harga (Rp. {{ formatNumber(sumTotal) }})
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr
                      v-for="transactionMonth in filteredMonth.filter(
                        (transactionMonth) =>
                          transactionMonth.settled_date != null
                      )"
                      :key="transactionMonth.id"
                    >
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ formatDate(transactionMonth.created_at) }}
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex flex-col">
                          <div
                            class="font-medium text-gray-900"
                            v-for="rit in transactionMonth.rits"
                            :key="rit.id"
                          >
                            <div
                              v-if="
                                rit.rit.item.code == selectedProduk ||
                                selectedProduk == ''
                              "
                            >
                              {{ rit.rit.item.code }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div
                          class="font-medium text-gray-900"
                          v-for="rit in transactionMonth.rits"
                          :key="rit.id"
                        >
                          <div
                            v-if="
                              rit.rit.item.code == selectedProduk ||
                              selectedProduk == ''
                            "
                          >
                            {{ formatNumber(rit.tonnage * rit.masak) }}
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            <div
                              class="font-medium text-gray-900"
                              v-for="(rit, index) in transactionMonth.rits"
                              :key="index"
                            >
                              <div v-if="rit.rit.item.code == selectedProduk">
                                Rp.
                                {{
                                  formatNumber(
                                    rit.total_price - rit.tonnage * 200
                                  )
                                }}
                              </div>
                              <div v-if="selectedProduk == '' && index == 0">
                                Rp.
                                {{
                                  formatNumber(
                                    transactionMonth.total_price -
                                      transactionMonth.customer.tonnage * 200
                                  )
                                }}
                              </div>
                            </div>
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
        <!-- //!SECTION  -->
      </dl>
    </div>
    <!-- //SECTION Form Deposit Tabungan -->
    <TransitionRoot as="template" :show="showDepositSavingsForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showDepositSavingsForm = false"
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
                        Deposit Tabungan
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan data sudah benar.
                      </p>
                    </div>
                    <div class="grid grid-cols-2 gap-x-4">
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Customer: {{ selectedData.name }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        TB: Rp. {{ formatNumber(selectedData.tb) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Tonase Akumulatif:
                        {{ formatNumber(selectedData.tonnage) }} kg
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        THR: Rp. {{ formatNumber(selectedData.thr) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        <!-- kosong -->
                      </h3>
                      <!-- <h3 class="text-md leading-6 font-medium text-gray-900">
                        TW: Rp. {{ formatNumber(selectedData.tw) }}
                      </h3> -->
                    </div>
                    <hr class="border-2" />
                    <hr />
                    <div
                      class="max-w-7xl mt-2 grid grid-cols-1 mx-auto mb-8 gap-x-4"
                    >
                      <div class="flex flex-col col-span-1 h-full gap-y-2">
                        <div
                          class="grid grid-cols-3 gap-x-2 justify-center items-center"
                        >
                          <div>
                            <label
                              for="allowance_fee"
                              class="block text-sm font-medium text-gray-700"
                            >
                              TB
                            </label>
                            <div class="mt-1">
                              <input
                                v-model="newSavings.tb"
                                id="allowance_fee"
                                type="number"
                                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              for="gas_fee"
                              class="block text-sm font-medium text-gray-700"
                            >
                              THR
                            </label>
                            <div class="mt-1">
                              <input
                                v-model="newSavings.thr"
                                id="gas_fee"
                                type="number"
                                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              for="etoll_fee"
                              class="block text-sm font-medium text-gray-700"
                            >
                              TW
                            </label>
                            <div class="mt-1">
                              <input
                                v-model="newSavings.tw"
                                id="etoll_fee"
                                type="number"
                                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                              />
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
                      @click="showDepositSavingsForm = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      :disabled="
                        newSavings.tb < 0 ||
                        newSavings.thr < 0 ||
                        newSavings.tw < 0
                      "
                      type="button"
                      @click.once="depositSavings()"
                      class="disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Submit
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
    <!-- //SECTION - Form Tarik Tabungan  -->
    <TransitionRoot as="template" :show="showWithdrawSavingsForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showWithdrawSavingsForm = false"
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
                        Tarik Tabungan
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
                        <div class="grid grid-cols-2 gap-x-4">
                          <h3
                            class="text-md leading-6 font-medium text-gray-900"
                          >
                            Customer: {{ selectedData.name }}
                          </h3>
                          <h3
                            class="text-md leading-6 font-medium text-gray-900"
                          >
                            TB: Rp. {{ formatNumber(selectedData.tb) }}
                          </h3>
                          <h3
                            class="text-md leading-6 font-medium text-gray-900"
                          >
                            Tonase Akumulatif:
                            {{ formatNumber(selectedData.tonnage) }} kg
                          </h3>
                          <h3
                            class="text-md leading-6 font-medium text-gray-900"
                          >
                            THR: Rp. {{ formatNumber(selectedData.thr) }}
                          </h3>
                          <h3
                            class="text-md leading-6 font-medium text-gray-900"
                          >
                            <!-- kosong -->
                          </h3>
                          <!-- <h3
                            class="text-md leading-6 font-medium text-gray-900"
                          >
                            TW: Rp. {{ formatNumber(selectedData.tw) }}
                          </h3> -->
                        </div>
                        <hr class="border-2" />
                        <div class="sm:col-span-6">
                          <label
                            for="type"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Tabungan
                          </label>
                          <div class="mt-1">
                            <select
                              v-model="savings.type"
                              @change="calculateDifference()"
                              id="type"
                              name="type"
                              class="shadow-sm focus:ring-black focus:border-tukimring-black block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option value="tb" selected>TB</option>
                              <!-- <option value="tw">TW</option> -->
                              <option value="thr">THR</option>
                            </select>
                          </div>
                        </div>
                        <div
                          class="grid grid-cols-2 gap-x-2 justify-center items-center"
                        >
                          <div>
                            <label
                              for="withdraw_balance"
                              class="block text-sm font-medium text-gray-700"
                            >
                              Jumlah yang mau ditarik (Rp.)
                            </label>
                            <div class="mt-1">
                              <input
                                id="withdraw_balance"
                                v-model="savings.amount"
                                v-on:keyup="calculateDifference()"
                                type="number"
                                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              for="sisa"
                              class="block text-sm font-medium text-gray-700"
                            >
                              Saldo Sisa (Rp.)
                            </label>
                            <div class="mt-1">
                              <input
                                disabled
                                v-model="savings.difference"
                                id="sisa"
                                type="number"
                                class="disabled:bg-gray-100 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                              />
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
                      @click="showWithdrawSavingsForm = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      :disabled="savings.difference < 0 || role_id != 1"
                      @click.once="withdrawSavings()"
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
    <!-- //SECTION - Form Approve Cashback  -->
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
                <div class="space-y-8 divide-y divide-gray-200">
                  <div>
                    <div>
                      <h3 class="text-lg leading-6 font-medium text-gray-900">
                        Approve Cashback
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
                        <div class="grid grid-cols-2 gap-x-4">
                          <h3
                            class="text-md leading-6 font-medium text-gray-900"
                          >
                            Customer: {{ selectedData.name }}
                          </h3>
                          <h3
                            class="text-md leading-6 font-medium text-gray-900"
                          >
                            Tonase Akumulatif:
                            {{ formatNumber(selectedData.tonnage) }} kg
                          </h3>
                          <h3
                            class="text-md leading-6 font-medium text-gray-900"
                          ></h3>
                          <h3
                            class="text-md leading-6 font-medium text-gray-900"
                          >
                            Jumlah Transaksi:
                            {{ selectedData.cashback_days }} Hari
                          </h3>
                        </div>
                        <hr class="border-2" />
                        <div
                          class="grid grid-cols-1 gap-x-2 justify-center items-center"
                        >
                          <div>
                            <label
                              for="cashback"
                              class="block text-sm font-medium text-gray-700"
                            >
                              Cashback (Rp.)
                            </label>
                            <div class="mt-1">
                              <input
                                id="cashback"
                                v-model="cashback.amount"
                                type="number"
                                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                              />
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
                      @click="showCashbackApprovalForm = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      :disabled="role_id != 1"
                      @click.once="approveCashback()"
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
  </div>
  <!-- //SECTION Detail -->
  <TransitionRoot as="template" :show="showTransactionDetail">
    <Dialog
      as="div"
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="showTransactionDetail = false"
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
                      Daftar Transaksi
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
                            <table class="min-w-full divide-y divide-gray-300">
                              <thead class="bg-gray-50">
                                <tr>
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
                                    Tonase (kg)
                                  </th>
                                  <th
                                    scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                  >
                                    TB (Rp.)
                                  </th>
                                  <!-- <th
                                    scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                  >
                                    TW (Rp.)
                                  </th> -->
                                  <th
                                    scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                  >
                                    THR (Rp.)
                                  </th>
                                </tr>
                              </thead>
                              <tbody class="divide-y divide-gray-200 bg-white">
                                <tr>
                                  <td
                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                  >
                                    <div class="flex flex-col">
                                      <div
                                        class="font-medium text-gray-900"
                                        v-for="rit in selectedTransaction.rits"
                                        :key="rit.id"
                                      >
                                        {{ rit.rit.item.code }}
                                      </div>
                                    </div>
                                  </td>
                                  <td
                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                  >
                                    <div class="flex flex-col">
                                      <div
                                        class="font-medium text-gray-900"
                                        v-for="rit in selectedTransaction.rits"
                                        :key="rit.id"
                                      >
                                        {{
                                          formatNumber(rit.tonnage * rit.masak)
                                        }}
                                      </div>
                                    </div>
                                  </td>
                                  <td
                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                  >
                                    <div class="flex items-center">
                                      <div class="font-medium text-gray-900">
                                        Rp.
                                        {{
                                          formatNumber(selectedTransaction.tb)
                                        }}
                                      </div>
                                    </div>
                                  </td>
                                  <!-- <td
                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                  >
                                    <div class="flex items-center">
                                      <div class="font-medium text-gray-900">
                                        Rp.
                                        {{
                                          formatNumber(selectedTransaction.tw)
                                        }}
                                      </div>
                                    </div>
                                  </td> -->
                                  <td
                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                  >
                                    <div class="flex items-center">
                                      <div class="font-medium text-gray-900">
                                        Rp.
                                        {{
                                          formatNumber(selectedTransaction.thr)
                                        }}
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
                    @click="showTransactionDetail = false"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    {{ "Tutup" }}
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
      this.changeTab(0);
      this.filterTransaction();
    },
    month(newMonth) {
      this.handleMonthChange(newMonth);
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
      //ini buat cek detail
      showTransactionDetail: false,
      showDepositSavingsForm: false,
      showWithdrawSavingsForm: false,
      showCashbackApprovalForm: false,
      date: [
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 59)),
      ],
      tabs: [
        { name: "Daftar Transaksi", current: true },
        { name: "Riwayat Tabungan", current: false },
        { name: "Periode Bulanan", current: false },
      ],
      filteredTransactions: [],
      filteredTransactionsMonth: [],
      filteredMonth: [],
      selectedTransaction: null,
      filteredSavings: [],
      savings: {
        type: "tb",
        amount: null,
        tb: 0,
        tw: 0,
        thr: 0,
        difference: 0,
      },
      newSavings: {
        tb: 0,
        tw: 0,
        thr: 0,
      },
      cashback: {
        amount: 0,
      },
      month: "",
      selectedProduk: "",
      produks: [],
      sumTonnage: 0,
      sumTotal: 0,
    };
  },
  created() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    this.month = `${year}-${month}`;
    // this.filterTransactionByMonth();
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
      if (this.currentTab == "Daftar Transaksi") {
        this.filterTransaction();
      } else if (this.currentTab == "Riwayat Tabungan") {
        this.filterSaving();
      } else if ((this.currentTab = "Periode Bulanan")) {
        this.filterTransactionByMonth();
      }
    },
    filterTransaction() {
      this.isLoading = true;

      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(
          "/admin/customer/" +
            this.selectedData.id +
            "/get_customer_transactions",
          {
            start_date: this.date[0].toString(),
            end_date: this.date[1].toString(),
          }
        )
        .then((data) => {
          this.filteredTransactions = data.data.data.results;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filterTransactionByMonth() {
      this.isLoading = true;

      const [year, month] = this.month.split("-").map(Number);
      const startDate = new Date(year, month - 1, 1); // Month is zero-based in Date constructor
      const endDate = new Date(year, month, 0); // Get the last day of the month

      // Format dates as 'YYYY-MM-DD'
      // const formattedStartDate = startDate.toISOString().split("T")[0];
      // const formattedEndDate = endDate.toISOString().split("T")[0];

      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(
          "/admin/customer/" +
            this.selectedData.id +
            "/get_customer_transactions",
          {
            start_date: startDate.toString(),
            end_date: endDate.toString(),
          }
        )
        .then((data) => {
          this.filteredTransactionsMonth = data.data.data.results;
          this.filteredMonth = this.filteredTransactionsMonth.filter(
            (transactionMonth) => transactionMonth.settled_date != null
          );
          this.selectedProduk = "";

          // add list produk
          this.produks = [];
          this.sumTonnage = 0;
          this.sumTotal = 0;
          this.filteredMonth.forEach((transactionMonth) => {
            transactionMonth.rits.forEach((rit) => {
              if (!this.produks.includes(rit.rit.item.code)) {
                this.produks.push(rit.rit.item.code);
              }
              this.sumTonnage += rit.tonnage * rit.masak;
            });
            this.sumTotal +=
              transactionMonth.total_price -
              transactionMonth.customer.tonnage * 200;
          });

          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openTransactionDetail(id) {
      this.selectedTransaction = this.filteredTransactions.find((obj) => {
        return obj.id === id;
      });
      this.showTransactionDetail = true;
    },
    filterSaving() {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(
          "/admin/customer/" + this.selectedData.id + "/get_customer_savings",
          {
            start_date: this.date[0].toString(),
            end_date: this.date[1].toString(),
          }
        )
        .then((data) => {
          this.filteredSavings = data.data.data.results;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    calculateDifference() {
      this.savings.tb = 0;
      this.savings.tw = 0;
      this.savings.thr = 0;
      if (this.savings.type == "tb") {
        this.savings.difference = this.selectedData.tb - this.savings.amount;
        this.savings.tb = this.savings.amount;
      } else if (this.savings.type == "tw") {
        this.savings.difference = this.selectedData.tw - this.savings.amount;
        this.savings.tw = this.savings.amount;
      } else if (this.savings.type == "thr") {
        this.savings.difference = this.selectedData.thr - this.savings.amount;
        this.savings.thr = this.savings.amount;
      }
    },
    depositSavings() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(
          `admin/customer/${this.selectedData.id}/deposit_savings`,
          this.newSavings
        )
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    withdrawSavings() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(
          `admin/customer/${this.selectedData.id}/withdraw_savings`,
          this.savings
        )
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    approveCashback() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(
          `admin/customer/${this.selectedData.id}/approve_cashback`,
          this.cashback
        )
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleMonthChange(newMonth) {
      this.filterTransactionByMonth();
    },
    handleSelectionProduk() {
      if (this.selectedProduk != "") {
        this.filteredMonth = this.filteredTransactionsMonth
          .filter((filterTransaction) =>
            filterTransaction.rits.some(
              (e) => e.rit.item.code === this.selectedProduk
            )
          )
          .filter((transactionMonth) => transactionMonth.settled_date != null);

        this.sumTonnage = 0;
        this.sumTotal = 0;
        this.filteredMonth.forEach((transactionMonth) => {
          transactionMonth.rits.forEach((rit) => {
            if (rit.rit.item.code == this.selectedProduk) {
              this.sumTonnage += rit.tonnage * rit.masak;
              this.sumTotal += rit.total_price - rit.tonnage * 200;
            }
          });
        });
      } else {
        this.filteredMonth = this.filteredTransactionsMonth.filter(
          (transactionMonth) => transactionMonth.settled_date != null
        );

        this.sumTonnage = 0;
        this.sumTotal = 0;
        this.filteredMonth.forEach((transactionMonth) => {
          transactionMonth.rits.forEach((rit) => {
            this.sumTonnage += rit.tonnage * rit.masak;
          });
          this.sumTotal +=
            transactionMonth.total_price -
            transactionMonth.customer.tonnage * 200;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>

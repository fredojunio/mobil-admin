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
        Daftar Pemasukan
      </h1>
      <div class="relative flex gap-2 text-left">
        <div class="relative rounded-md shadow-sm w-96">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <Icon icon="fa:calendar" class="h-5 w-5 text-gray-400" />
          </div>
          <VueDatePicker
            v-model="date"
            @update:model-value="changeTab(currentTab)"
            locale="id"
            :start-time="[
              { hours: 0, minutes: 0, seconds: 0 },
              { hours: 23, minutes: 59, seconds: 59 },
            ]"
            range
            :enable-time-picker="false"
          />
        </div>
        <!-- <button
          v-if="currentTab == tabs[2].name"
          @click="showTopUpForm = true"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
        > -->
        Top Up
        <!-- </button>
        <button
          v-if="currentTab == tabs[2].name"
          @click="showExchangeForm = true"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
        >
          Tukar Uang
        </button> -->
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
        <select
          v-if="role_id == 1"
          @change="changeTabMobile($event)"
          id="tabs"
          name="tabs"
          class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
            {{ tab.name }}
          </option>
        </select>
        <select
          v-else
          @change="changeTabMobile($event)"
          id="tabs"
          name="tabs"
          class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option
            v-for="tab in tabs.filter((tab) => tab.name != 'Hold')"
            :key="tab.name"
            :selected="tab.current"
          >
            {{ tab.name }}
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav
            v-if="role_id == 1"
            class="-mb-px flex space-x-8"
            aria-label="Tabs"
          >
            <div
              @click="changeTab(tab.name)"
              v-for="tab in tabs"
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
          <nav v-else class="-mb-px flex space-x-8" aria-label="Tabs">
            <div
              @click="changeTab(tab.name)"
              v-for="tab in tabs.filter((tab) => tab.name != 'Hold')"
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
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              v-model="searchTransactionQuery"
              type="search"
              name="search"
              id="search"
              class="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search"
            />
          </div>
        </div>
      </form>
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
                      ID
                    </th>
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
                      Status
                    </th>
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr
                    v-for="transaction in transactions.filter(
                      (transaction) =>
                        (searchTransactionQuery
                          ? transaction.customer?.nickname
                              .toLowerCase()
                              .includes(searchTransactionQuery.toLowerCase())
                          : true) ||
                        (searchTransactionQuery
                          ? transaction.type
                              .toLowerCase()
                              .includes(searchTransactionQuery.toLowerCase())
                          : true)
                    )"
                    :key="transaction.id"
                  >
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div
                        v-if="
                          transaction.revision_requested != 1 &&
                          isWithin3Days(transaction.created_at) &&
                          transaction.type != 'Cas'
                        "
                        @click="openRevisionForm(transaction.id)"
                        class="flex items-center"
                      >
                        <div class="font-medium text-blue-500 cursor-pointer">
                          {{ transaction.daily_id }}
                        </div>
                      </div>
                      <div v-else class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ transaction.daily_id }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div
                          v-if="transaction.type == 'Cabang'"
                          class="font-medium text-gray-900"
                        >
                          Cabang
                        </div>
                        <div
                          v-else-if="transaction.type == 'Cas'"
                          class="font-medium text-gray-900"
                        >
                          Cas
                        </div>
                        <div v-else class="font-medium text-gray-900">
                          {{ transaction.customer.nickname }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ formatNumber(transaction.total_price) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{
                            transaction.finance_approved == 0
                              ? "Kurang Bayar"
                              : transaction.finance_approved == 2
                              ? "Retur"
                              : "Lunas"
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
                            transaction.finance_approved == 2
                              ? formatDate(transaction.updated_at)
                              : formatDate(transaction.created_at)
                          }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start gap-y-1">
                        <div
                          v-if="transaction.finance_approved == 0"
                          @click="showApprovalForm(transaction.id, false)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="fa:check"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Approve</span>
                        </div>
                        <div
                          v-if="
                            transaction.finance_approved == 0 && role_id == 1
                          "
                          @click="showApprovalForm(transaction.id, true)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="fa:check"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Approve (Transfer)</span>
                        </div>
                        <div
                          v-if="transaction.payments.length > 0"
                          @click="openTransactionDetail(transaction.id)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="uil:eye"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Detail</span>
                        </div>
                        <router-link
                          v-if="
                            transaction.revision_allowed == 1 &&
                            isToday(transaction.created_at) &&
                            transaction.type != 'Cas'
                          "
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
                        <div
                          v-if="
                            transaction.revision_allowed == 1 &&
                            isToday(transaction.created_at) &&
                            transaction.type != 'Cas'
                          "
                          class="flex flex-col items-start"
                        >
                          <div
                            @click="openReturnTransactionForm(transaction.id)"
                            class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                          >
                            <Icon
                              icon="uil:truck"
                              class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                            ></Icon>
                            <span class="ml-3">Retur</span>
                          </div>
                        </div>
                        <router-link
                          v-if="transaction.type != 'Cas'"
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
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Scroll trigger element -->
          <div ref="scrollTrigger" class="scroll-trigger"></div>
        </div>
      </div>
    </div>
    <!-- //SECTION - Approval Form  -->
    <TransitionRoot as="template" :show="showSaleApprovalForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showSaleApprovalForm = false"
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
                        Approve Penjualan
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan data sudah benar.
                      </p>
                    </div>
                    <hr />
                    <div class="grid grid-cols-2 gap-x-4">
                      <h3
                        v-if="selectedData.customer"
                        class="text-md leading-6 font-medium text-gray-900"
                      >
                        Customer: {{ selectedData.customer.nickname }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Total: Rp. {{ formatNumber(selectedData.total_price) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Tanggal: {{ formatDate(selectedData.created_at) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Kurang Bayar: Rp.
                        {{
                          formatNumber(
                            selectedData.total_price - getTotalPayments()
                          )
                        }}
                      </h3>
                    </div>
                  </div>
                </div>
                <div class="sm:col-span-6">
                  <label
                    for="amount"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Jumlah (Rp.)
                  </label>
                  <div class="mt-1">
                    <input
                      id="amount"
                      v-model="payment.amount"
                      type="number"
                      class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                    />
                  </div>
                </div>

                <div class="pt-5">
                  <div class="flex justify-end">
                    <button
                      type="button"
                      :disabled="selectedData.payments.length > 0"
                      @click="rejectTransaction()"
                      class="disabled:opacity-50 bg-red-500 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      :disabled="
                        payment.amount <= 0 ||
                        payment.amount >
                          selectedData.total_price - getTotalPayments()
                      "
                      @click.once="approveTransaction()"
                      class="disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
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
    <!-- //SECTION Detail Transaction -->
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
                        Riwayat Pembayaran
                      </h3>
                    </div>
                    <hr />
                    <div
                      class="max-w-7xl grid grid-cols-1 mx-auto mb-8 gap-x-4"
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
                                      Tanggal
                                    </th>
                                    <th
                                      scope="col"
                                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                      Jumlah
                                    </th>
                                  </tr>
                                </thead>
                                <tbody
                                  class="divide-y divide-gray-200 bg-white"
                                >
                                  <tr
                                    v-for="payment in selectedData.payments"
                                    :key="payment.id"
                                  >
                                    <td
                                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                    >
                                      <div class="flex items-center">
                                        <div class="font-medium text-gray-900">
                                          {{ formatDate(payment.created_at) }}
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                    >
                                      <div class="flex items-center">
                                        <div class="font-medium text-gray-900">
                                          Rp. {{ formatNumber(payment.amount) }}
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
    <!-- //!SECTION -->
    <!-- //SECTION - Form Top Up  -->
    <TransitionRoot as="template" :show="showTopUpForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showTopUpForm = false"
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
                        {{ "Tambah Deposit Uang Cas" }}
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan data sudah benar.
                      </p>
                    </div>
                    <hr />
                    <div class="grid grid-cols-3 gap-x-4 my-2">
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Total: Rp.
                        {{
                          formatNumber(
                            casBalance.koin +
                              casBalance.seribu +
                              casBalance.duaribu +
                              casBalance.limaribu +
                              casBalance.sepuluhribu +
                              casBalance.duapuluhribu
                          )
                        }}
                      </h3>
                    </div>
                    <div class="grid grid-cols-3 gap-x-4 my-2">
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Koin: Rp. {{ formatNumber(casBalance.koin) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        1.000: Rp. {{ formatNumber(casBalance.seribu) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        2.000: Rp. {{ formatNumber(casBalance.duaribu) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        5.000: Rp. {{ formatNumber(casBalance.limaribu) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        10.000: Rp. {{ formatNumber(casBalance.sepuluhribu) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        20.000: Rp. {{ formatNumber(casBalance.duapuluhribu) }}
                      </h3>
                    </div>
                    <hr />
                    <div
                      class="grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-1"
                    >
                      <div>
                        <label
                          for="total"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Total (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="total"
                            v-model="deposit.total"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Sisa uang:
                        {{
                          deposit.total -
                          (deposit.koin +
                            deposit.seribu +
                            deposit.duaribu +
                            deposit.limaribu +
                            deposit.sepuluhribu +
                            deposit.duapuluhribu)
                        }}
                      </h3>
                    </div>

                    <div
                      class="mt-6 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-3"
                    >
                      <div>
                        <label
                          for="koin"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Koin (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="koin"
                            v-model="deposit.koin"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          for="seribu"
                          class="block text-sm font-medium text-gray-700"
                        >
                          1.000 (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="seribu"
                            v-model="deposit.seribu"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          for="duaribu"
                          class="block text-sm font-medium text-gray-700"
                        >
                          2.000 (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="duaribu"
                            v-model="deposit.duaribu"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          for="limaribu"
                          class="block text-sm font-medium text-gray-700"
                        >
                          5.000 (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="limaribu"
                            v-model="deposit.limaribu"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          for="sepuluhribu"
                          class="block text-sm font-medium text-gray-700"
                        >
                          10.000 (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="sepuluhribu"
                            v-model="deposit.sepuluhribu"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          for="duapuluhribu"
                          class="block text-sm font-medium text-gray-700"
                        >
                          20.000 (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="duapuluhribu"
                            v-model="deposit.duapuluhribu"
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
                      @click="showTopUpForm = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      :disabled="
                        deposit.total -
                          (deposit.koin +
                            deposit.seribu +
                            deposit.duaribu +
                            deposit.limaribu +
                            deposit.sepuluhribu +
                            deposit.duapuluhribu) !=
                          0 || deposit.total <= 0
                      "
                      @click.once="topUp()"
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
    <!-- //SECTION - Form Exchange  -->
    <TransitionRoot as="template" :show="showExchangeForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showExchangeForm = false"
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
                        {{ "Cas - Tukar Uang" }}
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan data sudah benar.
                      </p>
                    </div>
                    <hr />
                    <div class="grid grid-cols-3 gap-x-4 my-2">
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Total: Rp.
                        {{
                          formatNumber(
                            casBalance.koin +
                              casBalance.seribu +
                              casBalance.duaribu +
                              casBalance.limaribu +
                              casBalance.sepuluhribu +
                              casBalance.duapuluhribu
                          )
                        }}
                      </h3>
                    </div>
                    <div class="grid grid-cols-3 gap-x-4 my-2">
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Koin: Rp. {{ formatNumber(casBalance.koin) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        1.000: Rp. {{ formatNumber(casBalance.seribu) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        2.000: Rp. {{ formatNumber(casBalance.duaribu) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        5.000: Rp. {{ formatNumber(casBalance.limaribu) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        10.000: Rp. {{ formatNumber(casBalance.sepuluhribu) }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        20.000: Rp. {{ formatNumber(casBalance.duapuluhribu) }}
                      </h3>
                    </div>
                    <hr />
                    <div
                      class="grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-2"
                    >
                      <div class="col-span-2">
                        <label
                          for="total"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Total (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="total"
                            v-model="exchange.total"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Sisa uang:
                        {{
                          exchange.total -
                          (exchange.koin +
                            exchange.seribu +
                            exchange.duaribu +
                            exchange.limaribu +
                            exchange.sepuluhribu +
                            exchange.duapuluhribu)
                        }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Biaya:
                        {{
                          formatNumber(
                            Math.ceil(exchange.total / 2000000) * 5000
                          )
                        }}
                      </h3>
                    </div>

                    <div
                      class="mt-6 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-3"
                    >
                      <div>
                        <label
                          for="koin"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Koin (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="koin"
                            v-model="exchange.koin"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          for="seribu"
                          class="block text-sm font-medium text-gray-700"
                        >
                          1.000 (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="seribu"
                            v-model="exchange.seribu"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          for="duaribu"
                          class="block text-sm font-medium text-gray-700"
                        >
                          2.000 (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="duaribu"
                            v-model="exchange.duaribu"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          for="limaribu"
                          class="block text-sm font-medium text-gray-700"
                        >
                          5.000 (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="limaribu"
                            v-model="exchange.limaribu"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          for="sepuluhribu"
                          class="block text-sm font-medium text-gray-700"
                        >
                          10.000 (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="sepuluhribu"
                            v-model="exchange.sepuluhribu"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          for="duapuluhribu"
                          class="block text-sm font-medium text-gray-700"
                        >
                          20.000 (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="duapuluhribu"
                            v-model="exchange.duapuluhribu"
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
                      @click="showExchangeForm = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      :disabled="
                        exchange.total -
                          (exchange.koin +
                            exchange.seribu +
                            exchange.duaribu +
                            exchange.limaribu +
                            exchange.sepuluhribu +
                            exchange.duapuluhribu) !=
                          0 ||
                        exchange.total <= 0 ||
                        exchange.koin > casBalance.koin ||
                        exchange.seribu > casBalance.seribu ||
                        exchange.duaribu > casBalance.duaribu ||
                        exchange.limaribu > casBalance.limaribu ||
                        exchange.sepuluhribu > casBalance.sepuluhribu ||
                        exchange.duapuluhribu > casBalance.duapuluhribu
                      "
                      @click.once="exchangeMoney()"
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
    <!-- //SECTION - Popup Revision Form  -->
    <TransitionRoot as="template" :show="showRevisionPopup">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showRevisionPopup = false"
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
                    Request revisi
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Pastikan transaksi yang dipilih sudah benar!
                    </p>
                  </div>
                </div>
              </div>
              <hr class="my-2" />
              <div class="sm:col-span-6">
                <label
                  for="note"
                  class="block text-sm font-medium text-gray-700"
                >
                  Note
                </label>
                <div class="mt-1">
                  <input
                    id="note"
                    v-model="revision.note"
                    type="text"
                    class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                  />
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  class="disabled:opacity-50 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:ml-3 sm:w-auto sm:text-sm"
                  @click.once="requestRevision()"
                >
                  Submit
                </button>
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:mt-0 sm:w-auto sm:text-sm"
                  @click="showRevisionPopup = false"
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
    <!-- //!SECTION -->
    <!-- //SECTION Retur -->
    <TransitionRoot as="template" :show="showReturnTransactionForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showReturnTransactionForm = false"
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
              <!-- //NOTE - ini kalo belum di retur -->
              <form class="space-y-8 divide-y divide-gray-200">
                <div class="space-y-8 divide-y divide-gray-200">
                  <div>
                    <div>
                      <h3 class="text-lg leading-6 font-medium text-gray-900">
                        Retur Barang {{ selectedData.daily_id }}
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
                              v-model="returnTransaction.vehicle_id"
                              id="vehicle"
                              name="vehicle"
                              class="shadow-sm focus:ring-black focus:borderring-black block w-full sm:text-sm border-gray-300 rounded-md"
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
                          class="grid grid-cols-3 gap-x-2 justify-center items-center"
                        >
                          <div>
                            <label
                              for="allowance_fee"
                              class="block text-sm font-medium text-gray-700"
                            >
                              Uang Sangu (Rp.)
                            </label>
                            <div class="mt-1">
                              <input
                                v-model="returnTransaction.allowance"
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
                              Uang BBM (Rp.)
                            </label>
                            <div class="mt-1">
                              <input
                                v-model="returnTransaction.gas"
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
                              Uang E-Toll (Rp.)
                            </label>
                            <div class="mt-1">
                              <input
                                v-model="returnTransaction.toll"
                                id="etoll_fee"
                                type="number"
                                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          class="grid grid-cols-1 gap-x-2 justify-center items-center"
                        >
                          <div>
                            <label
                              for="itemRit"
                              class="block text-sm font-medium text-gray-700"
                            >
                              Item
                            </label>
                            <div class="mt-1">
                              <select
                                v-model="returnTransaction.rit_id"
                                id="itemRit"
                                name="vehicle"
                                class="shadow-sm focus:ring-black focus:borderring-black block w-full sm:text-sm border-gray-300 rounded-md"
                              >
                                <option
                                  v-for="itemRit in selectedData.rits"
                                  :key="itemRit.id"
                                  :value="itemRit.id"
                                >
                                  {{ itemRit.rit.item.code }} -
                                  {{ formatDate(itemRit.rit.arrival_date) }} -
                                  ({{
                                    formatNumber(
                                      itemRit.tonnage * itemRit.masak
                                    )
                                  }}
                                  kg)
                                </option>
                              </select>
                            </div>
                          </div>
                          <div class="mt-1">
                            <label
                              for="tonnage"
                              class="block text-sm font-medium text-gray-700"
                            >
                              Tonase (kg)
                            </label>
                            <div class="mt-1">
                              <input
                                v-model="returnTransaction.tonnage"
                                id="tonnage"
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
                      @click="showReturnTransactionForm = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      :disabled="
                        returnTransaction.vehicle_id == null ||
                        // returnTransaction.tonnage > selectedData.tonnage_left ||
                        returnTransaction.tonnage <= 0
                      "
                      type="button"
                      @click.once="returningTransaction(selectedData.id)"
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
  </Admin>
</template>

<script setup>
import Admin from "../../../layouts/Admin.vue";
import { Icon } from "@iconify/vue";
import axios from "axios";
import moment from "moment";
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
    this.getCompletedTransactions();
    this.checkDailyReport();
    this.getAllVehicles();

    this.$nextTick(() => {
      this.setupIntersectionObserver();
      this.setupScrollListener(); // Fallback method
    });
  },
  methods: {
    changeTab(tabName) {
      this.tabs.forEach((tab) => {
        if (tab.current) {
          tab.current = false;
        }
      });
      this.tabs.find((tab) => tab.name === tabName).current = true;
      this.currentTab = tabName;
      if (this.currentTab == "Penjualan") {
        this.transactions = [];
        this.currentPage = 1;
        this.hasMore = true;
        this.error = null;

        this.getCompletedTransactions();
      }
      // else if (this.currentTab == "Tabungan") {
      //   this.getSavingsIncomes();
      // } else if (this.currentTab == "Cas") {
      //   this.getCurrentCasBalance();
      //   this.getCases();
      // }
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
      if (this.currentTab == "Penjualan") {
        this.getCompletedTransactions();
      } else if (this.currentTab == "Tabungan") {
        this.getSavingsIncomes();
      } else if (this.currentTab == "Cas") {
        this.getCurrentCasBalance();
        this.getCases();
      }
    },
    isToday(dateString) {
      var inputDate = new Date(dateString);

      var currentDate = new Date();

      var currentYear = currentDate.getFullYear();
      var currentMonth = currentDate.getMonth();
      var currentDay = currentDate.getDate();

      var inputYear = inputDate.getFullYear();
      var inputMonth = inputDate.getMonth();
      var inputDay = inputDate.getDate();

      return (
        currentYear === inputYear &&
        currentMonth === inputMonth &&
        currentDay === inputDay
      );

      // const today = new Date();
      // const momentDate = moment.utc(dateString).local();
      // const formattedDate = momentDate.format("YYYY-MM-DD");
      // return (
      //   formattedDate === today.toISOString().substr(0, 10) && !this.dailyReport
      // );
    },
    isWithin3Days(dateString) {
      // Parse the input date
      var inputDate = new Date(dateString);

      // Get current date
      var currentDate = new Date();

      // Calculate the difference in milliseconds
      var timeDifference = inputDate.getTime() - currentDate.getTime();

      // Convert milliseconds to days (1000 ms * 60 s * 60 min * 24 hrs)
      var daysDifference = Math.abs(timeDifference / (1000 * 60 * 60 * 24));

      // Check if the difference is 3 days or less
      return daysDifference <= 3;
    },
    checkDailyReport() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/report/check_daily_report")
        .then((data) => {
          this.dailyReport = data.data.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //STUB - Penjualan
    getCompletedTransactions() {
      if (this.loading || !this.hasMore) return;

      this.error = null;
      this.loading = true;

      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post("/admin/transaction/get_completed_transactions", {
          start_date: this.date[0].toString(),
          end_date: this.date[1].toString(),
          page: this.currentPage,
          per_page: this.perPage,
        })
        .then((data) => {
          this.transactions = [...this.transactions, ...data.data.data.results];
          this.isLoading = false;
          this.loading = false;
          this.hasMore = data.data.data.pagination.has_more;
          this.currentPage = data.data.data.pagination.current_page + 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // Fallback scroll method
    setupScrollListener() {
      window.addEventListener("scroll", this.handleScroll);
    },

    handleScroll() {
      // Throttle scroll events
      if (this.scrollTimeout) return;

      this.scrollTimeout = setTimeout(() => {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;

        // Load more when user is 200px from bottom
        if (scrollTop + clientHeight >= scrollHeight - 200) {
          if (!this.loading && this.hasMore) {
            this.getCompletedTransactions();
          }
        }

        this.scrollTimeout = null;
      }, 100);
    },
    setupIntersectionObserver() {
      const options = {
        root: null,
        rootMargin: "200px", // Increased margin
        threshold: 0.1,
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.loading && this.hasMore) {
            this.getCompletedTransactions();
          }
        });
      }, options);

      // Use nextTick to ensure the element is rendered
      this.$nextTick(() => {
        if (this.$refs.scrollTrigger) {
          this.observer.observe(this.$refs.scrollTrigger);
        } else {
          // console.error("Scroll trigger element not found"); // Debug log
        }
      });
    },
    openRevisionForm(id) {
      this.showRevisionPopup = true;
      this.selectedData = this.transactions.find((obj) => {
        return obj.id === id;
      });
      this.revision.note = null;
    },
    requestRevision() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(
          "admin/transaction/" + this.selectedData.id + "/request_revision",
          {
            note: this.revision.note,
          }
        )
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showApprovalForm(id, transfer) {
      this.showSaleApprovalForm = true;
      this.selectedData = this.transactions.find((obj) => {
        return obj.id === id;
      });
      this.approvalTransfer = transfer;
    },
    openTransactionDetail(id) {
      this.showTransactionDetail = true;
      this.selectedData = this.transactions.find((obj) => {
        return obj.id === id;
      });
    },
    getTotalPayments() {
      return this.selectedData.payments.reduce((total, pay) => {
        return total + pay.amount;
      }, 0);
    },
    approveTransaction() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(`admin/transaction/${this.selectedData.id}/approve_finance`, {
          amount: this.payment.amount,
          transfer: this.approvalTransfer,
        })
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rejectTransaction() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get(`admin/transaction/${this.selectedData.id}/reject_finance`)
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //STUB - Tabungan
    getSavingsIncomes() {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post("/admin/saving/get_savings_incomes", {
          start_date: this.date[0].toString(),
          end_date: this.date[1].toString(),
        })
        .then((data) => {
          this.savings = data.data.data.results;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //STUB - Cas
    getCases() {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post("/admin/cas/get_cas", {
          start_date: this.date[0].toString(),
          end_date: this.date[1].toString(),
        })
        .then((data) => {
          this.cases = data.data.data.results;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCurrentCasBalance() {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/cas_deposit")
        .then((data) => {
          this.casBalance = data.data.api_results;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    exchangeMoney() {
      this.exchange.fee = Math.ceil(this.exchange.total / 2000000) * 5000;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(`admin/cas`, this.exchange)
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    topUp() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(`admin/cas_deposit`, this.deposit)
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openReturnTransactionForm(id) {
      this.showReturnTransactionForm = true;
      this.selectedData = this.transactions.find((obj) => {
        return obj.id === id;
      });
    },
    returningTransaction() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(
          `admin/transaction/${this.selectedData.id}/return`,
          this.returnTransaction
        )
        .then((data) => {
          this.$router.go(0);
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
  },
  data() {
    return {
      isLoading: false,
      tabs: [{ name: "Penjualan", current: true }],
      currentTab: "Penjualan",
      date: [
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 59)),
      ],
      //STUB - Penjualan
      searchTransactionQuery: null,
      showRevisionPopup: false,
      showSaleApprovalForm: false,
      showTransactionDetail: false,
      showReturnTransactionForm: false,
      transactions: [],
      vehicles: [],
      payment: {
        amount: null,
      },
      approvalTransfer: false,
      dailyReport: null,
      //STUB - Tabungan
      savings: [],
      //STUB - Cas
      showExchangeForm: false,
      showTopUpForm: false,
      casBalance: null,
      cases: [],
      exchange: {
        fee: null,
        total: null,
        koin: null,
        seribu: null,
        duaribu: null,
        limaribu: null,
        sepuluhribu: null,
        duapuluhribu: null,
      },
      revision: {
        note: null,
      },
      deposit: {
        total: null,
        koin: null,
        seribu: null,
        duaribu: null,
        limaribu: null,
        sepuluhribu: null,
        duapuluhribu: null,
      },
      returnTransaction: {
        vehicle_id: null,
        allowance: null,
        gas: null,
        toll: null,
        tonnage: null,
        rit_id: null,
      },

      currentPage: 1,
      loading: false,
      hasMore: true,
      perPage: 20,
      error: null,
    };
  },
};
</script>

<style></style>

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
    <div
      class="max-w-7xl grid grid-cols-1 sm:grid-cols-5 mx-auto px-4 sm:px-6 md:px-8 mb-8 gap-x-4"
    >
      <div
        class="flex flex-col col-span-3 sm:border-r-2 h-full sm:pr-2 gap-y-2"
      >
        <div class="sm:col-span-6">
          <label for="customer" class="block text-sm font-medium text-gray-700">
            Customer
          </label>
          <div class="mt-1">
            <select
              v-model="newTransaction.customer_id"
              @change="selectCustomer(newTransaction.customer_id)"
              id="customer"
              name="customer"
              class="shadow-sm focus:ring-black focus:borderring-black block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option
                v-for="customer in customers.filter(
                  (customer) => customer.type != 'Owner'
                )"
                :key="customer.id"
                :value="customer.id"
              >
                {{ customer.nickname }} ({{ customer.name }})
              </option>
            </select>
          </div>
        </div>
        <div class="sm:col-span-6" v-if="selectedCustomer.type != 'Kiriman'">
          <label
            for="transaction_date"
            class="block text-sm font-medium text-gray-700"
          >
            Tanggal
          </label>
          <div class="mt-1">
            <input
              v-model="newTransaction.date"
              type="date"
              name="transaction_date"
              id="transaction_date"
              class="shadow-sm focus:ring-black focus:borderring-black block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div class="sm:col-span-6" v-if="selectedCustomer.type == 'Kiriman'">
          <label for="vehicle" class="block text-sm font-medium text-gray-700">
            Kendaraan
          </label>
          <div class="mt-1">
            <select
              v-model="newTransaction.vehicle_id"
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
          v-if="selectedCustomer.type == 'Kiriman'"
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
                id="allowance_fee"
                v-model="newTransaction.allowance"
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
                id="gas_fee"
                v-model="newTransaction.gas"
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
                id="etoll_fee"
                v-model="newTransaction.toll"
                type="number"
                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
              />
            </div>
          </div>
        </div>
        <hr class="border-2" />
        <div class="flex justify-between items-center gap-2 mb-2">
          <div class="text-md font-medium">Daftar Barang</div>
          <button
            @click="addNewRit"
            class="inline-flex gap-2 items-center justify-center rounded-md border border-transparent bg-black p-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
          >
            <Icon icon="fa-plus"></Icon>
            Tambah Barang
          </button>
        </div>
        <div
          v-for="(rit, index) in newTransaction.rits"
          :key="index"
          class="grid grid-cols-11 gap-x-2 justify-center items-center"
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
                as="div"
                v-model="rit.item"
                @update:modelValue="updateRit(index, rit)"
              >
                <div class="relative mt-1">
                  <ComboboxInput
                    autocomplete="off"
                    class="w-full rounded-md border border-gray-300 bg-white py-2 px-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    @change="ritQuery = $event.target.value"
                    @input="filterRit"
                    :display-value="
                      (rit) =>
                        rit.item
                          ? `${rit.item.code} - ${formatDate(
                              rit.arrival_date
                            )} - (${formatNumber(rit.tonnage_left)} kg)`
                          : ``
                    "
                  />

                  <ComboboxOptions
                    v-if="filteredRits.length > 0"
                    class="absolute z-10 mt-1 max-h-60 w-[50vw] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ComboboxOption
                      v-for="rite in filteredRits"
                      :key="rite.id"
                      v-model="rit.item"
                      :value="rite"
                      as="template"
                      v-slot="{ active, selected }"
                    >
                      <li
                        :class="[
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        ]"
                      >
                        <span
                          :class="[
                            'block truncate',
                            selected && 'font-semibold',
                          ]"
                        >
                          {{ rite.item.code }} -
                          {{ formatDate(rite.arrival_date) }} - ({{
                            formatNumber(rite.tonnage_left)
                          }}
                          kg)
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
              Tipe Karpet {{ index + 1 }}
            </label>
            <div class="mt-1">
              <Combobox
                as="div"
                v-model="rit.item"
                @update:modelValue="updateRit(index, rit)"
              >
                <div class="relative mt-1">
                  <ComboboxInput
                    autocomplete="off"
                    class="w-full rounded-md border border-gray-300 bg-white py-2 px-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    @change="ritQuery = $event.target.value"
                    @input="filterRit"
                    :display-value="
                      (rit) =>
                        rit.item
                          ? `${rit.item.code} - ${formatDate(
                              rit.arrival_date
                            )} - (${formatNumber(rit.tonnage_left)} kg)`
                          : ``
                    "
                  />

                  <ComboboxOptions
                    v-if="filteredRits.length > 0"
                    class="absolute z-10 mt-1 max-h-60 w-[50vw] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ComboboxOption
                      v-for="rite in filteredRits"
                      :key="rite.id"
                      v-model="rit.item"
                      :value="rite"
                      as="template"
                      v-slot="{ active, selected }"
                    >
                      <li
                        :class="[
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        ]"
                      >
                        <span
                          :class="[
                            'block truncate',
                            selected && 'font-semibold',
                          ]"
                        >
                          {{ rite.item.code }} -
                          {{ formatDate(rite.arrival_date) }} - ({{
                            formatNumber(rite.tonnage_left)
                          }}
                          kg)
                        </span>
                      </li>
                    </ComboboxOption>
                  </ComboboxOptions>
                </div>
              </Combobox>
            </div>
          </div>
          <div class="col-span-2">
            <label for="masak" class="block text-sm font-medium text-gray-700">
              Ukuran
            </label>
            <div class="mt-1">
              <input
                id="masak"
                v-model="rit.masak"
                @input="updateRit(index, rit)"
                type="number"
                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div class="col-span-2">
            <label for="price" class="block text-sm font-medium text-gray-700">
              Harga
            </label>
            <div class="mt-1">
              <input
                id="price"
                v-model="rit.price"
                type="number"
                @input="updateRitKiriman(index, rit)"
                :disabled="selectedCustomer.type != 'Kiriman'"
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
                type="number"
                disabled
                class="disabled:bg-gray-100 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div class="col-span-1">
            <button
              @click="removeRit(index)"
              class="inline-flex gap-2 items-center justify-center rounded-md border border-transparent bg-red-600 p-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
            >
              <Icon icon="uil:times" class="w-4 h-4"></Icon>
            </button>
          </div>
        </div>
        <hr class="border-2" />
        <!-- <div class="grid grid-cols-2 gap-x-2 justify-center items-center"> -->
        <!-- <div class="col-span-1">
            <label for="thr" class="block text-sm font-medium text-gray-700">
              THR (Rp.)
            </label>
            <div class="mt-1">
              <input
                id="thr"
                v-model="newTransaction.thr"
                @input="updateTotalPrice"
                type="number"
                class="shadow-sm disabled:bg-gray-100 focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
              />
            </div>
          </div> -->
        <!-- <div class="col-span-1">
            <label for="tb" class="block text-sm font-medium text-gray-700">
              TB (Rp.)
            </label>
            <div class="mt-1">
              <input
                id="tb"
                v-model="newTransaction.tb"
                @input="updateTotalPrice"
                type="number"
                class="shadow-sm disabled:bg-gray-100 focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
              />
            </div>
          </div> -->
        <!-- <div class="col-span-1">
            <label for="tw" class="block text-sm font-medium text-gray-700">
              TW (Rp.)
            </label>
            <div class="mt-1">
              <input
                id="tw"
                v-model="newTransaction.tw"
                @input="updateTotalPrice"
                type="number"
                class="shadow-sm disabled:bg-gray-100 focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
              />
            </div>
          </div> -->
        <!-- </div> -->
        <div class="grid grid-cols-2 gap-x-2 justify-center items-center">
          <!-- <div class="relative flex items-start col-span-2">
            <div class="text-sm">
              <label for="sak" class="font-medium text-gray-700"
                >Sak - Stok: {{ sacks }}</label
              >
            </div>
          </div> -->
          <div class="relative flex items-start">
            <div class="text-sm">
              <label for="sak" class="font-medium text-gray-700"
                >Berbayar</label
              >
            </div>
          </div>
          <div class="relative flex items-start">
            <div class="text-sm">
              <label for="sak" class="font-medium text-gray-700">Gratis</label>
            </div>
          </div>
          <div class="mt-1">
            <input
              id="sak"
              v-model="newTransaction.sack"
              @input="updateTotalPrice"
              type="number"
              class="shadow-sm disabled:bg-gray-100 focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
            />
          </div>
          <div class="mt-1">
            <input
              id="sak"
              v-model="newTransaction.sack_free"
              @input="updateTotalPrice"
              type="number"
              class="shadow-sm disabled:bg-gray-100 focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
            />
          </div>
        </div>
        <div class="sm:col-span-6">
          <label for="discount" class="block text-sm font-medium text-gray-700">
            Lain-lain (Rp.)
          </label>
          <div class="mt-1">
            <input
              id="discount"
              v-model="newTransaction.other"
              @input="updateTotalPrice"
              type="number"
              class="shadow-sm disabled:bg-gray-100 focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
            />
          </div>
        </div>
        <div class="sm:col-span-6">
          <label for="discount" class="block text-sm font-medium text-gray-700">
            Discount (Rp.)
          </label>
          <div class="mt-1">
            <input
              id="discount"
              v-model="newTransaction.discount"
              @input="updateTotalPrice"
              type="number"
              :disabled="role_id != 1"
              class="shadow-sm disabled:bg-gray-100 focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
            />
          </div>
        </div>
        <hr class="border-2" />
        <div class="text-md font-medium">Total</div>
        <div class="grid grid-cols-3 gap-x-2 justify-center items-center">
          <div class="col-span-1">Harga Barang:</div>
          <div class="col-span-2">
            Rp. {{ formatNumber(newTransaction.item_prices) }}
          </div>
          <div class="col-span-1">Harga Ongkir:</div>
          <div class="col-span-2">
            Rp. {{ formatNumber(newTransaction.ongkir) }}
          </div>
          <!-- <div class="col-span-1">Harga Sak:</div>
          <div class="col-span-2">
            Rp.
            {{ formatNumber(newTransaction.sack * 1500) }}
          </div> -->
          <!-- <div class="col-span-1">Tabungan:</div>
          <div class="col-span-2">
            Rp.
            {{
              formatNumber(
                newTransaction.tb + newTransaction.tw + newTransaction.thr
              )
            }}
          </div> -->
          <div class="col-span-1">Lain-lain:</div>
          <div class="col-span-2">
            Rp. {{ formatNumber(newTransaction.other) }}
          </div>
          <div class="col-span-1">Discount:</div>
          <div class="col-span-2">
            Rp. {{ formatNumber(newTransaction.discount) }}
          </div>
          <hr class="col-span-3 border" />
          <div class="col-span-1">Harga Total:</div>
          <div class="col-span-2">
            Rp. {{ formatNumber(newTransaction.total_price) }}
          </div>
        </div>
        <div class="grid grid-cols-3 gap-x-2 justify-center items-center">
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
                :value="newTransaction.total_price - money_brought"
                type="number"
                class="shadow-sm disabled:bg-gray-100 focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
              />
            </div>
          </div>
        </div>

        <div class="pt-5">
          <div class="flex justify-end">
            <button
              type="button"
              :disabled="
                selectedCustomer.id == null ||
                newTransaction.rits.some(
                  (rit) => rit.item.tonnage_left < rit.tonnage * rit.masak
                ) ||
                newTransaction.rits.some((rit) => rit.tonnage <= 0) ||
                newTransaction.sack + newTransaction.sack_free > sacks ||
                (newTransaction.sack == null &&
                  newTransaction.sack_free == null) ||
                (newTransaction.sack < 0 && newTransaction.sack_free < 0) ||
                (newTransaction.rits.length == 0 &&
                  newTransaction.sack <= 0 &&
                  newTransaction.tb <= 0 &&
                  newTransaction.thr <= 0 &&
                  newTransaction.tw <= 0)
              "
              @click="showConfirmationPopup = true"
              class="disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {{ "Submit" }}
            </button>
          </div>
        </div>
        <hr class="border-2" />
        <div class="text-md font-medium">Kalkulator</div>
        <div class="grid grid-cols-3 gap-x-2 justify-center items-center">
          <div class="col-span-1">
            <label
              for="calculated_rit"
              class="block text-sm font-medium text-gray-700"
            >
              Produk (Harga: Rp. {{ formatNumber(calculator.rit.sell_price) }})
            </label>
            <div class="mt-1">
              <select
                v-model="calculator.rit"
                name="calculated_rit"
                class="shadow-sm focus:ring-black focus:border-tukimring-black block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option
                  v-for="rit in rits.filter(
                    (rit) =>
                      rit.arrival_date != null &&
                      rit.sell_price > 0 &&
                      rit.is_hold == 0
                  )"
                  :key="rit.id"
                  :value="rit"
                >
                  {{ rit.item.code }} - ({{ formatDate(rit.delivery_date) }})
                </option>
              </select>
            </div>
          </div>
          <div class="col-span-1">
            <label for="money" class="block text-sm font-medium text-gray-700">
              Uang (Rp.)
            </label>
            <div class="mt-1">
              <input
                v-model="calculator.price"
                id="money"
                type="number"
                class="shadow-sm disabled:bg-gray-100 focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
              />
            </div>
          </div>
          <div class="col-span-1">
            <label for="tonase" class="block text-sm font-medium text-gray-700">
              Tonase (kg)
            </label>
            <div class="mt-1">
              <input
                disabled
                :value="calculator.price / calculator.rit.sell_price"
                id="tonase"
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
                  <div v-if="selectedCustomer.type == 'Kiriman'">
                    <div
                      v-for="(rit, index) in newTransaction.rits"
                      :key="index"
                      class="grid grid-cols-4 gap-x-2 justify-center items-center"
                    >
                      <div class="col-span-2">
                        <label
                          for="product_id"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Rit {{ index + 1 }}
                        </label>
                        <div class="mt-1">
                          <input
                            id="name"
                            v-model="rit.item.item.code"
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
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  :disabled="
                    selectedCustomer.type == 'Kiriman' &&
                    (newTransaction.rits.some((rit) => rit.real_tonnage < 0) ||
                      newTransaction.rits.some(
                        (rit) =>
                          rit.real_tonnage <
                          rit.item.tonnage_left - 50 - rit.tonnage
                      ) ||
                      newTransaction.rits.some(
                        (rit) =>
                          rit.real_tonnage >
                          rit.item.tonnage_left + 50 - rit.tonnage
                      ))
                  "
                  class="disabled:opacity-50 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:ml-3 sm:w-auto sm:text-sm"
                  @click.once="createData()"
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
  </Admin>
</template>

<script setup>
import Admin from "../../../layouts/Admin.vue";
import CustomerDetail from "../../../components/CustomerDetail.vue";
import { Icon } from "@iconify/vue";
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
  props: ["id"],
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
  methods: {
    addNewRit() {
      var newRit = {
        item: {
          code: null,
        },
        tonnage: null,
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
      if (rit.item) {
        let selectedRit = this.newTransaction.rits[i];
        selectedRit.price = rit.item.sell_price;
        selectedRit.total_price = selectedRit.price * selectedRit.masak;
        selectedRit.total_price =
          Math.ceil(selectedRit.total_price / 100) * 100;
        this.updateTotalPrice();
      }
    },
    updateRitKiriman(i, rit) {
      if (rit.item) {
        let selectedRit = this.newTransaction.rits[i];
        selectedRit.total_price = selectedRit.price * selectedRit.masak;
        selectedRit.total_price =
          Math.ceil(selectedRit.total_price / 100) * 100;
        this.updateTotalPrice();
      }
    },
    updateTotalPrice() {
      this.newTransaction.item_prices = 0;
      this.newTransaction.rits.forEach((rit) => {
        this.newTransaction.item_prices += rit.total_price;
      });
      let sackFee = this.newTransaction.sack * 1500;
      this.newTransaction.total_price =
        this.newTransaction.item_prices +
        this.newTransaction.ongkir -
        this.newTransaction.discount +
        this.newTransaction.tb +
        this.newTransaction.tw +
        this.newTransaction.thr +
        this.newTransaction.other +
        sackFee;
    },
    removeRit(index) {
      this.newTransaction.rits.splice(index, 1);
      this.updateTotalPrice();
    },
    filterRit() {
      if (this.ritQuery == "") {
        this.filteredRits = this.rits.filter((rit) => {
          return rit.tonnage_left > 0;
        });
      } else {
        this.filteredRits = this.rits.filter((rit) => {
          return (
            rit.item.code.toLowerCase().includes(this.ritQuery.toLowerCase()) &&
            rit.tonnage_left > 0
          );
        });
      }
    },
    getAllRits: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/rit/get_all_stock")
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
    getRemaningSacks: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/transaction/get_remaining_sack")
        .then((data) => {
          this.sacks = data.data.data.results;
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
    createData() {
      this.updateTotalPrice();
      this.newTransaction.old_id = this.id;
      if (this.$route.query.isForcedRevision) {
        const instance = axios.create({
          baseURL: this.url,
          headers: { Authorization: "Bearer " + localStorage["access_token"] },
        });
        instance
          .post("admin/transaction/" + this.newTransaction.old_id, {
            _method: "PATCH",
            new_transaction: this.newTransaction,
          })
          .then((data) => {
            console.log("test " + JSON.stringify(data));
            const baseUrl = window.location.origin;
            window.open(
              baseUrl +
                "/admin/rit/nota/mini_nota/" +
                data.data.data.results.id,
              "_blank"
            );
            window.location.assign(baseUrl + "/admin/rit/jual_barang");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const instance = axios.create({
          baseURL: this.url,
          headers: { Authorization: "Bearer " + localStorage["access_token"] },
        });
        instance
          .post("admin/transaction", this.newTransaction)
          .then((data) => {
            console.log("test " + JSON.stringify(data));
            const baseUrl = window.location.origin;
            window.open(
              baseUrl +
                "/admin/rit/nota/mini_nota/" +
                data.data.data.results.id,
              "_blank"
            );
            window.location.assign(baseUrl + "/admin/rit/jual_barang");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    getTransaction: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/transaction/" + this.id)
        .then((data) => {
          let oldTransaction = data.data.data.results;
          this.newTransaction.customer_id = oldTransaction.customer.id;
          this.newTransaction.ongkir = oldTransaction.ongkir;
          this.newTransaction.vehicle_id = oldTransaction.trip?.vehicle_id;
          this.newTransaction.allowance = oldTransaction.trip?.allowance;
          this.newTransaction.gas = oldTransaction.trip?.gas;
          this.newTransaction.toll = oldTransaction.trip?.toll;
          this.newTransaction.rits = oldTransaction.rits.map((item) => {
            return {
              item: item.rit,
              tonnage: item.tonnage,
              real_tonnage: item.tonnage_left,
              masak: item.masak,
              price: item.item_price,
              total_price: item.total_price,
            };
          });
          this.newTransaction.tb = oldTransaction.tb;
          this.newTransaction.tw = oldTransaction.tw;
          this.newTransaction.thr = oldTransaction.thr;
          this.newTransaction.sack = oldTransaction.sack;
          this.newTransaction.sack_free = oldTransaction.sack_free;
          this.newTransaction.other = oldTransaction.other;
          this.newTransaction.item_prices = oldTransaction.item_price;
          this.newTransaction.discount = oldTransaction.discount;
          this.newTransaction.total_price = oldTransaction.total_price;
          setTimeout(() => {
            this.selectCustomer(this.newTransaction.customer_id);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getRemaningSacks();
    this.getAllCustomers();
    this.getAllVehicles();
    this.getAllRits();
    if (this.id) {
      this.getTransaction();
    }
  },
  data() {
    return {
      isLoading: false,
      showConfirmationPopup: false,
      sacks: 0,
      rits: [],
      filteredRits: [],
      ritQuery: "",
      selectedCustomer: {
        id: null,
        nik: null,
        name: null,
        nickname: null,
        address: null,
        phone: null,
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
        sack_free: null,
        other: null,
        item_prices: null,
        discount: null,
        total_price: null,
        old_id: null,
        date: new Date(new Date().setHours(7, 0, 0, 0))
          .toISOString()
          .substr(0, 10),
      },
      money_brought: null,
      calculator: {
        rit: { sell_price: 0 },
        tonnage: null,
        price: null,
      },
    };
  },
};
</script>

<style></style>

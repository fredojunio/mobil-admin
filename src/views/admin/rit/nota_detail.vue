<template>
  <div class="flex items-center justify-center">
    <table class="text-xs">
      <tr>
        <td class="text-lg text-center" colspan="5">NOTA PENJUALAN</td>
      </tr>
      <tr>
        <td colspan="2">TOKO KEDELAI MAMA JAYA BAHAGIA</td>
        <td></td>
        <td>HARI:</td>
        <td>{{ dayOfWeek }}</td>
      </tr>
      <tr>
        <td colspan="2">KALIJATEN Gg. II/12 SEPANJANG</td>
        <td></td>
        <td>TANGGAL:</td>
        <td>{{ currentDate }}</td>
      </tr>
      <tr>
        <td>SIDOARJO .</td>
        <td></td>
        <td></td>
        <td>NAMA:</td>
        <td>{{ transaction.customer.name }}</td>
      </tr>
      <tr>
        <td>TELP: 081281371762</td>
        <td></td>
        <td></td>
        <td>ALAMAT:</td>
        <td>{{ transaction.customer.address }}</td>
      </tr>
      <tr class="border-y-2 border-black">
        <td>NO</td>
        <td width="150">NAMA BARANG</td>
        <td width="100">BANYAK</td>
        <td>HARGA</td>
        <td>JUMLAH</td>
      </tr>
      <tr v-for="(rit, index) in transaction.rits" :key="rit.id">
        <td>{{ index + 1 }}</td>
        <td>{{ rit.rit.item.code }}</td>
        <td>{{ formatNumber(rit.tonnage * rit.masak) }}</td>
        <td>{{ formatNumber(rit.item_price) }}</td>
        <td>{{ formatNumber(rit.total_price) }}</td>
      </tr>
      <tr>
        <td>{{ transaction.rits.length + 1 }}</td>
        <td>TABUNGAN</td>
        <td>1</td>
        <td>
          {{ formatNumber(transaction.tw + transaction.tb + transaction.thr) }}
        </td>
        <td>
          {{ formatNumber(transaction.tw + transaction.tb + transaction.thr) }}
        </td>
      </tr>
      <tr>
        <td>{{ transaction.rits.length + 2 }}</td>
        <td>SAK</td>
        <td>{{ formatNumber(transaction.sack + transaction.sack_free) }}</td>
        <td>{{ formatNumber(transaction.sack_price) }}</td>
        <td>{{ formatNumber(transaction.sack_price) }}</td>
      </tr>
      <tr>
        <td>{{ transaction.rits.length + 3 }}</td>
        <td>LAIN-LAIN</td>
        <td>1</td>
        <td>{{ formatNumber(transaction.other) }}</td>
        <td>{{ formatNumber(transaction.other) }}</td>
      </tr>
      <tr>
        <td>{{ transaction.rits.length + 4 }}</td>
        <td>ONGKOS KIRIM</td>
        <td>1</td>
        <td>{{ formatNumber(transaction.ongkir) }}</td>
        <td>{{ formatNumber(transaction.ongkir) }}</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
      <tr class="border-t-2 border-black">
        <td>TANDA TERIMA</td>
        <td>HORMAT KAMI</td>
        <td></td>
        <td>TOTAL</td>
        <td>{{ formatNumber(transaction.total_price) }}</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>DISKON</td>
        <td>{{ formatNumber(transaction.discount) }}</td>
      </tr>
      <tr>
        <td class="font-bold">Nomor Resmi Gudang/Toko Hubungi</td>
        <td></td>
        <td></td>
        <td>BAYAR</td>
        <td>
          {{ formatNumber(getTotalPayments()) }}
        </td>
      </tr>
      <tr>
        <td class="font-bold">+62 896-8883-7888</td>
        <td></td>
        <td></td>
        <td>KURANG</td>
        <td>
          {{ formatNumber(transaction.total_price - getTotalPayments()) }}
        </td>
      </tr>
    </table>
  </div>
  <!-- <div class="flex items-center justify-center mt-12">
    <button
    @click="printPage()"
      class="gap-x-2 inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
    >
      <Icon icon="uil:print" class="w-6 h-6 text-white" />
      Print
    </button>
  </div> -->
</template>

<script setup>
import axios from "axios";
</script>
<script>
export default {
  props: ["id"],
  created() {
    this.getTransaction();
  },
  computed: {
    dayOfWeek() {
      const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];
      const getDate = new Date(this.transaction.created_at);
      return days[getDate.getDay()];
    },
    currentDate() {
      const options = { day: "numeric", month: "numeric", year: "numeric" };
      return new Date(this.transaction.created_at).toLocaleDateString(
        "id-ID",
        options
      );
    },
  },
  methods: {
    printPage() {
      window.print();
    },
    getTransaction: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/transaction/" + this.id)
        .then((data) => {
          this.transaction = data.data.data.results;
          setTimeout(() => {
            this.printPage();
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTotalPayments() {
      return this.transaction.payments.reduce((total, pay) => {
        return total + pay.amount;
      }, 0);
    },
  },
  data() {
    return {
      transaction: null,
    };
  },
};
</script>

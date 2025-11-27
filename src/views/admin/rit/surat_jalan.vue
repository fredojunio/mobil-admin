<template>
  <div class="flex items-center justify-center">
    <table class="text-xs">
      <tr>
        <td class="text-lg text-center underline" colspan="5">SURAT JALAN</td>
      </tr>
      <tr>
        <td colspan="2"></td>
        <td></td>
        <td>SIDOARJO, {{ currentDate }}</td>
      </tr>
      <tr>
        <td colspan="2">KEPADA</td>
        <td></td>
      </tr>
      <tr>
        <td>{{trip.branches[0].name}}</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>{{trip.branches[0].address}}</td>
        <td></td>
        <td>NOPOL: <span class="font-bold">{{trip.plate_number}}</span></td>
        <td></td>
      </tr>
      <tr class="border border-black">
        <td class="border-x border-black">BANYAK</td>
        <td class="border-x border-black" width="300" colspan="3">
          KETERANGAN
        </td>
      </tr>
      <tr class="border border-black" v-for="branch in trip.branches" :key="branch.id">
        <td class="border-x border-black">{{ formatNumber(branch.sent_tonnage) }} KG</td>
        <td class="border-x border-black" colspan="3">{{ branch.rit.item.code }}</td>
      </tr>
      <tr>
        <td height="25"></td>
      </tr>
      <tr class="border border-black">
        <td width="250" colspan="2" class="text-center border border-black">
          PENERIMA
        </td>
        <td width="250" colspan="2" class="text-center border border-black">
          PENGIRIM
        </td>
      </tr>
      <tr class="border-x border-t border-black">
        <td
          width="250"
          height="60"
          colspan="2"
          class="text-center border-x border-black"
        ></td>
        <td
          width="250"
          height="60"
          colspan="2"
          class="text-center border-x border-black"
        ></td>
      </tr>
      <tr class="border-x border-b border-black">
        <td
          width="250"
          height="20"
          colspan="2"
          class="text-center border-x border-black"
        ></td>
        <td
          width="250"
          height="20"
          colspan="2"
          class="text-center border-x border-black"
        >
          UD MAMA JAYA BAHAGIA
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
    this.getTrip();
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
      const today = new Date();
      return days[today.getDay()];
    },
    currentDate() {
      const options = { day: "numeric", month: "numeric", year: "numeric" };
      return new Date().toLocaleDateString("id-ID", options);
    },
  },
  methods: {
    printPage() {
      window.print();
    },
    getTrip: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/trip/" + this.id + "/surat_jalan")
        .then((data) => {
          this.trip = data.data.data.results;
          setTimeout(() => {
            this.printPage();
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data() {
    return {
      trip: null,
    };
  },
};
</script>

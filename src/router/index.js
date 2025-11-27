import { createRouter, createWebHistory } from "vue-router";

import Login from "/src/views/Login.vue";

//Barang
import BarangIndex from "/src/views/admin/barang/index.vue";

//Mobil
import MobilIndex from "/src/views/admin/mobil/index.vue";

//Rit
import RitIndex from "/src/views/admin/rit/index.vue";
import RitJualBarang from "/src/views/admin/rit/jual_barang.vue";
import RitNota from "/src/views/admin/rit/nota.vue";
import RitNotaDetail from "/src/views/admin/rit/nota_detail.vue";
import RitMiniNotaDetail from "/src/views/admin/rit/mini_nota.vue";
import RitSuratJalan from "/src/views/admin/rit/surat_jalan.vue";

//Customer
import CustomerIndex from "/src/views/admin/customer/index.vue";

//Finance
import FinanceIndex from "/src/views/admin/finance/index.vue";
import FinanceRit from "/src/views/admin/finance/rit.vue";
import FinancePemasukan from "/src/views/admin/finance/pemasukan.vue";
import FinanceCashback from "/src/views/admin/finance/cashback.vue";

//Kendaraan
import KendaraanIndex from "/src/views/admin/kendaraan/index.vue";

//Laporan
import LaporanIndex from "/src/views/admin/laporan/index.vue";
import LaporanBulanan from "/src/views/admin/laporan/bulanan.vue";

//Owner
import OwnerIndex from "/src/views/admin/owner/index.vue";
import OwnerGaji from "/src/views/admin/owner/gaji.vue";
import OwnerPemasukan from "/src/views/admin/owner/pemasukan.vue";
import OwnerJualBarang from "/src/views/admin/owner/jual_barang.vue";
import OwnerLabaRugi from "/src/views/admin/owner/laba_rugi.vue";

//Routes
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/admin/barang",
    name: "BarangIndex",
    component: BarangIndex,
    meta: {
      title: "Barang - Index",
    },
  },
  {
    path: "/admin/mobil",
    name: "MobilIndex",
    component: MobilIndex,
    meta: {
      title: "Mobil - Index",
    },
  },
  {
    path: "/admin/rit",
    name: "RitIndex",
    component: RitIndex,
    meta: {
      title: "Rit - Index",
    },
  },
  {
    path: "/admin/rit/jual_barang/:id?",
    name: "RitJualBarang",
    component: RitJualBarang,
    props: true,
    meta: {
      title: "Rit - Jual Barang",
    },
  },
  {
    path: "/admin/rit/nota",
    name: "RitNota",
    component: RitNota,
    meta: {
      title: "Rit - Nota",
    },
  },
  {
    path: "/admin/rit/nota/detail/:id",
    name: "RitNotaDetail",
    component: RitNotaDetail,
    props: true,
    meta: {
      title: "Nota",
    },
  },
  {
    path: "/admin/rit/nota/mini_nota/:id",
    name: "RitMiniNotaDetail",
    component: RitMiniNotaDetail,
    props: true,
    meta: {
      title: "Nota",
    },
  },
  {
    path: "/admin/rit/surat_jalan/:id",
    name: "RitSuratJalan",
    component: RitSuratJalan,
    props: true,
    meta: {
      title: "Surat Jalan",
    },
  },
  {
    path: "/admin/customer",
    name: "CustomerIndex",
    component: CustomerIndex,
    meta: {
      title: "Customer - Index",
    },
  },
  {
    path: "/admin/finance",
    name: "FinanceIndex",
    component: FinanceIndex,
    meta: {
      title: "Finance - Index",
    },
  },
  {
    path: "/admin/finance/rit",
    name: "FinanceRit",
    component: FinanceRit,
    meta: {
      title: "Finance - Rit",
    },
  },
  {
    path: "/admin/finance/pemasukan",
    name: "FinancePemasukan",
    component: FinancePemasukan,
    meta: {
      title: "Finance - Pemasukan",
    },
  },
  {
    path: "/admin/finance/cashback",
    name: "FinanceCashback",
    component: FinanceCashback,
    meta: {
      title: "Finance - Cashback",
    },
  },
  {
    path: "/admin/kendaraan",
    name: "KendaraanIndex",
    component: KendaraanIndex,
    meta: {
      title: "Kendaraan - Index",
    },
  },
  {
    path: "/admin/laporan",
    name: "LaporanIndex",
    component: LaporanIndex,
    meta: {
      title: "Laporan - Index",
    },
  },
  {
    path: "/admin/laporan/bulanan",
    name: "LaporanBulanan",
    component: LaporanBulanan,
    meta: {
      title: "Laporan - Bulanan",
    },
  },
  {
    path: "/admin/owner",
    name: "OwnerIndex",
    component: OwnerIndex,
    meta: {
      title: "Owner - Index",
    },
  },
  {
    path: "/admin/owner/gaji",
    name: "OwnerGaji",
    component: OwnerGaji,
    meta: {
      title: "Owner - Gaji",
    },
  },
  {
    path: "/admin/owner/jual_barang",
    name: "OwnerJualBarang",
    component: OwnerJualBarang,
    meta: {
      title: "Owner - Jual Barang",
    },
  },
  {
    path: "/admin/owner/laba_rugi",
    name: "OwnerLabaRugi",
    component: OwnerLabaRugi,
    meta: {
      title: "Owner - Laba Rugi",
    },
  },
  {
    path: "/admin/owner/pemasukan",
    name: "OwnerPemasukan",
    component: OwnerPemasukan,
    meta: {
      title: "Owner - Pemasukan",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

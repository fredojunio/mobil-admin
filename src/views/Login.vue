<template>
  <div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 class="text-center text-3xl font-semibold">Halaman Admin</h1>
      <!-- <h2 class="mt-6 text-center text-2xl font-semibold text-gray-900">
          Halaman Admin
        </h2> -->
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Alamat E-Mail
            </label>
            <div class="mt-1">
              <input
                v-model="userEmail"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1">
              <input
                @keyup.enter="login()"
                v-model="userPassword"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              v-if="!isSubmitted"
              @click.once="submitLogin()"
              type="button"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
            <div
              v-else
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <div class="animate-spin">
                <Icon icon="fa:circle-o-notch" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Icon } from "@iconify/vue";

export default {
  data() {
    return {
      isSubmitted: false,
      userEmail: null,
      userPassword: null,
    };
  },
  methods: {
    submitLogin: function () {
      if (this.userEmail && this.userPassword) {
        this.isSubmitted = true;
        let self = this;
        axios
          .post(this.url + "login", {
            email: this.userEmail,
            password: this.userPassword,
          })
          .then((data) => {
            localStorage["access_token"] = data.data.data.results.access_token;
            localStorage["user_id"] = data.data.data.results.user_id;
            localStorage["role_id"] = data.data.data.results.role_id;
            self.$router.push("/admin/rit");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("E-Mail / Password belum di isi!");
      }
    },
  },
  components: { Icon },
};
</script>

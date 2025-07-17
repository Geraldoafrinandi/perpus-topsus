<template>
  <header class="app-header" :class="[
    { 'scrolled-header': isScrolled },
    { 'not-home': isNotHome }
  ]">
    <div class="header-container">
      <div class="logo">
        <img src="https://vuejs.org/images/logo.png" alt="Logo Perpustakaan" />
        <span class="logo-text">PerpusKita</span>
      </div>
      <nav class="main-nav">
        <router-link to="/" class="nav-link" :class="{ active: isHome }">
          Beranda
        </router-link>
        <router-link to="/buku" class="nav-link" :class="{ active: isBooks }">
          Buku
        </router-link>
        <router-link to="/tentang" class="nav-link" :class="{ active: isTentang }">
          Tentang
        </router-link>
        <!-- <router-link to="/kontak" class="nav-link" :class="{ active: isKontak }">
          Kontak
        </router-link> -->

      </nav>
      <div class="header-actions">
        <a href="/login" class="login-link" :class="{ active: isLogin}">Login</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isScrolled: false
    }
  },
  computed: {
    isNotHome() {
      return this.$route.path !== '/'
    },
    isHome() {
      return this.$route.path === '/'
    },
    isBooks() {
      return this.$route.path.startsWith('/buku')
    },
    isTentang() {
      return this.$route.path.startsWith('/tentang')
    },
    isLogin() {
      return this.$route.path.startsWith('/login')
    }
  },

  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 10
    }
  },
  watch: {
    $route() {
      this.handleScroll()
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

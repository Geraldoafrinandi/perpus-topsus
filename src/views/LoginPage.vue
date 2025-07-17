<template>
  <div class="login-page">
    <div class="login-visual">
      <div class="visual-content">
        <h2>PerpusKita</h2>
        <p>Gerbang Anda menuju ribuan cerita dan pengetahuan tak terbatas.</p>
      </div>
    </div>

    <div class="login-form-wrapper">
      <div class="login-form">
        <h1 class="form-title">Selamat Datang Kembali</h1>
        <p class="form-subtitle">Silakan masuk untuk melanjutkan.</p>
        
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" v-model="email" class="form-input" placeholder="contoh@email.com" required>
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" v-model="password" class="form-input" placeholder="••••••••" required>
          </div>
          <div class="form-options">
            <a href="#" class="forgot-password">Lupa password?</a>
          </div>
          <button type="submit" class="form-button">Login</button>
        </form>

        <p class="signup-link">
          Belum punya akun? <router-link to="/daftar">Daftar di sini</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
     
      console.log('Login attempt:', {
        email: this.email,
        password: this.password
      });
      alert('Mencoba login dengan email: ' + this.email);
      
    }
  }
}
</script>
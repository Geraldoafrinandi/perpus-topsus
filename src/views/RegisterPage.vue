<template>
  <div class="auth-page">
    <div class="auth-visual">
      <div class="visual-content">
        <h2>PerpusKita</h2>
        <p>Bergabunglah dengan komunitas pembaca terbesar dan mulai petualangan literasi Anda.</p>
      </div>
    </div>

    <div class="auth-form-wrapper">
      <div class="auth-form">
        <h1 class="form-title">Buat Akun Baru</h1>
        <p class="form-subtitle">Mulai perjalanan literasi Anda bersama kami.</p>
        
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="fullName" class="form-label">Nama Lengkap</label>
            <input type="text" id="fullName" v-model="fullName" class="form-input" placeholder="Nama lengkap Anda" required>
          </div>
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" v-model="email" class="form-input" placeholder="contoh@email.com" required>
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" v-model="password" class="form-input" placeholder="Minimal 8 karakter" required>
          </div>
          <div class="form-group">
            <label for="confirmPassword" class="form-label">Konfirmasi Password</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-input" placeholder="Ulangi password" required>
          </div>
          
          <button type="submit" class="form-button">Buat Akun</button>
        </form>

        <p class="switch-page-link">
          Sudah punya akun? <router-link to="/login">Masuk di sini</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert('Password dan Konfirmasi Password tidak cocok!');
        return;
      }
      console.log('Register attempt:', {
        fullName: this.fullName,
        email: this.email,
      });
      alert('Akun berhasil dibuat untuk: ' + this.fullName);
      this.$router.push('/login');
    }
  }
}
</script>
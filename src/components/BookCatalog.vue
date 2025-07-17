<template>
  <section class="book-catalog">
    <h2 class="section-title">Buku Terpopuler Saat Ini</h2>

    <div class="book-grid">
      <router-link 
        v-for="(book, index) in books" 
        :key="book.id" 
        :to="'/buku/' + book.id" 
        class="book-card-link"
        :style="{ 'animation-delay': (index * 100) + 'ms' }"
      >
        <div class="book-card">
          <div class="card-image-container">
            <img :src="book.cover" :alt="book.title" class="book-cover" />
            <div class="image-overlay">
              <span class="overlay-button">Lihat Detail</span>
            </div>
          </div>
          <div class="card-content">
            <span class="book-item-category">{{ book.category }}</span>
            <h3 class="book-title">{{ book.title }}</h3>
            <p class="book-author">{{ book.author }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BookCatalog',
  data() {
    return {
      observer: null,
      books: [
        { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata', category: 'Fiksi', cover: 'https://simpus.mkri.id/uploaded_files/sampul_koleksi/original/Monograf//uploadedfiles/perpustakaan/11610-11613.jpg' },
        { id: 2, title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', category: 'Fiksi', cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1565658920i/1398034.jpg' },
        { id: 3, title: 'Negeri 5 Menara', author: 'Ahmad Fuadi',category: 'Fiksi', cover: 'https://s3-ap-southeast-1.amazonaws.com/ebook-previews/1682/10530/1.jpg' },
        { id: 4, title: 'Cantik Itu Luka', author: 'Eka Kurniawan', category: 'Fiksi', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFt3bi5k-0543-A3tf0fUXVr6D_R6kYHNusQ&s' },
        { id: 5, title: 'Perahu Kertas', author: 'Dee Lestari',  category: 'Fiksi', cover: 'https://cdn.gramedia.com/uploads/items/ID_MIZ2016MTH03PKER_C.jpg' },
        { id: 6, title: 'Ayat-Ayat Cinta', author: 'Habiburrahman El Shirazy', category: 'Fiksi', cover: 'https://www.gramedia.com/blog/content/images/2025/04/ayatayatcinta.jpg' },
        { id: 7, title: 'Selalu Ada Jalan Pulang', author: 'Karima Ifha', category: 'Fiksi', cover: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/97/MTA-146437441/reneluv_selalu_ada_ruang_untuk_pulang_buku_novel_by-_karima_ifha_-_penerbit_reneluv_full01_vkmkazji.jpg' },
        { id: 8, title: 'Senja di Mata Binang', author: 'Dhea Chandra', category: 'Fiksi', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV3SYePkctVzFJIFJU87ilMMxqOR5e-w4dQg&s' },
        { id: 9, title: 'Wujud Tanpa Suara', author: 'Nurul Izzah Andini', category: 'Fiksi', cover: 'https://deepublishstore.com/wp-content/uploads/2018/01/Wujud-Tanpa-Suara-Nurul-depan1.jpg' },
        { id: 10,title: 'Inikah Rasanya?', 'author': 'Sylvee Astri', category: 'Fiksi', cover: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//102/MTA-42569841/no_brand_inikah_rasanya_sebuah_novel_dari_sylvee_astri_novel_romance_novel_remaja_buku_original_asli_full01_qun0w4st.jpg' },
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      const options = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${index * 100}ms`;
            entry.target.classList.add('is-visible');
            this.observer.unobserve(entry.target);
          }
        });
      }, options);

      const cards = this.$el.querySelectorAll('.book-card-link');
      if (cards.length > 0) {
        cards.forEach(card => {
          this.observer.observe(card);
        });
      }
    });
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
};
</script>
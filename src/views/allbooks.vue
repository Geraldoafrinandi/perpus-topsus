<template>
  <div class="browse-page">
    <aside class="sidebar-filters">
      <div class="filter-group">
        <h3 class="filter-title">Cari Buku</h3>
        <input type="text" v-model="searchQuery" placeholder="Judul, penulis..." class="sidebar-search-input" />
      </div>
      <div class="filter-group">
        <h3 class="filter-title">Kategori</h3>
        <ul class="sidebar-category-list">
          <li v-for="category in categories" :key="category.value">
            <button @click="selectedCategory = category.value" :class="{ active: selectedCategory === category.value }"
              class="sidebar-category-button">
              {{ category.text }}
            </button>
          </li>
        </ul>
      </div>
    </aside>

    <main class="main-collection">
      <div class="page-header">
        <h1 class="page-title" style="text-align: center;">Koleksi Buku</h1>
        <!-- <p class="page-subtitle">Menampilkan {{ filteredBooks.length }} buku</p> -->
      </div>

      <transition-group name="book-list" tag="div" class="book-display-grid">
        <router-link v-for="book in paginatedBooks" :key="book.id" :to="'/buku/' + book.id" class="book-item">
          <div class="book-item-card">
            <img :src="book.cover" :alt="book.title" class="book-item-cover" />
            <div class="book-item-content">
              <span class="book-item-category">{{ book.category }}</span>
              <h4 class="book-item-title">{{ book.title }}</h4>
              <p class="book-item-author">oleh {{ book.author }}</p>
            </div>
          </div>
        </router-link>
      </transition-group>

      <div v-if="filteredBooks.length === 0" class="no-results">
        <p>Maaf, tidak ada buku yang cocok dengan kriteria Anda.</p>
      </div>

      <!-- PAGINATION  -->
      <div v-if="totalPages > 1" class="pagination-controls">
        <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button nav-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>Sebelumnya</span>
        </button>

        <div class="page-numbers">
          <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
            :class="{ active: currentPage === page }" class="pagination-button page-number">
            {{ page }}
          </button>
        </div>

        <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button nav-button">
          <span>Selanjutnya</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

    </main>
  </div>
</template>


<script>
export default {
  name: 'AllBooks',
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'all',
      itemsPerPage: 8,
      currentPage: 1,
      categories: [
        { text: 'Semua', value: 'all' },
        { text: 'Fiksi', value: 'Fiksi' },
        { text: 'Edukasi', value: 'Edukasi' },
        { text: 'Biografi', value: 'Biografi' },
        { text: 'Sastra', value: 'Sastra' },
      ],
      allBooks: [
        { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata', category: 'Fiksi', cover: 'https://upload.wikimedia.org/wikipedia/id/1/17/Laskar_Pelangi_film.jpg' },
        { id: 2, title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', category: 'Sastra', cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1565658920i/1398034.jpg' },
        { id: 3, title: 'Negeri 5 Menara', author: 'Ahmad Fuadi', category: 'Fiksi', cover: 'https://s3-ap-southeast-1.amazonaws.com/ebook-previews/1682/10530/1.jpg' },
        { id: 4, title: 'Cantik Itu Luka', author: 'Eka Kurniawan', category: 'Sastra', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-no59aLBrpCBiGi0gOrkg7f-krxxu9m6qKQ&s' },
        { id: 5, title: 'Perahu Kertas', author: 'Dee Lestari', category: 'Fiksi', cover: 'https://cdn.gramedia.com/uploads/items/ID_MIZ2016MTH03PKER_C.jpg' },
        { id: 6, title: 'Sebuah Seni untuk Bersikap Bodo Amat', author: 'Mark Manson', category: 'Edukasi', cover: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Sebuah-seni-untuk-bersikap-bodoh-amat.jpg' },
        { id: 7, title: 'Habibie & Ainun', author: 'B.J. Habibie', category: 'Biografi', cover: 'https://upload.wikimedia.org/wikipedia/id/7/74/Habibie_Ainun_Poster.jpg' },
        { id: 8, title: 'Filosofi Teras', author: 'Henry Manampiring', category: 'Edukasi', cover: 'https://ebooks.gramedia.com/ebook-covers/45496/image_highres/ID_FITE2018MTH12.jpg' },
        { id: 9, title: 'Gadis Kretek', author: 'Ratih Kumala', category: 'Sastra', cover: 'https://ebooks.gramedia.com/ebook-covers/6634/image_highres/GPU_GKRE2019MTH07GK.jpg' },
        { id: 10, title: 'Sapiens: Riwayat Singkat Umat Manusia', author: 'Yuval Noah Harari', category: 'Edukasi', cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1420585954l/23692271.jpg' },
        { id: 11, title: 'Hujan', author: 'Tere Liye', category: 'Fiksi', cover: 'https://www.gramedia.com/blog/content/images/2025/01/Hujan.png' },
        { id: 12, title: 'Steve Jobs', author: 'Walter Isaacson', category: 'Biografi', cover: 'https://tirtabuanamedia.co.id/wp-content/uploads/2023/05/STEVE-JOBS-THE-GEEK-MASTER-MIND.jpg' },
      ]
    };
  },
  computed: {
    filteredBooks() {
      if (!this.allBooks) return [];
      let books = this.allBooks;
      if (this.selectedCategory !== 'all') {
        books = books.filter(book => book.category === this.selectedCategory);
      }
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase().trim();
        books = books.filter(book =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
        );
      }
      return books;
    },
    totalPages() {
      return Math.ceil(this.filteredBooks.length / this.itemsPerPage);
    },
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredBooks.slice(startIndex, endIndex);
    }
  },
  methods: {
    goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
        window.scrollTo(0, 0);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        window.scrollTo(0, 0);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        window.scrollTo(0, 0);
      }
    }
  },
  watch: {
    filteredBooks() {
      this.currentPage = 1;
    }
  }
};
</script>

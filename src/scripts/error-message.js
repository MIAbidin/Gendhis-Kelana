// Membuat fungsi untuk menampilkan pesan kesalahan
const displayErrorMessage = (message) => {
  const errorMessage = document.createElement('div');
  errorMessage.textContent = message;
  errorMessage.classList.add('error-message'); // Tambahkan kelas CSS untuk gaya pesan kesalahan
  document.body.appendChild(errorMessage);
};

// Fungsi untuk menghapus pesan kesalahan
const removeErrorMessage = () => {
  const errorMessage = document.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
};

// Fungsi untuk mengecek koneksi internet
const checkInternetConnection = () => {
  const isOnline = navigator.onLine;
  if (!isOnline) {
    displayErrorMessage('Tidak ada koneksi internet. Mohon periksa koneksi Anda.');
  } else {
    removeErrorMessage();
  }
};

// Cek koneksi saat halaman dimuat
window.addEventListener('load', checkInternetConnection);

// Cek koneksi saat ada perubahan status koneksi
window.addEventListener('online', checkInternetConnection);
window.addEventListener('offline', checkInternetConnection);

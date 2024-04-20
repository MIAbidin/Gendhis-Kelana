const displayErrorMessage = (message) => {
  const errorMessage = document.createElement('div');
  errorMessage.textContent = message;
  errorMessage.classList.add('error-message');
  document.body.appendChild(errorMessage);
};

const removeErrorMessage = () => {
  const errorMessage = document.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
};

const checkInternetConnection = () => {
  const isOnline = navigator.onLine;
  if (!isOnline) {
    displayErrorMessage('Tidak ada koneksi internet. Mohon periksa koneksi Anda.');
  } else {
    removeErrorMessage();
  }
};

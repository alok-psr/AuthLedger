
const createToastContainer = () => {
  let container = document.getElementById('toast-container');
  if (container) {
    return container;
  }
  container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
};

export const showToast = (message, type = 'info') => {
  const toastContainer = createToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
};

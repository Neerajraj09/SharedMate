import { registerSW } from 'virtual:pwa-register';

registerSW({
  immediate: true,
  onRegisteredSW(swUrl, registration) {
    console.log('SharedMate Service Worker registered:', swUrl);

    if (registration) {
      console.log('Service Worker registration:', registration);
    }
  },
  onRegisterError(error) {
    console.error('Service Worker registration failed:', error);
  }
});
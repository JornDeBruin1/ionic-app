import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { initializeFirebase } from './firebase-initialization'; // Adjust the path as needed

if (environment.production) {
  enableProdMode();
}

(async () => {
  // Initialize Firebase
  await initializeFirebase();

  // Define Ionic custom elements
  defineCustomElements(window);

  // Bootstrap the Angular application
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
})();
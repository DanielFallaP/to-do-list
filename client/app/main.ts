import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { platformBrowser }    from '@angular/platform-browser';

platformBrowserDynamic().bootstrapModule(AppModule);

import { LoggerService } from './shared/services/logger.service';
import { AppRoutingProviders, AppRouting } from './app.routing';
import { MedicineModule } from './medicine/medicine.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting,
    MedicineModule
  ],
  providers: [
    AppRoutingProviders
    , { provide: 'ILoggerService', useClass: LoggerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

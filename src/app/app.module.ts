import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { App } from './app.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { ProductoListComponent } from './components/producto-list/producto-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ClientShopComponent } from './components/client-shop/client-shop.component';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductoFormComponent,
    ProductoListComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    ClientShopComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }

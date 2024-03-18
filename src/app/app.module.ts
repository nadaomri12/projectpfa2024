import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule,HttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductComponent } from './product/product.component';
import { withFetch, HttpFeature, HttpFeatureKind } from '@angular/common/http';
import { ProduitdetailComponent } from './produitdetail/produitdetail.component';
import { CartComponent } from './cart/cart.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProdComponent } from './prod/prod.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SearchprodComponent } from './searchprod/searchprod.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgToastModule, NgToastService } from 'ng-angular-popup';

import { ToastrModule } from 'ngx-toastr';
import { ContactComponent } from './contact/contact.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { UpdateprodComponent } from './updateprod/updateprod.component';
import { CategorieComponent } from './categorie/categorie.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { UpdatecategoryComponent } from './updatecategory/updatecategory.component';
import { ClientsComponent } from './clients/clients.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ContactadminComponent } from './contactadmin/contactadmin.component';
import { AuthAdminlayoutComponent } from './auth-adminlayout/auth-adminlayout.component';
import { LayoutModule } from './layout/layout.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
 
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ProductComponent,
    ProduitdetailComponent,
    CartComponent,
    NavbarComponent,
    ProdComponent,
    TopbarComponent,
    SearchprodComponent,
    SignInComponent,
    SignUpComponent,
  
    ContactComponent,
    NewsletterComponent,
    AddproductComponent,
    ProductsAdminComponent,
    UpdateprodComponent,
    CategorieComponent,
    AddcategoryComponent,
    UpdatecategoryComponent,
    ClientsComponent,
    TestimonialComponent,
    ContactadminComponent,
    AuthAdminlayoutComponent,
    DashboardComponent,
    OrdersComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
   SlickCarouselModule,
    ReactiveFormsModule,

    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(), // Ajoutez ToastrModule.forRoot() dans les imports de votre module principal

    ReactiveFormsModule,
    LayoutModule ,
    NgToastModule // Ajoutez cette ligne

   
    
  ],
  providers: [
    provideClientHydration(),
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

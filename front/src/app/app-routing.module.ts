import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'node:path';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ProduitdetailComponent } from './produitdetail/produitdetail.component';
import { CartComponent } from './cart/cart.component';
import { SearchprodComponent } from './searchprod/searchprod.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
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
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { FaqComponent } from './faq/faq.component';
import { AdminFaqComponent } from './admin-faq/admin-faq.component';
const routes: Routes = [

 {path:'product',component: ProductComponent},
 { path: 'detailproduit/:id', component: ProduitdetailComponent },
 {path:'cart',component:CartComponent},
 {path:'searchprod/:nameprod', component:SearchprodComponent},
 {path:'login',component:SignInComponent},
 {path:'register',component:SignUpComponent},
 {path:'contact',component:ContactComponent},
 {path:'review',component:TestimonialComponent},
 {path:'faq',component:FaqComponent},

 {path:'authadmin',component:AuthAdminlayoutComponent},
 {path:'',component:HomeComponent},

{
  path: 'admin',

  children: [
  {path:'dashboard',component:DashboardComponent},
    { path: 'addproduct', component: AddproductComponent },
    {path:'faq',component:AdminFaqComponent},

    { path: 'addcategory', component: AddcategoryComponent },
    { path: 'updatecategory/:id', component: UpdatecategoryComponent },
    { path: 'contactadmin', component: ContactadminComponent },
    { path: 'newsletter', component: NewsletterComponent },
    { path: 'productaadmin', component: ProductsAdminComponent },
    { path: 'updateproduct/:id', component: UpdateprodComponent },
    { path: 'categorie', component: CategorieComponent },
    { path: 'aboutclient', component: ClientsComponent },
    {path:'orders',component:OrdersComponent}
  ]
}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }

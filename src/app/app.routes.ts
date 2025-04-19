import { GuardsCheckEnd, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { adminGuard } from './Guards/Admin/admin.guard';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { UserEditComponent } from './admin/user-edit/user-edit.component';
import { ProductManagementComponent } from './admin/product-management/product-management.component';
import { EditProductsComponent } from './admin/edit-products/edit-products.component';
import { AddProductComponent } from './admin/add-product/add-product.component';

export const routes: Routes = [
  { path: '', component: HomeComponent,title:'Home'},
  {
    path: 'admin',
    component: AdminLayoutComponent, title:'Admin',canActivate:[adminGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent,title:'Dashboard' },
      { path: 'Users', component:UserManagementComponent,title:'Users-management',
        children:[
          {path:'edit/:id',component:UserEditComponent,title:'Edit'}
        ]
      },
      {path:'Products',component:ProductManagementComponent,title:'Products-managment',
        children:[
          {path:'edit/:id',component:EditProductsComponent,title:'Edit'},
          {path:'add', component:AddProductComponent, title:'Add'}
        ]
      }
    ],
    
  },
  { path: 'product/:id', component: ProductDetailsComponent,title:'Product'},
  { path: 'login', component: LogInComponent,title:'Login' },
  { path: 'products', component: ProductCartComponent },
  { path: 'cart', component: CartComponent , title:'Cart' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent , title:'Sign-Up' },
  { path: 'contact', component: ContactComponent,title:'Conatact Us' },
  { path: 'wishlist', component: WishlistComponent,title:'Wishlist'},
  { path: 'about', component: AboutComponent , title:'About Us' },
  { path: 'not-found', component: NotFoundComponent,title:'404'},
  { path: '**', redirectTo: 'not-found' },
];

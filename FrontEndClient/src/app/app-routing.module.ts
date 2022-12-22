import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleEditComponent } from './vehicles/vehicle-edit.component';
import { AddressesComponent } from './addresses/addresses.component';
import { LoginComponent } from './auth/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'vehicles', component: VehiclesComponent, canActivate: [AuthGuard] },
  { path: 'vehicle/:id', component: VehicleEditComponent },
  { path: 'vehicle', component: VehicleEditComponent },
  { path: 'addresses', component: AddressesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

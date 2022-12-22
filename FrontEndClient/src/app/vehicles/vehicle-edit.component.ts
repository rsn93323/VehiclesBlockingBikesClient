import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { environment } from './../../environments/environment';

import { Vehicle } from './vehicle';
import { Address } from './../addresses/address';

@Component({
selector: 'app-vehicle-edit',
templateUrl: './vehicle-edit.component.html',
styleUrls: ['./vehicle-edit.component.scss']
})
export class VehicleEditComponent implements OnInit {

// the view title
title?: string;

// the form model
form!: FormGroup;

// the city object to edit
vehicle?: Vehicle;

// the vehicle object id, as fetched from the active route:
// It's NULL when we're adding a new vehicle,
// and not NULL when we're editing an existing one.
id?: number;

// the countries array for the select
addresses?: Address[];

constructor(
private activatedRoute: ActivatedRoute,
private router: Router,
private http: HttpClient) {
}
ngOnInit() {
this.form = new FormGroup({
type: new FormControl(''),
state: new FormControl(''),
vehicleMovement: new FormControl(''),
addressId: new FormControl('')
});

this.loadData();
}

loadData() {

  // load countries
  this.loadAddresses();

// retrieve the ID from the 'id' parameter
var idParam = this.activatedRoute.snapshot.paramMap.get('id');
this.id = idParam ? +idParam : 0;
if (this.id) {
  // EDIT MODE


// fetch the vehicle from the server
var url = environment.baseUrl + 'api/Vehicles/' + this.id;
this.http.get<Vehicle>(url).subscribe(result => {
this.vehicle = result;
this.title = "Edit - " + this.vehicle.type;

// update the form with the vehicle value
this.form.patchValue(this.vehicle);
}, error => console.error(error));
}
else {
  // ADD NEW MODE

  this.title = "Add a new Vehicle blocking street";
  }
}



loadAddresses() {
  // fetch all the countries from the server
  var url = environment.baseUrl + 'api/Addresses';
  var params = new HttpParams()
  .set("pageIndex", "0")
  .set("pageSize", "9999")
  .set("sortColumn", "location");

  this.http.get<any>(url, { params }).subscribe(result => {
  this.addresses = result.data;
  }, error => console.error(error));
  }


onSubmit() {
  var vehicle = (this.id) ? this.vehicle : <Vehicle>{};
if (vehicle) {
vehicle.type = this.form.controls['type'].value;
vehicle.state = this.form.controls['state'].value;
vehicle.vehicleMovement = this.form.controls['vehicleMovement'].value;
vehicle.addressId = +this.form.controls['addressId'].value;

if (this.id) {
  // EDIT mode

var url = environment.baseUrl + 'api/Vehicles/' + vehicle.id;
this.http
.put<Vehicle>(url, vehicle)
.subscribe(result => {

console.log("Vehicle " + vehicle!.id + " has been updated.");

// go back to vehicles view
this.router.navigate(['/vehicles']);
}, error => console.error(error));
}
else {
  // ADD NEW mode
  var url = environment.baseUrl + 'api/Vehicles';
  this.http
  .post<Vehicle>(url, vehicle)
  .subscribe(result => {

    console.log("Vehicle " + result.id + " has been created.");

    // go back to vehicles view
    this.router.navigate(['/vehicles']);
        }, error => console.error(error));
      }
    }
  }
}

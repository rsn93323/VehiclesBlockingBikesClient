import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Vehicle } from './vehicle';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
selector: 'app-vehicles',
templateUrl: './vehicles.component.html',
styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'type', 'state', 'vehicleMovement'];

public vehicles!: MatTableDataSource<Vehicle>;

defaultPageIndex: number = 0;
defaultPageSize: number = 10;
public defaultSortColumn: string = "type";
public defaultSortOrder: "asc" | "desc" = "asc";

defaultFilterColumn: string = "type";
filterQuery?:string;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

constructor(private http: HttpClient) {
}
ngOnInit() {
  this.loadData();
}

loadData(query?: string) {
  var pageEvent = new PageEvent();
  pageEvent.pageIndex = this.defaultPageIndex;
  pageEvent.pageSize = this.defaultPageSize;
  this.filterQuery = query;
  this.getData(pageEvent);
  }

getData(event: PageEvent) {
  var url = environment.baseUrl + 'api/Vehicles';
  var params = new HttpParams()
  .set("pageIndex", event.pageIndex.toString())
  .set("pageSize", event.pageSize.toString())
  .set("sortColumn", (this.sort)
  ? this.sort.active
  : this.defaultSortColumn)
  .set("sortOrder", (this.sort)
  ? this.sort.direction
  : this.defaultSortOrder);


  if (this.filterQuery) {
    params = params
    .set("filterColumn", this.defaultFilterColumn)
    .set("filterQuery", this.filterQuery);
  }
  this.http.get<any>(url, { params })
  .subscribe(result => {
  this.paginator.length = result.totalCount;
  this.paginator.pageIndex = result.pageIndex;
  this.paginator.pageSize = result.pageSize;
  this.vehicles = new MatTableDataSource<Vehicle>(result.data);
  }, error => console.error(error));
  }
}


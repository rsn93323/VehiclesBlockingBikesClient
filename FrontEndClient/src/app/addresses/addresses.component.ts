import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from './../../environments/environment';
import { Address } from './address';

@Component({
selector: 'app-addresses',
templateUrl: './addresses.component.html',
styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
public displayedColumns: string[] = ['id', 'location', 'lat', 'lon'];
public addresses!: MatTableDataSource<Address>;

defaultPageIndex: number = 0;
defaultPageSize: number = 10;
public defaultSortColumn: string = "location";
public defaultSortOrder: "asc" | "desc" = "asc";

defaultFilterColumn: string = "location";
filterQuery?: string;

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
      var url = environment.baseUrl + 'api/Addresses';
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
    this.addresses = new MatTableDataSource<Address>(result.data);
    }, error => console.error(error));
  }
}

import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
imports: [
MatButtonModule,
MatIconModule,
MatToolbarModule,
MatTableModule,
MatFormFieldModule,
ReactiveFormsModule,
MatInputModule,
MatPaginatorModule,
MatSortModule,
MatSelectModule,
],
exports: [
MatButtonModule,
MatIconModule,
MatToolbarModule,
MatTableModule,
MatFormFieldModule,
ReactiveFormsModule,
MatInputModule,
MatPaginatorModule,
MatSortModule,
MatSelectModule
]
})
export class AngularMaterialModule { }

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddInventoryComponent } from '../add-inventory/add-inventory.component';
import { AdminDashboardService } from '../services/admin-dashboard.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor( @Inject(MAT_DIALOG_DATA) public dialogData: any , public inventoryService: AdminDashboardService, public dialog: MatDialog, public dialogRef: MatDialogRef<AddInventoryComponent>) { }
  displayedColumns: string[] = ['itemName', 'description', 'price', 'quality', 'itemsLeft', 'actions'];
  dataSource: MatTableDataSource<any> ;

  public length: number;
  public pageSize = 5;
  public pageSizeOptions = [5, 10, 25, 100];
  public currentPage: number;
  public sortDataSource: any;
  public InventoryArr = [];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit(): void {
   this.bindTableData();
  }
 bindTableData() {
   // tslint:disable-next-line:no-debugger
   debugger;
  // tslint:disable-next-line:align
  this.inventoryService.getInventoryAPI().subscribe(
    res => {
      console.log('response', res);
      this.InventoryArr = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    // this.dataSource.p
    }
  );
 }
  nextPageChange = (event: any) => {
    this.currentPage = event;
    this.iterator();
  }


  iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.sortDataSource.slice(start, end);
    // this.dataSource = part;
    this.dataSource = new MatTableDataSource(part);

  }

  deleteInventory(deleteRecord) {
    this.inventoryService.deleteInventoryAPI(deleteRecord.id).subscribe(
      res => {
        this.bindTableData();
      });
  }

  changePageSize(event) {
    this.pageSize = event.pageSize;
  }
  addNewInventory(isEditEnable, editRowData) {
    const dialogRef = this.dialog.open(AddInventoryComponent, {
      width: '550px',
      data: {idGenerate: this.InventoryArr.length, isEditEnable, editRowData}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.bindTableData();
      this.dialogRef.close();
    });
  }
}

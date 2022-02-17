import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminDashboardService } from '../services/admin-dashboard.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private toastr: ToastrService, public dialog: MatDialog, public dialogRef: MatDialogRef<AddInventoryComponent>, public inventoryService: AdminDashboardService,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  // addNewInventoryObj: {
  public id = 0;
   public  itemNameVal = '';
   public descriptionVal =  '';
   public priceVal =  0;
   public qualityVal =  0;
   public itemsLeftVal =  0;
   public enableErrorMesage = false;
   public errorMessage = '';
  // };

  ngOnInit(): void {
    if (this.data.isEditEnable === true) {
      this.id = this.data.editRowData.id;
      this.itemNameVal = this.data.editRowData.itemName;
      this.descriptionVal = this.data.editRowData.description;
      this.priceVal = this.data.editRowData.price;
      this.qualityVal = this.data.editRowData.quality;
      this.itemsLeftVal = this.data.editRowData.itemsLeft;
    }
  }
  saveInventory() {
    // debugger
    // const IdGeneration = JSON.parse(this.data);
    // debugger
    // tslint:disable-next-line:no-unused-expression
    const addNewInventoryObj = {
      id: this.id,
      itemName: this.itemNameVal,
      description: this.descriptionVal,
      price: this.priceVal,
      quality: this.qualityVal,
      itemsLeft: this.itemsLeftVal
    };
    // tslint:disable-next-line:no-bitwise
    if (this.itemNameVal !== '' && this.descriptionVal !== '' && this.priceVal > 0) {
      this.errorMessage = '';
      this.enableErrorMesage = false;
      if (this.data.isEditEnable === true) {
        this.inventoryService.ediInventoryAPI(addNewInventoryObj).subscribe(
          res => {
            this.toastr.success('Successfully modified inventory');
            this.closeDialog();
          }
        );
        // addNewInventoryObj.id = (this.data.idGenerate) + 2;
      }
       else{
        addNewInventoryObj.id = (this.data.idGenerate) + 2;
        // tslint:disable-next-line:no-debugger
        this.inventoryService.saveInventoryAPI(addNewInventoryObj).subscribe(
          res => {
            this.toastr.success('Successfully added inventory');
            this.closeDialog();
          }
        );
      }
    } else {
      this.errorMessage = 'Please Enter all maditory Fields';
      this.enableErrorMesage = true;
    }
  }
  closeDialog(){
    this.dialogRef.close(false);
  }
}

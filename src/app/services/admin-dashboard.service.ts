import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment as env } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json; charset=UTF-8',
      // tslint:disable-next-line:object-literal-key-quotes
      // 'access_token': idToken
    }
  )
};

@Injectable({
  providedIn: 'root'
})

export class AdminDashboardService {
  constructor(private http: HttpClient ) { }

  public getInventoryAPI(): Observable<any> {
    return this.http.get(env.baseUrl + 'inventoryData');
  }

  public saveInventoryAPI(saveInventoryData): Observable<any> {
    return this.http.post(env.baseUrl + 'inventoryData', saveInventoryData);
  }
  public ediInventoryAPI(editInventoryId): Observable<any> {
    // tslint:disable-next-line:whitespace
    return this.http.patch(env.baseUrl + 'inventoryData/' + editInventoryId.id, httpOptions );
  }

  public deleteInventoryAPI(deleteId): Observable<any> {
    // tslint:disable-next-line:whitespace
    return this.http.delete(env.baseUrl + 'inventoryData/' + deleteId);
  }
}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Item } from "../../shared/menuitem";
import { Observable, of } from "rxjs";
import { MenuProvider } from "../menu/menu";
import { baseUrl } from "../../shared/baseurl";
import { catchError } from "rxjs/operators";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable()
export class CheckoutProvider {
  order: Array<any> = [];

  constructor(public http: HttpClient, private menuservice: MenuProvider) {
    console.log("Hello CheckoutProvider Provider");
  }

  addToOrder(id: string): boolean {
    this.order.push(id);
    return true;
  }

  getOrder(): Observable<Item[]> {
    return this.menuservice
      .getMenu()
      .map(items =>
        items.filter(item => this.order.some(el => el === item._id))
      );
  }

  removeFromOrder(id: string): Observable<Item[]> {
    let index = this.order.indexOf(id);
    if (index >= 0) {
      this.order.splice(index, 1);
      return this.getOrder();
    } else {
      console.log("Removing non-existant order");
    }
  }

  checkInfo(data: any): Observable<any> {
    return this.http.post<any>(baseUrl + "processpay/check", data, httpOptions);
  }

  postOrder(data: any): Observable<any> {
    let response = this.http
      .post<any>(baseUrl + "processpay", data, httpOptions)
      .pipe(catchError(error => of(error)));
    return response;
  }

  returnOrder(): Array<any> {
    return this.order;
  }

  resetOrder(): boolean {
    this.order = [];
    return true;
  }
}

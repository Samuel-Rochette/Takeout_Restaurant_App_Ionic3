import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Item } from "../../shared/menuitem";
import { Observable } from "rxjs/Observable";
import { baseUrl } from "../../shared/baseurl";
import { catchError } from "rxjs/operators";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";

@Injectable()
export class MenuProvider {
  constructor(public http: HttpClient) {
    console.log("Hello MenuProvider Provider");
  }

  getMenu(): Observable<Item[]> {
    let response = this.http
      .get<Item[]>(baseUrl + "menu")
      .map(res => res)
      .pipe(catchError((error: any) => Observable.throw(error)));
    return response;
  }

  getTag(tag: string): Observable<Item[]> {
    let response = this.http
      .get<Item[]>(baseUrl + "menu/tag/" + tag)
      .map(res => res)
      .pipe(catchError((error: any) => Observable.throw(error)));
    return response;
  }

  getMenuItem(id: string): Observable<Item> {
    let response = this.http
      .get<Item>(baseUrl + "menu/" + id)
      .map(res => res)
      .pipe(catchError((error: any) => Observable.throw(error)));
    return response;
  }

}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appurls } from '../app-urls.constants';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  setDetails: any;

  constructor(private httpClient: HttpClient) { }
  getImages(imageType, page): Observable<any> {
    const url = Appurls.getImages + '?query=' + imageType + '&page=' + page + '&per_page=20';
    return this.httpClient.get(url)
      .pipe(
        map((response: any) => {
          if (response) {
            return response;
          }

        })
      ) as Observable<any>;
  }
  getVideos(imageType, page): Observable<any> {
    const url = Appurls.getVideos + '?query=' + imageType + '&page=' + page + '&per_page=20';
    return this.httpClient.get(url)
      .pipe(
        map((response: any) => {
          if (response) {
            return response;
          }

        })
      ) as Observable<any>;
  }

}

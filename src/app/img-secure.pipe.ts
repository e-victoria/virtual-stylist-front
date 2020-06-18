import { Pipe, PipeTransform } from '@angular/core';
import {Observable} from 'rxjs';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Pipe({
  name: 'imgSecure'
})
export class ImgSecurePipe implements PipeTransform {

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  transform(url: string): Observable<SafeUrl> {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map((val: Blob) => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val)))
    );
  }

}

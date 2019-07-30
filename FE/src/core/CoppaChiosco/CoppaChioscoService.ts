import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';
import { CoppaChiosco } from './CoppaChiosco';

@Injectable()
export class CoppaChioscoService {
  constructor(private http: HttpClient, private router: ActivatedRoute) { }

  getAll(): Observable<CoppaChiosco[]> {
    const url = environment.baseUrl + '/teamPoints';
    return this.http.get<CoppaChiosco[]>(url);
  }

}

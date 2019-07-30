import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';
import { Order } from './Order';
import { Team } from 'core/Team/Team';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient, private router: ActivatedRoute) {}

  multa: any;

  getAll(): Observable<Order[]> {
    const url = environment.baseUrl + '/order';
    return this.http.get<Order[]>(url);
  }

  getById(itemId: string): Observable<Order> {
    const url = environment.baseUrl + '/order';
    return this.http.get<Order>(url, {
      params: {
        id: itemId,
      },
    });
  }

  create(order: Order) {
    const url = environment.baseUrl + '/order';
    return this.http.post<Order>(url, order);
  }

  delete(itemId: string): Observable<boolean> {
    const url = environment.baseUrl + '/order';
    return this.http.delete<boolean>(url, {
      params: {
        id: itemId,
      },
    });
  }

  coppaChiosco(teamPoints: Team) {
    const url = environment.baseUrl + '/teamPoints';
    return this.http.put<Team>(url, teamPoints);
  }
}

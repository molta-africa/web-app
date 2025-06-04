import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  constructor(private http: HttpClient) {}
  getLoansTemplate() {
    return this.http.get('/loans/molta?sortByOverdue=true');
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { LoanService } from './loan.service';

@Component({
  selector: 'mifosx-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  loansData: any[] = [];

  displayedColumns: string[] = [
    'loaner',
    'product',
    'originalLoan',
    'loanBalance',
    'amountPaid',
    'loanType'
  ];

  dataSource: MatTableDataSource<any>;

  isLoading = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  totalLoans = 0;

  pageSize = 50;
  currentPage = 0;

  totalRows = 0;

  sortAttribute = '';
  sortDirection = '';

  /**
   * @param {LoanService} loansService Loans Service
   */
  constructor(private loansService: LoanService) {}

  ngOnInit() {
    this.getLoans();
  }

  /**
   * Fetches loans from server
   */
  getLoans() {
    this.isLoading = true;
    this.loansService
      .getLoansTemplate()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((response: any) => {
        this.loansData = response?.pageItems || [];
        this.totalLoans = response?.totalFilter;
        this.totalRows = this.totalLoans;
        this.dataSource = new MatTableDataSource(this.loansData);

        this.dataSource.sortingDataAccessor = this.sortAccessor;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  /**
   * Search functionality for loans
   */
  search(searchTerm: string) {
    this.dataSource.filter = searchTerm.trim().toLowerCase();
  }

  /**
   * Handler for pagination change event
   */
  pageChanged(event: any) {
    this.pageSize = event.pageSize;
  }

  private sortAccessor(item: any, property: string): string | number {
    switch (property) {
      case 'loaner':
        return item.clientName || item.group.name;
      case 'product':
        return item.loanProductName;
      case 'originalLoan':
        return item.principal;
      case 'loanBalance':
        return item.summary?.totalOutstanding || 0;
      case 'amountPaid':
        return item.principal - (item.summary?.totalOutstanding || 0) || 0;
      case 'loanType':
        return item.clientId || item.group.id;
      default:
        return item[property];
    }
  }

  /**
   * Handler for sorting change event
   */
  sortChanged(event: Sort) {
    console.log(event, 'is sorted');
    if (event.direction === '') {
      this.getLoans();
    } else {
    }
  }
}

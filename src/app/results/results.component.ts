import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemData } from '../interfaces/item.interface';
import { SearchService } from '../services/search.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  items: ItemData[] = []; 
  displayItems: ItemData[] = []; 
  currentPage: number = 1;
  pagesToShow: number = 3;
  maxPages: number = 10;
  itemsPerPage: number = 50;
  isLoading: boolean = false;
  selectedCourse: ItemData | null = null;

  errorMessage: string = '';

  constructor(
    private router: Router,
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(
      switchMap(params => {
        const searchQuery = params['q'] || '';
        this.isLoading = true;
        this.errorMessage = '';
        this.selectedCourse = null;
        return this.searchService.search(searchQuery);
      })
    ).subscribe(
      results => {
        this.isLoading = false;
        this.items = results || [];
        this.maxPages = Math.ceil(this.items.length / this.itemsPerPage);
        this.updateDisplayItems();
        if (this.displayItems.length > 0) {
          this.selectedCourse = this.displayItems[0];
        }
        this.changeDetectorRef.detectChanges();
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred. Please refresh the page and try again.';
        console.error('Search error:', error);
      }
    );
  }
  
  private performSearch(): void {
    const searchQuery = this.activatedRoute.snapshot.queryParams['q'] || '';
    this.isLoading = true;
    this.errorMessage = '';
    this.selectedCourse = null;
    this.searchService.search(searchQuery).subscribe(
      results => {
        this.isLoading = false;
        this.items = results || [];
        this.maxPages = Math.ceil(this.items.length / this.itemsPerPage);
        this.updateDisplayItems();
        if (this.displayItems.length > 0) {
          this.selectedCourse = this.displayItems[0];
        }
        this.changeDetectorRef.detectChanges();
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred. Please refresh the page and try again.';
        console.error('Search error:', error);
        this.changeDetectorRef.detectChanges();
      }
    );
  }


  private updateDisplayItems(): void {
    if (!this.items || this.items.length === 0) {
      console.log('No items to display');
      this.displayItems = [];
      return;
    }
  
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayItems = this.items.slice(startIndex, endIndex);
    console.log('Display items:', this.displayItems);
  
    if (this.displayItems.length > 0) {
      this.selectCourse(this.displayItems[0]);
    }
  }
  

  get paginationArray(): number[] {
    const paginationStart = Math.max(1, this.currentPage - Math.floor(this.pagesToShow / 2));
    const paginationEnd = Math.min(paginationStart + this.pagesToShow - 1, this.maxPages);

    const paginationArray: number[] = [];
    for (let i = paginationStart; i <= paginationEnd; i++) {
      paginationArray.push(i);
    }
    console.log('Pagination array:', paginationArray); // Add this line
    return paginationArray;
  }

  navigateToFirstPage(): void {
    this.navigateToPage(1);
  }

  navigateToPreviousPage(): void {
    this.navigateToPage(Math.max(1, this.currentPage - 1));
  }

  navigateToNextPage(): void {
    this.navigateToPage(Math.min(this.maxPages, this.currentPage + 1));
  }

  navigateToLastPage(): void {
    this.navigateToPage(this.maxPages);
  }

  navigateToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updateDisplayItems();
    window.scrollTo(0, 0);

    if (this.displayItems.length > 0) {
      this.selectedCourse = this.displayItems[0];
    }
  }

  ngOnDestroy() {
    this.searchService.onChangeSearchResult.unsubscribe();
  }

  selectCourse(course: ItemData) {
    if (this.selectedCourse !== course) {
      this.selectedCourse = course;
    }
  }
}

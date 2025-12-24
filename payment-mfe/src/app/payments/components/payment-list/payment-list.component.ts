import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  selectUPI(): void {
    this.router.navigate(['upi'], { relativeTo: this.route.parent });
  }

  selectCard(): void {
    this.router.navigate(['card'], { relativeTo: this.route.parent });
  }

  goBack(): void {
    this.location.back();
  }
}

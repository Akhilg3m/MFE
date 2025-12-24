import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})
export class PaymentSummaryComponent implements OnInit {
  paymentForm!: FormGroup;
  paymentMethod: 'upi' | 'card' = 'upi';
  isProcessing = false;
  paymentSuccess = false;
  transactionId = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const url = this.router.url;
    this.paymentMethod = url.includes('/card') ? 'card' : 'upi';
    this.initForm();
  }

  initForm(): void {
    if (this.paymentMethod === 'upi') {
      this.paymentForm = this.fb.group({
        upiId: ['', [Validators.required, Validators.pattern(/^[\w.-]+@[\w]+$/)]]
      });
    } else {
      this.paymentForm = this.fb.group({
        cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
        cardholderName: ['', [Validators.required, Validators.minLength(3)]],
        expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
        cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
      });
    }
  }

  onSubmit(): void {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    this.isProcessing = true;

    // Simulate payment processing
    setTimeout(() => {
      this.isProcessing = false;
      this.paymentSuccess = true;
      this.transactionId = `TXN${this.paymentMethod.toUpperCase()}${Date.now()}`;
    }, 2500);
  }

  formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    this.paymentForm.patchValue({ cardNumber: value });
  }

  formatExpiryDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2);
    input.value = value;
    this.paymentForm.patchValue({ expiryDate: value });
  }

  goBack(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  get formControls() {
    return this.paymentForm.controls;
  }

  get maskedCardNumber(): string {
    const num = this.formControls['cardNumber']?.value || '';
    return num.length >= 4 ? '**** **** **** ' + num.slice(-4) : '';
  }
}

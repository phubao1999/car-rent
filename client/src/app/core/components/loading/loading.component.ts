import { CommonModule } from '@angular/common';
import { UtilityService } from './../../../utils/utility.service';
import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [ProgressSpinnerModule, CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  constructor(public utilityService: UtilityService) {}
}

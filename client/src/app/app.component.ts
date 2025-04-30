import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast, ToastModule } from 'primeng/toast';
import { LoadingComponent } from './core/components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Toast, ToastModule, LoadingComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'client';
}

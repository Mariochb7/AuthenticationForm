import { Component } from '@angular/core';
import { EmailIndexComponent } from '../email-index/email-index.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ModalComponent } from '../../shared/modal/modal.component';
import { EmailCreateComponent } from '../email-create/email-create.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    EmailIndexComponent,
    RouterModule,
    SharedModule,
    ModalComponent,
    EmailCreateComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthModule, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = '';
  signedin$: BehaviorSubject<boolean | null>;
  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedin$;
  }

  ngOnInit() {
    this.authService.chechAuth().subscribe(() => {});
    //debugger;
    //console.log('signed in ? ', this.authService.signedin$.value);
    /*setTimeout(() => {
      this.authService.signout().subscribe(() => {});
    }, 5000);*/
  }
}

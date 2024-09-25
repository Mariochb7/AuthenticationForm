import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  standalone: true,
  imports: [],
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.css',
})
export class SignoutComponent {
  constructor(private authService: AuthService, private router: Router) {} //router gives us access
  //to the url the user is using or direct us to any url

  ngOnInit() {
    this.authService.signout().subscribe(() => {
      //debugger;
      //Navigate the user back to a sign in page , or show them a success message
      this.authService.signedin$.next(false);
      //console.log('sign out value is ', this.authService.signedin$.value);
      this.router.navigateByUrl('/');
    });
  }
}

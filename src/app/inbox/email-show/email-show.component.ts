import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../email.service';
import { switchMap } from 'rxjs';
import { Email } from '../email';
import { CommonModule } from '@angular/common';
import { EmailReplyComponent } from '../email-reply/email-reply.component';

@Component({
  selector: 'app-email-show',
  standalone: true,
  imports: [CommonModule, EmailReplyComponent],
  templateUrl: './email-show.component.html',
  styleUrl: './email-show.component.css',
})
export class EmailShowComponent {
  email: Email;

  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService
  ) {
    //console.log(this.route.snapshot.data); //data coming from our resolver ( alwasy guaranteed to have results before loading the page)
    this.route.data.subscribe(({ email }) => {
      this.email = email;
    });
  } //route tells the component exactly why it is being displayed,current route etc..

  ngOnInit() {
    //console.log(this.route);
    /*  this.route.params.subscribe(({ id }) => {
      //console.log(value); // will show id : xxxxxx because of childrouting object we specified earlier
      this.emailService.getEmail(id).subscribe((email) => {
        console.log(email); //nesting subscribe to another subscribe is a little bit nasty we can do it in another way
      });
    });
  }*/
    ///////NOTE USED ANYMORE , USING RESOLVER INSTEAD , in ROUTE OBJECT
    /*this.route.params
      .pipe(
        switchMap(({ id }) => {
          return this.emailService.getEmail(id);
        })
      )
      .subscribe((email) => {
        //console.log(email);
        this.email = email;
      });
  }*/
  }
}

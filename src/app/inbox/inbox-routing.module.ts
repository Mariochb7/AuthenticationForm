import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { EmailResolverService } from './email-resolver.service';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'not-found', // /inbox/id show home and EmailShow comp too
        component: NotFoundComponent,
      },
      {
        path: ':id', // /inbox/id show home and EmailShow comp too
        component: EmailShowComponent,
        resolve: {
          email: EmailResolverService,
        }, //theres a property called email in emailshowcomp and the source of that data is the emailresolverservice
      },
      {
        path: '', // /inbox show home and placeholder comp too
        component: PlaceholderComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}

import { Routes, CanDeactivate } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MemberListComponent } from '../members/member-list/member-list.component';
import { UserMessagesComponent } from '../user-messages/user-messages.component';
import { UserListsComponent } from '../user-lists/user-lists.component';
import { WaifusComponent } from '../waifus/waifus.component';
import { AuthGuard } from '../_guards/auth.guard';
import { WaifuListComponent } from '../waifus/waifu-list/waifu-list.component';
import { MemberDetailsComponent } from '../members/member-details/member-details.component';
import { MemberDetailsResolver } from '../_resolvers/member-details.resolver';
import { MemberListResolver } from '../_resolvers/member-list.resolver';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { MemberEditResolver } from '../_resolvers/member-edit.resolver';
import { PreventUnsavedProfileChanges } from '../_guards/prevent-unsaved-profile-changes.guard';

// It goes through by first match win order. So whenever we match the first route, we go to

// We importated this in appModule

// Some check with AuthGuard in order to use it, it goes through our code in there.

// The ones in the children are all protected by AuthGuard

// Now with our resolver, we will be using the user in the resolve
export const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent },
    {path: 'waifus', component: WaifuListComponent },
    {
        path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
            {path: 'members/:id', component: MemberDetailsComponent, resolve: {user: MemberDetailsResolver}},
            {path: 'member/edit', component: MemberEditComponent,
                resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedProfileChanges]  },
            {path: 'messages', component: UserMessagesComponent },
            {path: 'lists', component: UserListsComponent },
        ]
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'}

];



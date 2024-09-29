import { Component } from '@angular/core';
import { AddUserComponent } from "./add-user/add-user.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { UserTasksComponent } from "./user-tasks/user-tasks.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AddUserComponent, UsersListComponent, UserTasksComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}

import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';

export const routes: Routes = [
    {
        path: "users", 
        component: UsersComponent,
        children: [
            {
                path: ":id",
                component: UserTasksComponent
            }
        ]
    }
];

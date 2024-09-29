import { Component, DestroyRef, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css'
})
export class UserTasksComponent {
  id: string = ""
  
  usersService = inject(UsersService)
  ar = inject(ActivatedRoute)
  destroyRef = inject(DestroyRef)

  ngOnInit() {
    const sub = this.ar.paramMap.subscribe({
      next: (paramMap) => {
        this.id = this.usersService.users().find((u) => u.id === paramMap.get('id'))?.id || ""
      }
    })
    this.destroyRef.onDestroy(() => {
      sub.unsubscribe()
    })
  }
   
}

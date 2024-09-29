import { Component, DestroyRef, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { RestrictedUser, UsersService } from '../users.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  loading = signal(false)
  usersService = inject(UsersService)
  destroyRef = inject(DestroyRef)

  users = signal<RestrictedUser[] | undefined>(undefined)

  constructor() {
    const subFetch = this.usersService.fetchUsers()
      .subscribe({
        next: (resp) => {this.users.set(resp.users)},
        error: (e) => { console.log(e); },
        complete: () => { console.log("fetch complete"); }
      })
    this.loading.set(false)
    

    const subLoading = this.usersService.loading$.subscribe((val) => {
      this.loading.set(val)
    })

    this.destroyRef.onDestroy(() => {
      subFetch.unsubscribe()
      subLoading.unsubscribe()
    })
  }
}

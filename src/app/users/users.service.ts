import { DestroyRef, inject, Injectable, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop"
import { HttpClient } from "@angular/common/http";
import { Task } from "@prisma/client";

export type RestrictedUser = {
    id: string
    email: string
    username: string
}

const BASE_URL = "http://localhost:3000"

@Injectable({ providedIn: "root" })
export class UsersService {

    private httpClient = inject(HttpClient)

    users = signal<RestrictedUser[]>([])
    users$ = toObservable(this.users)

    loading = signal(false)
    loading$ = toObservable(this.loading)

    destroyRef = inject(DestroyRef)

    fetchUsers() {
        return this.httpClient.get<{ users: RestrictedUser[] }>(BASE_URL)
    }

    addUser(values: { email: string, username: string }) {
        this.loading.set(true)
        const sub = this.httpClient.post<{ newUser: RestrictedUser }>(`${BASE_URL}/add-user`, {
            email: values.email,
            username: values.username
        })
        .subscribe({
            next: (resp) => {
                console.log(resp.newUser);
                this.users.update((prev) => [...prev, resp.newUser])
                console.log(this.users());
                                 
            },
            error: (e) => {
                console.log(e.error.message);
                this.loading.set(false)
            },
            complete: () => this.loading.set(false)
        })

        this.destroyRef.onDestroy(() => {
            sub.unsubscribe()
        })
    }

    getTasks(id: string) {
        return this.httpClient.get<Task[]>(`${BASE_URL}/${id}`)
    }
}
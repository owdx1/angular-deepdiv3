import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {

  private usersService = inject(UsersService)
  loading = signal(false)

  userForm = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
    username: new FormControl('', {
      validators: [
        Validators.required
      ]
    })
  })

  constructor() { 
    const loadingSub = this.usersService.loading$.subscribe((val) => {
      this.loading.set(val)
    })
  }

  handleSubmit() {
    
    if(!this.userForm.controls.email.value || !this.userForm.controls.username.value) {
      return
    }
    
    this.usersService.addUser({
      email: this.userForm.controls.email.value,
      username: this.userForm.controls.username.value
    })
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// Services
import { UserService } from '../../core/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'sign-up',
    templateUrl: 'sign-up.component.html',
    styleUrls: ['sign-up.component.scss']
})
export class SignUpComponent {

    formFeedback: string;

    constructor(
        private router: Router,
        private userService: UserService,
    ) {}

    authenticate(form: NgForm) {
        this.formFeedback = '';
        
        if (form.valid) {
            this.userService.authenticate(form.value.username, form.value.password).subscribe(
                (response) => this.router.navigateByUrl('admin'),
                (error: HttpErrorResponse) => this.formFeedback = 'Algo ha salido mal al identificarte (' + error.status + '). Prueba de nuevo por fa.'
            );
        } else {
            this.formFeedback = 'Perdona, pero ambos campos son obligatorios';
        }
    }

    submitFormIfEnter(event: KeyboardEvent, loginForm: NgForm) {
        if (event.keyCode === 13 || event.which === 13 || event.charCode === 13){
            event.preventDefault();
            this.authenticate(loginForm);
        }
    }



}
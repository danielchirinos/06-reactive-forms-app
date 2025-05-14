import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../uitils/form-utils';

@Component({
    selector: 'app-register-page',
    imports: [ JsonPipe, ReactiveFormsModule ],
    templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

    public formUtils = FormUtils;

    private fb = inject( FormBuilder )

    public myForm: FormGroup = this.fb.nonNullable.group({
        name: [ "", [ Validators.required, Validators.pattern( this.formUtils.namePattern ) ] ],
        email: [ "", [ Validators.required, Validators.pattern( this.formUtils.emailPattern ) ], [ this.formUtils.checkingServerResponse ] ],
        username: [ "", [ Validators.required, Validators.minLength(6), Validators.pattern( this.formUtils.notOnlySpacesPattern ) ] ],
        password: [ "", [ Validators.required, Validators.minLength(6) ] ],
        password2: [ "", Validators.required ],
    }, {
        validators: [ this.formUtils.ifPasswordEquals('password', 'password2') ]
    } )


    public onSave():void {

        if( this.myForm.invalid ){
            this.myForm.markAllAsTouched();
            return
        }

        console.log(this.myForm.value);

    }

}

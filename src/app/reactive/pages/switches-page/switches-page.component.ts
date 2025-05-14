import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../uitils/form-utils';

@Component({
    selector: 'app-switches-page',
    imports: [ JsonPipe, ReactiveFormsModule ],
    templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {

    public formUtils = FormUtils;

    private fb = inject( FormBuilder )

    public myForm: FormGroup = this.fb.nonNullable.group({
        gender: ["M", Validators.required ],
        wantNotifications: [true , Validators.required ],
        termAndConditions: [false, Validators.requiredTrue ]
    });

    onSubmit() {

        if( this.myForm.invalid ){
            this.myForm.markAllAsTouched();
            return
        }

        console.log(this.myForm.value);

    }


}

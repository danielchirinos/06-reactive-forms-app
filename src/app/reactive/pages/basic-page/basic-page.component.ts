import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../uitils/form-utils';

@Component({
    selector: 'app-basic-page',
    imports: [ JsonPipe, ReactiveFormsModule ],
    templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {

    public formUtils = FormUtils;

    // * manera de cerar formularios con FORM GROUP
    // public myForm = new FormGroup({
    //     name: new FormControl( '' ),
    //     price: new FormControl( 0 ),
    //     inStorage: new FormControl( 0 ),
    // })

    // * manera de cerar formularios con FORM BUILDER

    private formBuilder = inject( FormBuilder )

    // nombre del campo : [ '', /* Validadores sincronos */, /** Validadores asincronos */ ],
    // si el validador es unico se escribe directo, si no, se meten en un array
    public myForm: FormGroup = this.formBuilder.group({
        name: [ '', [ Validators.required, Validators.minLength(3) ] , [] ],
        price: [ 0, [ Validators.required, Validators.min(10) ],  ],
        inStorage: [ 0, [ Validators.required, Validators.min(0) ] ]
    })

    // ?se movio al utils.ts
    // public isValidFiled( fieldName: string): boolean | null {

    //     return this.myForm.controls[fieldName].errors != null && this.myForm.controls[fieldName].touched
    // }

    // ?se movio al utils.ts
    // public getFieldError( fieldName: string ):string | null{
    //     if( !this.myForm.controls[fieldName] ) return null;

    //     const errors = this.myForm.controls[fieldName].errors ?? {};

    //     for (const key of Object.keys(errors) ) {

    //         switch (key) {
    //             case 'required':
    //             return "Este campo es requerido";

    //             case 'minlength':
    //             return `Minimo de ${ errors["minlength"].requiredLength } caracteres`;

    //             case 'min':
    //             return `Valor mino  de ${ errors["min"].min }`;

    //         }

    //     }

    //     return null;
    // }

    public onSave(){

        if( this.myForm.invalid ){
            this.myForm.markAllAsTouched()
            return;
        }

        console.log(this.myForm.value);


        this.myForm.reset({
            name:"",
            price: 0,
            inStorage: 0
        })

    }

}

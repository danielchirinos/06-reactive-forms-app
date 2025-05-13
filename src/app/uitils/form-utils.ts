import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {

    public static isValidField( form: FormGroup, fieldName: string ){
        return form.controls[fieldName].errors != null && form.controls[fieldName].touched
    }

    public static isValidFieldInFormArray( formArray: FormArray, index: number ):boolean {
        return formArray.controls[index].errors != null && formArray.controls[index].touched
    }


    public static getFieldError( form: FormGroup, fieldName: string ):string | null{
        if( !form.controls[fieldName] ) return null;

        const errors = form.controls[fieldName].errors ?? {};

        return this.getTextError(errors)


    }

    public static getFieldErrorInArray( formArray: FormArray, index: number ):string | null{
        if( formArray.controls.length === 0 ) return null;

        const errors = formArray.controls[index].errors ?? {};

        return this.getTextError(errors)

    }


    private static getTextError( errors: ValidationErrors ){
        for (const key of Object.keys(errors) ) {

            switch (key) {
                case 'required':
                return "Este campo es requerido";

                case 'minlength':
                return `Minimo de ${ errors["minlength"].requiredLength } caracteres`;

                case 'min':
                return `Valor mino  de ${ errors["min"].min }`;

            }

        }
        return null;
    }

}

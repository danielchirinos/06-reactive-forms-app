import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep(){

    return new Promise( (resolve) =>{
        setTimeout(() => {
            resolve( true )
        }, 2500);
    });
}

export class FormUtils {

    // expresiones regulares
    static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

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


    public static ifPasswordEquals( field1: string, field2:string ){
        return ( formGroup: AbstractControl ) => {

            const field1Val = formGroup.get(field1)?.value
            const field2Val = formGroup.get(field2)?.value

            return field1Val === field2Val ? null : { passwordNotEqual: true}
        }
    }

    static async checkingServerResponse( control: AbstractControl ):Promise<ValidationErrors | null>{

        console.log("back");

        await sleep();

        const formValue = control.value;

        if( formValue === "hola@mundo.com"){
            return {
                emailTaken : true,
            }
        }
        return null;
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

                case 'email':
                return `Email incorrecto`;

                case 'pattern':
                  if(errors["pattern"].requiredPattern === this.emailPattern){
                    return "El valor no es un correo válido"
                }
                return `Email incorrecto`;

                case 'passwordNotEqual':
                return `La contraseñas no coinciden`;

                case 'emailTaken':
                return `El correo electronico ya esta en uso`;

                default:
                return `Error de validacion no controlado ${key}`
            }

        }
        return null;
    }

}

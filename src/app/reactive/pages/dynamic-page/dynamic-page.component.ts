import { JsonPipe } from '@angular/common';
import { Component, inject, KeyValueDiffers } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../uitils/form-utils';

@Component({
    selector: 'app-dynamic-page',
    imports: [ JsonPipe, ReactiveFormsModule ],
    templateUrl: './dynamic-page.component.html',
})
export class DinamicPageComponent {

    private fb = inject( FormBuilder );
    public formUtils = FormUtils;

    public myForm: FormGroup = this.fb.group({
        name: ["", [ Validators.required, Validators.minLength(3) ]],
        favoriteGames: this.fb.array(
            [
                ["Metal Gear", Validators.required ],
                ["Assasin Creed", Validators.required ]
            ],
            [Validators.required,  Validators.minLength(2) ] ),
    })


    get favoriteGames() {
        return this.myForm.get("favoriteGames") as FormArray
    }

    public newFavoriteGames = new FormControl( "", Validators.required )

    public onAddToFavorites( event: Event ){

        event.preventDefault()

        if( this.newFavoriteGames.invalid ){
            return;
        }

        const newGame = this.newFavoriteGames.value;

        this.favoriteGames.push( this.fb.control( newGame, Validators.required ) )

        this.newFavoriteGames.reset()

    }


    public onDeleteFavorite(index: number){
        this.favoriteGames.removeAt( index );
    }


    public onSubmit(){

        // if( this.myForm.invalid ) return

        console.log(this.myForm.value);

        this.myForm.markAllAsTouched();
    }
}

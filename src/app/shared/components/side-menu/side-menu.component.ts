import { ChangeDetectionStrategy, Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.route';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
    title: string;
    route: string;
}

const rectiveItems = reactiveRoutes[0].children ?? [];

@Component({
    selector: 'app-side-menu',
    imports: [ RouterLink, RouterLinkActive ],
    templateUrl: './side-menu.component.html'
})
export class SideMenuComponent {


    public reactiveMenu: MenuItem[] = rectiveItems.filter( (item) => item.path !== "**").map( item => (
        {
            title : `${item.title}`,
            route : `reactive/${item.path}`
        }
    ))

    public authMenu: MenuItem[] = [{
        title: "Registro",
        route: "./auth"
    }]

    public countryMenu: MenuItem[] = [{
        title: "Paises",
        route: "./country"
    }]

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //pour le menue on fait une boucle dans app.component
  actions:Array<any> =[
    {title:"Home","route":"/home",icon:"house"},
    {title:"Products","route":"/products",icon:"arrow-down-up"},
    {title:"New Product","route":"/new-products",icon:"plus-circle"}
  ];
  // pour activer la button qui en action
  currentAction :any;
  setCurrentAction(action:any){
    this.currentAction = action;

  }
}

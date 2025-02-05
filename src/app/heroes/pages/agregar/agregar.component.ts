import { Component, OnInit } from '@angular/core';
import { Heroe,Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { AuthService } from '../../../auth/services/auth.service';



@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width:100%;
    border-radius:5px
  }` 
  ]
})
export class AgregarComponent implements OnInit {

  publishers=[
    {
      id:'DC Comics',
      desc:'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc:'MArvel - Comics'
    }
]
heroe:Heroe={
  id:'',
  alter_ego:'',
  characters:'',
  first_appearance:'',
  publisher:Publisher.DCComics,
  superhero:'',
  alt_img:''
}
  constructor(private HeroesService:HeroesService,
              private activateRoute:ActivatedRoute,
              private router:Router,
              private snackBar:MatSnackBar,
              private dialog:MatDialog,
              private authService:AuthService) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
      return
    }
    
    this.activateRoute.params
    .pipe(
      switchMap(({id})=>this.HeroesService.getHeroePorId(id))
    )
          .subscribe(heroe=>this.heroe=heroe)
  }
  
  guardar(){

    this.authService.verificaAutentificacion().subscribe(auth=>{
      if(!auth){
        this.router.navigate(['./heroes/login']);
      }else{
        if(this.heroe.superhero.trim().length===0){
          return;
        }
        if(this.heroe.id){
          //actualizar
           this.HeroesService.actualizarHeroe(this.heroe)
               .subscribe(heroe=>this.mostrarSnackBar('Heroe Actualizado')
               )
        }else{
          //agregar
         this.HeroesService.agregarHeroe(this.heroe)
            .subscribe(heroe=>
              this.router.navigate(['/heroes/editar',heroe.id]))
              this.mostrarSnackBar('Héroe Agregado')
        }
      }
    })
  
   
  }
  borrar(){
    this.authService.verificaAutentificacion().subscribe(auth=>{
      if(!auth){
        this.router.navigate(['./heroes/login']);
      }else{
        const dialog=this.dialog.open(ConfirmarComponent,{
          width:'250px',
          data:{...this.heroe}
        });
        dialog.afterClosed().subscribe(
          (result)=>{
            if(result){
              this.HeroesService.borrarHeroe(this.heroe.id!)
            .subscribe(resp=>this.router.navigate(['/heroes']))
            }
            
    
          }
        )
      }
    })
    

    
  }
  mostrarSnackBar(mensaje:string){
    this.snackBar.open(mensaje,'OK!',{
      duration:2500
    })

  }

}

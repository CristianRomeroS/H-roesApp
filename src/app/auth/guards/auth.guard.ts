import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad,CanActivate,CanActivateChild{

  constructor(private authService:AuthService,
              private router:Router){}

 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean > | Promise<boolean> | boolean  {
      // if(this.authService.auth.id){
      //   return true
  
      // }
       console.log('bloqueado por el AuthGuard-Can Activate')
      // return false;
      return this.authService.verificaAutentificacion()
              .pipe(
                tap(estaautentificado=>{
                  if(!estaautentificado){
                    this.router.navigate(['./auth/login'])
                  }
                  
                })
              )
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    // console.log('canLoad', true);
    // console.log(route);
    // // console.log(segments);
    // if(this.authService.auth.id){
    //   return true

    // }
    console.log('bloqueado por el AuthGuard-Can Load')
    
    
    
    //   return false;
    return this.authService.verificaAutentificacion()
          .pipe(
            tap(estaautentificado=>{
              if(!estaautentificado){
                this.router.navigate(['./auth/login'])
              }
              
            })
          )
    
  }
  
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean > | Promise<boolean> | boolean  {
      // if(this.authService.auth.id){
      //   return true
  
      // }
       console.log('bloqueado por el AuthGuard-Can Activate')
      // return false;
      return this.authService.verificaAutentificacion()
              .pipe(
                tap(estaautentificado=>{
                  if(!estaautentificado){
                    this.router.navigate(['./auth/login'])
                  }
                  
                })
              )
  }
  
}

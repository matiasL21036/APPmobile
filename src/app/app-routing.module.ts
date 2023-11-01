import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'inicio', // Ruta que incluye el parámetro 'username'
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule)
  },
 
  {
    path: 'horario',
    loadChildren: () => import('./pages/horario/horario.module').then( m => m.HorarioPageModule)
  },
  {
    path: 'escanear',
    loadChildren: () => import('./pages/escanear/escanear.module').then( m => m.EscanearPageModule)
  },
  {
    path: 'asignaturaprofesor',
    loadChildren: () => import('./pages/asignaturaprofesor/asignaturaprofesor.module').then( m => m.AsignaturaprofesorPageModule)
  },
  {
    path: 'profesor',
    loadChildren: () => import('./pages/profesor/profesor.module').then( m => m.ProfesorPageModule)
  },
  {
    path: 'qr',
    loadChildren: () => import('./pages/qr/qr.module').then( m => m.QRPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'asistenciaprofe',
    loadChildren: () => import('./pages/asistenciaprofe/asistenciaprofe.module').then( m => m.AsistenciaprofePageModule)
  },
  {
    path: 'horarioprofesor',
    loadChildren: () => import('./pages/horarioprofesor/horarioprofesor.module').then( m => m.HorarioprofesorPageModule)
  },
  {
    path: 'detalleprofesor',
    loadChildren: () => import('./pages/detalleprofesor/detalleprofesor.module').then( m => m.DetalleprofesorPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },

 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }





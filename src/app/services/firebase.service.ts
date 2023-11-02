import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, DocumentSnapshot, getDoc } from 'firebase/firestore';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

  // autenticar 
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // crear usuario
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // actualizar usuario
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  // Enviar email para recuperar contraseña
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  // Obtener el tipo de usuario desde Firestore
  getUserTipoUsuario(uid: string): Observable<string> {
    const userDocRef = doc(getFirestore(), `users/${uid}`);
    return new Observable<string>((observer) => {
      getDoc(userDocRef)
        .then((docSnapshot: DocumentSnapshot<any>) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            observer.next(userData.tipoUsuario);
          } else {
            observer.next('unknown');
          }
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  // Base de datos
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }
}

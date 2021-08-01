import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn!: boolean;
  
  constructor(private afAuth: AngularFireAuth) {
    this.getAuth().subscribe(auth => {
      console.log(auth);     
      if(auth) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
   }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then(userData => {
          this.isLoggedIn = true;
          resolve(userData)
        },
      err => reject(err))
    });
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userData => {
        this.isLoggedIn = true;
        resolve(userData)
      },
      err => reject(err))
    });
  }

  getAuth() {
    return this.afAuth.authState.pipe(auth => {
      return auth
    });
  }

  logout() {
    return this.afAuth.signOut();
  }

}

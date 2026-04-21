import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(public rou: Router) { }
  public users: any[] = JSON.parse(localStorage.getItem('users') || '[]');

  signup(email: string, password: string, role: any): boolean {

    const exists = this.users.find(u => u.email === email);
    if (exists) {
      return false;

    }
    if(email==='' && password===''){
      return false;
    }
    this.users.push({ email, password, role });
  
    localStorage.setItem('users', JSON.stringify(this.users));

    return true;
  }
  login(email: string, password: string, role: any): boolean {

    if (this.users.find(u => u.email === email && u.password === password && u.role === role)) {
      const toke = {
        role: role,
        name: email.split("@")[0].trim(),
        email: email
      };
      const token = btoa(JSON.stringify(toke));
      localStorage.setItem('token', token);

      return true;
    }

    return false;
  }

  get_user() {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(atob(token)) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.rou.navigate(['/']);
  }
  getrole() {
    const t = localStorage.getItem('token');
    if (!t) {
      return null;
    }
    const user = JSON.parse(atob(t));
    return user.role;

  }
}
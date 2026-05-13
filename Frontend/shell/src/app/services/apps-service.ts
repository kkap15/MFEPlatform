import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegisteredApp } from "../models/registered-app";

@Injectable({providedIn: 'root'})
export class AppsService {
    private readonly base = 'http://localhost:5039/api/apps';
    
    constructor(private http: HttpClient) {}
    
    getAll() : Observable<RegisteredApp[]> {
        return this.http.get<RegisteredApp[]>(this.base);
    }
    
    register(app: Omit<RegisteredApp, 'id'| 'createdAt'>) : Observable<RegisteredApp> {
        return this.http.post<RegisteredApp>(this.base, app);
    }
    
    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.base}/${id}`);
    }
}
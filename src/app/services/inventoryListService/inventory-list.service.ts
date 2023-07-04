import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lists } from 'src/app/models/Lists/lists.model';

const baseUrl = 'http://localhost:8080/api/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryListService{

  constructor(private http: HttpClient) { }

  getAll(): Observable<Lists[]> {
    return this.http.get<Lists[]>(baseUrl);
  }

  get(id: any): Observable<Lists> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getUserInventory(id: any): Observable<Lists[]> {
    return this.http.get<Lists[]>(`${baseUrl}/user/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Lists[]> {
    return this.http.get<Lists[]>(`${baseUrl}?title=${title}`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogEntry } from '../BlogEntry';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseUrl = 'http://localhost:8080/blog';

  constructor(private http: HttpClient) { }
  
  public getAllBlogEntries(): Observable<BlogEntry[]> {
    return this.http.get<BlogEntry[]>(`${this.baseUrl}/all`);
  }

  public addNewBlogEntry(blogEntry: BlogEntry): Observable<BlogEntry>{
    return this.http.post<BlogEntry>(`${this.baseUrl}/add`, blogEntry);
  }

  public updateBlogEntry(blogEntry: BlogEntry): Observable<BlogEntry>{
    return this.http.put<BlogEntry>(`${this.baseUrl}/update`, blogEntry);
  }

  public deleteBlogEntry(blogId: string): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/delete/${blogId}`)
  }
}

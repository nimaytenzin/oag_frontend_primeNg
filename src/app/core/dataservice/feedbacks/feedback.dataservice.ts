import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CreateFeedbackDTO, FeedbackDTO } from '../../dto/legislation/legislation.dto';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FeedbackDataService {
    constructor(private http: HttpClient) { }

    private apiUrl = environment.apiUrl;

    CreateFeedback(
        data: CreateFeedbackDTO
    ): Observable<FeedbackDTO> {
        return this.http.post<FeedbackDTO>(
            `${this.apiUrl}/feedback`,
            data
        );
    }

    GetAllFeedback(): Observable<FeedbackDTO[]> {
        return this.http.get<FeedbackDTO[]>(`${this.apiUrl}/feedback`);
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import {
    CreateDocumentCopyDto,
    DocumentCopyDto,
} from '../../dto/storage/document-copy.dto';

@Injectable({
    providedIn: 'root',
})
export class DocumentCopyDataService {
    constructor(private http: HttpClient) {}

    private apiUrl = environment.apiUrl;
    private controllerName = 'document-copy';

    //ADMIN ROUTES
    AdminCreateDocumentCopy(data: FormData) {
        return this.http.post<DocumentCopyDto>(
            `${this.apiUrl}/${this.controllerName}`,
            data
        );
    }

    AdminGetDocumentCopiesByLegislation(legislationId: number) {
        return this.http.get<DocumentCopyDto[]>(
            `${this.apiUrl}/${this.controllerName}/legislation/${legislationId}`
        );
    }

    AdminGetDocumentCopiesByDelegateLegislation(delegatedLegislationId: number) {
        return this.http.get<DocumentCopyDto[]>(
            `${this.apiUrl}/${this.controllerName}/delegated-legislation/${delegatedLegislationId}`
        );
    }

    AdminDeleteDocumentCopy(id: number) {
        return this.http.delete(`${this.apiUrl}/${this.controllerName}/${id}`);
    }

    // PUBLIC ROUTES

    UpdateDocumentCopy(data: any, id: number) {
        return this.http.patch<DocumentCopyDto>(
            `${this.apiUrl}/${this.controllerName}/${id}`,
            data,
            {
                reportProgress: true,
                headers: {},
            }
        );
    }

    getDocumentUri(path: string) {
        return `${this.apiUrl}${path}`;
    }

    GetDocumentCopiesByDraftLegislation(refId: number) {
        return this.http.get<DocumentCopyDto[]>(
            `${this.apiUrl}/${this.controllerName}/draft-legislation/${refId}`
        );
    }

    GetDocumentCopiesByDraftDelegatedLegislation(refId: number) {
        return this.http.get<DocumentCopyDto[]>(
            `${this.apiUrl}/${this.controllerName}/draft-delegated-legislation/${refId}`
        );
    }

    GetDocumentCopiesByDelegatedLegislation(refId: number) {
        return this.http.get<DocumentCopyDto[]>(
            `${this.apiUrl}/${this.controllerName}/delegated-legislation/${refId}`
        );
    }
}

import { Injectable } from '@angular/core';
import { EditingModes, LanguageType } from '../constants/enums';

@Injectable({
    providedIn: 'root',
})
export class AdminViewLegislationPreferences {
    private tabNameKey = 'admViewDraftTabSelection';

    public setSelectedTab(value: string) {
        sessionStorage.setItem(this.tabNameKey, value);
    }

    public getSelectedTab(): string {
        return sessionStorage.getItem(this.tabNameKey); // return 'en' if no language is set
    }
}

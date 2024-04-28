import { Injectable } from '@angular/core';
import { EditingModes, LanguageType } from '../constants/enums';

@Injectable({
    providedIn: 'root',
})
export class UserEditModePreference {
    private editModeKey = 'oag_editMode';

    public setEditingMode(value: string) {
        sessionStorage.setItem(this.editModeKey, value);
    }

    public getEditingMode(): string {
        return sessionStorage.getItem(this.editModeKey) || EditingModes.NORMAL; // return 'en' if no language is set
    }
}

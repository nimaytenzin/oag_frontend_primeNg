import { Injectable } from '@angular/core';
import { EditingModes, LanguageType } from '../constants/enums';

@Injectable({
  providedIn: 'root',
})
export class UserEditModePreference {
  private editModeKey = 'oag_editMode';

  public setEditingMode(value: string) {
    localStorage.setItem(this.editModeKey, value);
  }

  public getEditingMode(): string {
    return localStorage.getItem(this.editModeKey) || EditingModes.NORMAL; // return 'en' if no language is set
  }
}

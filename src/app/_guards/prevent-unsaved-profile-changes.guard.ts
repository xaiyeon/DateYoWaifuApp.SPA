import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { MemberEditComponent } from '../members/member-edit/member-edit.component';


@Injectable()
export class PreventUnsavedProfileChanges implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Master! You have unsaved changes! STOP or it will be gone!');

        }
        return true;
    }
}

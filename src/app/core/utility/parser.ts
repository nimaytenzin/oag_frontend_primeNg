import { AmendmentChangeType, LegislationStatus } from '../constants/enums';

export function ParseLegislationStatus(val: LegislationStatus) {
  switch (val) {
    case LegislationStatus.AMMENDED:
      return 'Amended';
    case LegislationStatus.ENACTED:
      return 'Enacted';
    case LegislationStatus.BILL:
      return 'Bill';
    case LegislationStatus.REPEALED:
      return 'Repealed';
  }
}

export function ParseAmendmentChangeType(val: AmendmentChangeType) {
  switch (val) {
    case AmendmentChangeType.MODIFICATION:
      return 'Amended';
    case AmendmentChangeType.DELETION:
      return 'Repealed';
    case AmendmentChangeType.CREATION:
      return 'Added';
  }
}

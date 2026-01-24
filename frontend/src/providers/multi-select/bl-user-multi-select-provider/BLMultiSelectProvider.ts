import createMultiSelectProvider from '../MultiSelectProvider.tsx';
import type {
  BLSelectableUser
} from '../../../components/ui/bl-selectable-list/bl-selectable-user-list/BLSelectableUserList.tsx';

export const {
  MultiSelectProvider: BLSelectableUserMultiSelectProvider,
  useMultiSelect: useBLSelectableUserMultiSelectProvider
} = createMultiSelectProvider<BLSelectableUser>();
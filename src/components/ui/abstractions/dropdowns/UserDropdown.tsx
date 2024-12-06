import { type User } from '@models';
import { useMemo } from 'react';
import { SingleDropdown } from './Dropdown';

interface UserDropdownProps {
  users: User[];
  selectedUserId: string | null;
  setSelectedUserId: (userId: string | null) => void;
  placeholder?: string;
}

export function UserDropdown({
  users,
  selectedUserId,
  setSelectedUserId,
  placeholder = 'Vælg bruger',
}: UserDropdownProps) {
  const userOptions = useMemo(() => {
    return users.map((user) => ({
      label: user.fullName,
      value: user.id,
    }));
  }, [users]);

  const selectedUser = users.find((user) => user.id === selectedUserId);
  const displayLabel = selectedUser ? selectedUser.fullName : placeholder;

  return (
    <SingleDropdown
      selectedValue={selectedUserId}
      options={userOptions}
      buttonLabel={displayLabel}
      setSelectedValue={setSelectedUserId}
    />
  );
}

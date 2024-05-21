'use client';

import { SingleDropdown } from '@components/ui';
import { PlusMinusButton } from '@components/ui/PlusMinusButton';
import { type UpdateProjectForm } from '@lib/api/types';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';

interface AddOrRemoveEmployeeProps {
  members: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

const RoleActionDropdownOptions = [
  {
    label: 'Bruger',
    value: 'USER',
  },
  {
    label: 'Manager',
    value: 'MANAGER',
  },
  {
    label: 'Ejer',
    value: 'OWNER',
  },
];

export default function AddOrRemoveEmployee({
  members,
  isOpen,
  setIsOpen,
  refetch,
}: AddOrRemoveEmployeeProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateProjectForm>({
    defaultValues: {},
  });

  async function onSubmit() {
    // try {
    //   await axios.patch(`/api/project/${project.id}`, data);
    //   toast.success('Projektet er opdateret!');
    //   refetch();
    //   setIsOpen(false);
    // } catch (error) {
    //   console.log(error);
    //   toast.error('Error - something went wrong');
    // }
  }

  return (
    <>
      <Modal
        className="bg-[#413e3e]"
        size="xl"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="top-center"
        backdrop="blur"
        onClose={() => setIsOpen(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">
                Tilføj / Fjern medlemmer
              </ModalHeader>
              <ModalBody className="text-white">
                <div className="flex w-full items-center justify-center">
                  <span className="w-full">Medlemmer:</span>
                  <span className="w-full">Rolle:</span>
                </div>
                <div className="flex w-full items-center justify-center">
                  <div className="w-full">
                    <SingleDropdown
                      options={[]}
                      buttonLabel={'Medarbejder'}
                      // selectedValue={watch('role')}
                      // setSelectedValue={(value) => {
                      //   setValue('role', value as UserRole);
                      // }}
                    />
                  </div>
                  <div className="w-full">
                    <SingleDropdown
                      options={RoleActionDropdownOptions}
                      buttonLabel={'Roller'}
                      selectedValue={watch('role')}
                      setSelectedValue={(value) => {
                        setValue('role', value as UserRole);
                      }}
                    />
                  </div>
                  <div className="mr-8 text-center">
                    <PlusMinusButton
                      type="minus"
                      onClick={() => {
                        if (members.length > 1) {
                          const newMemberIds = [
                            ...members.slice(0, index),
                            ...members.slice(index + 1),
                          ];
                          form.setValue('members', newMemberIds);
                        }
                      }}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={onClose}>
                  Luk
                </Button>
                <Button onClick={handleSubmit(onSubmit)}>Gem</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

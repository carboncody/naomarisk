'use client';

import { NextInput } from '@components/ui/Input';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

export default function NewPreojectDialog() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        className="bg-transparent"
        disableAnimation
      >
        Creat a new project
      </Button>

      <Modal
        className="bg-[#413e3e]"
        size="4xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">
                Create a new project
              </ModalHeader>
              <ModalBody className="text-white">
                <div className="grid grid-cols-2 gap-5">
                  <NextInput autoFocus label="Project name" />

                  <NextInput label="Project Description" variant="bordered" />
                </div>

                {/* <div className='grid grid-cols-3 gap-5'>
                <Input
                    label="riskReportIntro"
                    variant="bordered"
                    classNames={{ label: 'text-white !important' }}
                  />
                  <Input
                    label="riskRegisterDescription"
                    variant="bordered"
                    classNames={{ label: 'text-white !important' }}
                  />
                   <Input
                    label="riskReportDocumentId"
                    variant="bordered"
                    classNames={{ label: 'text-white !important' }}
                  />
                 
                </div> */}

                <div className="grid grid-cols-4 gap-5">
                  <NextInput
                    label="Start Date"
                    type="date"
                    variant="bordered"
                  />
                  <NextInput label="End Date" type="date" variant="bordered" />
                  <NextInput
                    className="col-span-2"
                    label="Budget [kr.]"
                    type="number"
                    labelPlacement="inside"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Cancel
                </Button>
                <Button onPress={onClose}>Save</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

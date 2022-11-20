import create from 'zustand';
import { CreateFacilityFormDto } from '../../application/types';

export enum FacilityFormStep {
  Base_info = 'base info',
  Working_hours = 'working hours',
  Contact = 'contact',
}

type FacilityFormStore = {
  step: FacilityFormStep;
  data: Partial<CreateFacilityFormDto>;
  setData: (partial: Partial<CreateFacilityFormDto>) => void;
  next: () => void;
  previous: () => void;
};

export const useFacilityFormStore = create<FacilityFormStore>((set, get) => {
  return {
    step: FacilityFormStep.Base_info,
    data: {},
    setData(partial) {
      set({
        data: {
          ...get().data,
          ...partial,
        },
      });
    },
    next() {
      const getNextStep = () => {
        switch (get().step) {
          case FacilityFormStep.Base_info:
            return FacilityFormStep.Working_hours;
          case FacilityFormStep.Working_hours:
            return FacilityFormStep.Contact;
          case FacilityFormStep.Contact:
            return FacilityFormStep.Contact;
        }
      };

      set({
        step: getNextStep(),
      });
    },
    previous() {
      const getNextStep = () => {
        switch (get().step) {
          case FacilityFormStep.Base_info:
            return FacilityFormStep.Base_info;
          case FacilityFormStep.Working_hours:
            return FacilityFormStep.Base_info;
          case FacilityFormStep.Contact:
            return FacilityFormStep.Working_hours;
        }
      };

      set({
        step: getNextStep(),
      });
    },
  };
});

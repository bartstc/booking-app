import create from 'zustand';
import { persist } from 'zustand/middleware';

export enum ProTipType {
  Close_filters_model_on_space = 'close-filters-modal-on-space',
}

type ProTipStore = {
  tips: Record<ProTipType, boolean>;
  toggle(name: string): void;
};

export const proTipStore = create<ProTipStore>(
  persist(
    set => {
      return {
        tips: {
          [ProTipType.Close_filters_model_on_space]: true as boolean,
        },
        toggle(name: ProTipType) {
          set(state => ({
            tips: {
              ...state.tips,
              [name]: !state.tips[name],
            },
          }));
        },
      };
    },
    {
      name: 'pro-tips',
    },
  ),
);

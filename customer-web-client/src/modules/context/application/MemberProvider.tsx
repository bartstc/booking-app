import React, { ReactNode } from "react";
import { createContext, useContextSelector } from "use-context-selector";

import { IMember } from "modules/member/application/types";

const context = createContext<Partial<IMember>>({});

interface IProviderProps {
  children: ReactNode;
  value: IMember;
}

export const MemberProvider = ({ value, children }: IProviderProps) => {
  return <context.Provider value={value}>{children}</context.Provider>;
};

type Selector<Selected> = (state: IMember) => Selected;

export function useMemberContextSelector<Selected>(
  selector: Selector<Selected> = (state) => (state as unknown) as Selected
) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useContextSelector<IMember, Selected>(context as any, selector)
  );
}

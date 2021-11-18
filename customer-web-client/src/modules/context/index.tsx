import React, { ReactNode, useEffect, useState, Suspense } from "react";

import { Spinner } from "shared/Spinner";
import { ErrorBoundary } from "shared/ErrorBoundary";

import { useAuthContextSelector } from "../auth/application";
import { useMemberByEmailQuery } from "../member/infrastructure/query";
import { MemberProvider } from "./application";

interface IProps {
  children: ReactNode;
}

const Context = ({ children }: IProps) => {
  const getUser = useAuthContextSelector((state) => state.getUser);
  const parseJwt = useAuthContextSelector((state) => state.parseJwt);
  const [email, setEmail] = useState<string | null>(null);

  // todo: cleanup
  useEffect(() => {
    getUser().then((res) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = parseJwt(res!.id_token);
      setEmail(decoded.email);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!email) {
    return <Spinner margin={32} mt={10} />;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner margin={32} mt={10} />}>
        <Content email={email!}>{children}</Content>
      </Suspense>
    </ErrorBoundary>
  );
};

const Content = ({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) => {
  const member = useMemberByEmailQuery(email);

  return <MemberProvider value={member!}>{children}</MemberProvider>;
};

export { Context };

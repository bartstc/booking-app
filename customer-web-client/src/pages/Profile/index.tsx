import React from "react";
import { Code, Box } from "@chakra-ui/react";

import { withErrorBoundary } from "shared/ErrorBoundary";

import { useMembersBookingsQuery } from "modules/member/infrastructure/query";
import { useMemberContextSelector } from "modules/context/application";

const Profile = () => {
  const memberId = useMemberContextSelector((state) => state.id);
  const { bookings } = useMembersBookingsQuery(memberId);

  return (
    <Box maxW="1000px" m="0 auto">
      <Code>{JSON.stringify(bookings, null, 2)}</Code>
    </Box>
  );
};

export default withErrorBoundary(Profile);

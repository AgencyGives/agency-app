import React, { useContext } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { GlobalContext } from "../context/store";

/**
 * This shows the current connected wallet account address and
 * its AGENCY Balance
 */
const ConnectWallet = () => {
  const [state] = useContext(GlobalContext);

  return (
    <>
      {state.address && (
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Chip label={state.address} variant="outlined" />
          <Chip label={state.balance + ` AGENCY`} />
        </Stack>
      )}
    </>
  );
};

export default ConnectWallet;

import React from "react";
import { TabPanel } from "@mui/lab";
import CopyTradersTable from "../../shared/CopyTradersTable/index.js";

const TopTraders = ({ value }) => {
  return (
    <>
      <TabPanel
        value={value}
        sx={{
          padding: "0",
        }}
      >
        <CopyTradersTable />
      </TabPanel>
    </>
  );
};

export default TopTraders;

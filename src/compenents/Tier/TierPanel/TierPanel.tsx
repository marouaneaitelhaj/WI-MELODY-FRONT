import { useState } from "react";
import { AddTier } from "./AddTierForm";
import TiersManagementList from "./TiersManagementList";

export default function TierPanel() {
    const [openedTab, setOpenedTab] = useState(0);
    return (
        <>
            {openedTab === 0 && <TiersManagementList setOpenedTab={setOpenedTab} />}
            {openedTab === 1 && <AddTier setOpenedTab={setOpenedTab} />}
        </>
    )
}
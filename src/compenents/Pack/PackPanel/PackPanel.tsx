import { Add } from "@mui/icons-material";
import AddPack from "./AddPack";
import PacksManagementList from "./PacksManagementList";
import { useState } from "react";

export default function PackPanel() {
    const [openedTab, setOpenedTab] = useState(0);
    return (
        <>
            {openedTab === 0 && <PacksManagementList setOpenedTab={setOpenedTab} />}
            {openedTab === 1 && <AddPack setOpenedTab={setOpenedTab} />}
        </>
    )
}
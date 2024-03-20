import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Tpack } from "../../state/types";
import AxiosInstanceForAuth from "../../axios/AxiosInstanceForAuth";
import AddPack from "./AddPackForm";
import AddMediaOfPackForm from "../media/AddMediaOfPackForm";
import MediaOfPack from "../media/MediaOfPack";
import { RootState, useAppDispatch } from "../../state/store";
import { useSelector } from "react-redux";
import { getPacks } from "../../state/pack/packActions";
import { setOpen, setPack } from "../../state/formsModal/AddPackFormSlice";

export default function PacksManagementList() {
    const { packs } = useSelector((state: RootState) => state.pack);
    const [openMediaOfPackForm, setMediaOfPackForm] = useState(false);
    const [openMediaOfPack, setMediaOfPack] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPacks())
    }, [])

    const openMediaOfPackPopUpForm = (pack: Tpack) => {
        setPack(pack);
        setMediaOfPackForm(true);
    }

    const openMediaOfPackPopUp = (pack: Tpack) => {
        setPack(pack);
        setMediaOfPack(true);
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 260 },
        { field: 'description', headerName: 'Description', width: 260 },
        { field: 'date', headerName: 'Date', width: 260 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 800,
            renderCell: (params: GridCellParams) => (
                <div>
                    <button className="bg-blue-500 text-white px-4 py-2 m-3 rounded-md" onClick={() => {
                        dispatch(setPack(params.row as Tpack));
                        dispatch(setOpen(true));
                    }}>Edit</button>
                    <button className="bg-yellow-500 text-white px-4 py-2 m-3 rounded-md" onClick={() => openMediaOfPackPopUpForm(params.row as Tpack)}>
                        Add Content
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 m-3 rounded-md" onClick={() => openMediaOfPackPopUp(params.row as Tpack)}>
                        See Content
                    </button>
                </div>
            ),
        },
    ]
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <h1 className="text-2xl font-semibold mb-6">Packs</h1>
            <button onClick={() => {
                dispatch(setPack({} as Tpack));
                dispatch(setOpen(true))
            }} className="bg-black text-white px-4 py-2 my-5 rounded-md">Add Pack</button>
            <DataGrid
                rowSelection={false}
                hideFooter={false}
                hideFooterPagination={false}
                hideFooterSelectedRowCount={false}
                rows={packs}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
            <AddPack />
            {/* <AddMediaOfPackForm pack={pack || {} as Tpack} open={openMediaOfPackForm} setOpen={setMediaOfPackForm}></AddMediaOfPackForm> */}
            {/* <MediaOfPack pack={pack || {} as Tpack} open={openMediaOfPack} setOpen={setMediaOfPack}></MediaOfPack> */}
        </div>
    )
}
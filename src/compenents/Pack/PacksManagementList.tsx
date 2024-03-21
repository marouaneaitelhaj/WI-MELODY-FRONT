import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Tpack } from "../../state/types";
import AxiosInstanceForAuth from "../../axios/AxiosInstanceForAuth";
import AddPack from "./AddPackForm";
import AddMediaOfPackForm from "../media/AddMediaOfPackForm";
import MediaOfPack from "../media/MediaOfPack";
import { RootState, useAppDispatch } from "../../state/store";
import { useSelector } from "react-redux";
import { deletePack, getPacks } from "../../state/pack/packActions";
import { setOpen, setPack } from "../../state/formsModal/AddPackFormSlice";
import { setOpenForAddMediaToPack, setPackForAddMediaToPack } from "../../state/formsModal/AddMediaOfPackFormSlice";
import { setOpenForMediaOfPackPopUp, setPackForMediaOfPackPopUp } from "../../state/formsModal/MediaOfPackPopUpSlice";
import { showConfirmationPopUp } from "../../state/confirmationPopUp/confirmationPopUpSlice";

export default function PacksManagementList() {
    const { packs } = useSelector((state: RootState) => state.pack);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPacks())
    }, [])



    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'date', headerName: 'Date', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 500,
            renderCell: (params: GridCellParams) => (
                <div>
                    <button className="bg-orange-700 text-white w-[100px] px-3 py-2 m-3 rounded-md" onClick={() => {
                        dispatch(setPack(params.row as Tpack));
                        dispatch(setOpen(true));
                    }}>Edit</button>
                    <button className="bg-orange-600 text-white w-[100px] px-3 py-2 m-3 rounded-md" onClick={() => {
                        dispatch(setPackForAddMediaToPack(params.row as Tpack));
                        dispatch(setOpenForAddMediaToPack(true));
                    }}>
                        Add Content
                    </button>
                    <button className="bg-orange-500 text-white w-[100px] px-3 py-2 m-3 rounded-md" onClick={() => {
                        dispatch(setOpenForMediaOfPackPopUp(true));
                        dispatch(setPackForMediaOfPackPopUp(params.row as Tpack));
                    }}>
                        See Content
                    </button>
                    <button className="bg-orange-400 text-white w-[100px] px-3 py-2 m-3 rounded-md" onClick={() => {
                        dispatch(showConfirmationPopUp({
                            desciption: 'Are you sure you want to delete this pack?',
                            title: 'Delete Pack',
                            open: true,
                            func: deletePack(params.row.id as string)
                        }));
                    }}>
                        Delete
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
            <AddMediaOfPackForm></AddMediaOfPackForm>
            <MediaOfPack></MediaOfPack>
        </div>
    )
}
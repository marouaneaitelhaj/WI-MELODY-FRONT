import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import { Ttier } from "../../state/types";
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { AddTierForm } from "./AddTierForm";
import { setOpenForAddTierForm, setTierForAddTierForm } from "../../state/formsModal/AddTierFormSlice";
import { deleteTier } from "../../state/tier/tierActions";
import { showConfirmationPopUp } from "../../state/confirmationPopUp/confirmationPopUpSlice";

export default function TiersManagementList() {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const columns = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'price', headerName: 'Price', width: 250 },
        { field: 'description', headerName: 'Description', width: 250 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            renderCell: (params: GridCellParams) => (
                <div>
                    <button className="bg-blue-500 text-white px-4 py-2 m-3 rounded-md" onClick={() => {
                        dispatch(setTierForAddTierForm(params.row as Ttier));
                        dispatch(setOpenForAddTierForm(true));
                    }}>Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 m-3 rounded-md" onClick={() => {
                        dispatch(showConfirmationPopUp({ title: 'Delete Tier', open: true, desciption: 'Are you sure you want to delete this tier?', func: () => dispatch(deleteTier(params.row.id)) }));
                    }}>Delete</button>
                    {/* <button className="bg-red-500 text-white px-4 py-2 m-3 rounded-md" onClick={() => handleDelete(params.row.id)}>Delete</button> */}
                </div>
            ),
        },
    ]

    return (
        <div style={{ height: '100%', minHeight: 30, width: '100%' }}>
            <h1 className="text-2xl font-semibold mb-6">Tiers</h1>
            <button onClick={() => dispatch(setOpenForAddTierForm(true))} className="bg-black text-white px-4 py-2 my-5 rounded-md">Add Tier</button>
            <DataGrid
                rowSelection={false}
                hideFooter={false}
                hideFooterPagination={false}
                hideFooterSelectedRowCount={false}
                rows={user?.tiers as Ttier[] || []}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
            <AddTierForm />
        </div>
    )
}
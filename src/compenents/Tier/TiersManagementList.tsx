import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Ttier } from "../../state/types";
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { useState } from "react";
import { AddTierForm } from "./AddTierForm";

export default function TiersManagementList() {
    const { user } = useSelector((state: RootState) => state.auth);
    const [open, setOpen] = useState(false);
    const [tier, setTier] = useState<Ttier | null>(null);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 260 },
        { field: 'price', headerName: 'Price', width: 90 },
        { field: 'description', headerName: 'Description', width: 260 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            renderCell: (params: GridCellParams) => (
                <div>
                    <button className="bg-blue-500 text-white px-4 py-2 m-3 rounded-md" onClick={() => {
                        setTier(params.row as Ttier);
                        setOpen(true);
                    }}>Edit</button>
                    {/* <button className="bg-red-500 text-white px-4 py-2 m-3 rounded-md" onClick={() => handleDelete(params.row.id)}>Delete</button> */}
                </div>
            ),
        },
    ]

    return (
        <div style={{ height: '100%', minHeight: 30, width: '100%' }}>
            <h1 className="text-2xl font-semibold mb-6">Tiers</h1>
            <button onClick={() => setOpen(true)} className="bg-black text-white px-4 py-2 my-5 rounded-md">Add Tier</button>
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
            <AddTierForm setTier={setTier} tier={tier || {} as Ttier} open={open} setOpen={setOpen} />
        </div>
    )
}
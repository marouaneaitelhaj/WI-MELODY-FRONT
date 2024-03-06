import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Ttier } from "../../state/types";
import { DataGrid } from '@mui/x-data-grid';

export default function TiersManagementList() {
    const { user } = useSelector((state: RootState) => state.auth);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 260 },
        { field: 'price', headerName: 'Price', width: 90 },
        { field: 'description', headerName: 'Description', width: 260 },
    ]
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <h1 className="text-2xl font-semibold mb-6">Tiers</h1>
            {/* <button onClick={() => props.setOpenedTab(1)} className="bg-black text-white px-4 py-2 my-5 rounded-md">Add tier</button> */}
            <DataGrid
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
        </div>
    )
}
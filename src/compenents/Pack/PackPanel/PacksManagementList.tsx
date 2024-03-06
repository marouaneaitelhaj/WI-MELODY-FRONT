import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AxiosInstanceForMyApi from "../../../axios/AxiosInstanceForMyApi";
import { Tpack } from "../../../state/types";
import AxiosInstanceForAuth from "../../../axios/AxiosInstanceForAuth";

export default function PacksManagementList(props: { setOpenedTab: React.Dispatch<React.SetStateAction<number>> }) {
    // const { user } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        AxiosInstanceForAuth.get('/pack').then((res) => {
            rows = res.data
        })
    }, [])
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'date', headerName: 'Date', width: 130 },
    ]
    let rows : Tpack[] = []
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <h1 className="text-2xl font-semibold mb-6">Packs</h1>
            <button onClick={() => props.setOpenedTab(1)} className="bg-black text-white px-4 py-2 my-5 rounded-md">Add pack</button>
            <DataGrid
                rows={rows}
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
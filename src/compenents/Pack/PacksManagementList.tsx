import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";
import { Tpack } from "../../state/types";
import AxiosInstanceForAuth from "../../axios/AxiosInstanceForAuth";
import AddPack from "./AddPackForm";

export default function PacksManagementList() {
    const [rows, setRows] = useState<Tpack[]>([])
    const [open, setOpen] = useState(false);
    const [pack, setPack] = useState<Tpack>()
    useEffect(() => {
        AxiosInstanceForAuth.get('/pack').then((res) => {
            setRows(res.data)
        })
    }, [])
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 260 },
        { field: 'description', headerName: 'Description', width: 260 },
        { field: 'date', headerName: 'Date', width: 260 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            renderCell: (params: GridCellParams) => (
                <div>
                    <button className="bg-blue-500 text-white px-4 py-2 m-3 rounded-md" onClick={() => {
                        setPack(params.row as Tpack);
                        setOpen(true);
                    }}>Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 m-3 rounded-md" onClick={() => handleDelete(params.row.id)}>Delete</button>
                </div>
            ),
        },
    ]
    return (
        <div style={{ height: '100%', minHeight: 30, width: '100%' }}>
            <h1 className="text-2xl font-semibold mb-6">Packs</h1>
            <button onClick={() => setOpen(true)} className="bg-black text-white px-4 py-2 my-5 rounded-md">Add Pack</button>
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
            <AddPack pack={pack || {} as Tpack} open={open} setOpen={setOpen} />
        </div>
    )
}
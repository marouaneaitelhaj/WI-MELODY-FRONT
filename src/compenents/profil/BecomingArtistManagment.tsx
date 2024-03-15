import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "../../state/store";
import { useSelector } from "react-redux";
import { getArtistRequests } from "../../state/artistRequests/artistActions";

export default function BecomingArtistManagment() {
    const { artistRequests } = useSelector((state: RootState) => state.artistRequests);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getArtistRequests()); // Dispatch action to get artist requests
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'fan_id', headerName: 'Fan ID', width: 200 }, // Adjust field names and widths based on TartistRequests
        { field: 'ArtistName', headerName: 'Artist Name', width: 260 },
        { field: 'RequestDate', headerName: 'Request Date', width: 260 },
        { field: 'Status', headerName: 'Status', width: 150 },
        { field: 'admin_id', headerName: 'Admin ID', width: 200 },
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     width: 800,
        //     renderCell: (params: GridCellParams) => (
        //         <div>
        //             <button className="bg-blue-500 text-white px-4 py-2 m-3 rounded-md" onClick={() => {
        //                 setPack(params.row as TartistRequests);
        //                 setOpenAddPack(true);
        //             }}>Edit</button>
        //             <button className="bg-yellow-500 text-white px-4 py-2 m-3 rounded-md" onClick={() => openMediaOfPackPopUpForm(params.row as TartistRequests)}>
        //                 Add Content
        //             </button>
        //             <button className="bg-blue-500 text-white px-4 py-2 m-3 rounded-md" onClick={() => openMediaOfPackPopUp(params.row as TartistRequests)}>
        //                 See Content
        //             </button>
        //         </div>
        //     ),
        // },
    ];

    return (
        <div style={{ height: '100%', minHeight: 30, width: '100%' }}>
            <div className="text-2xl font-semibold mb-6">Packs</div>
            <DataGrid
                rowSelection={false}
                hideFooter={false}
                hideFooterPagination={false}
                hideFooterSelectedRowCount={false}
                rows={artistRequests} // Update to artistRequests
                columns={columns}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}

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
        { field: 'fan', headerName: 'Fan', width: 200, valueGetter: (params: any) => params.row.fan.username},
        { field: 'admin', headerName: 'ID', width: 200, valueGetter: (params: any) => params?.row?.admin?.username},
        { field: 'status', headerName: 'status', width: 150 },
        { field: 'requestDate', headerName: 'requestDate', width: 150 },
        { field: 'artistName', headerName: 'artistName', width: 150 },
    ];

    return (
        <div style={{ height: '100%', minHeight: 30, width: '100%' }}>
            <div className="text-2xl font-semibold mb-6">Packs</div>
            <DataGrid
                rowSelection={false}
                hideFooter={false}
                hideFooterPagination={false}
                hideFooterSelectedRowCount={false}
                rows={artistRequests}
                columns={columns}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}

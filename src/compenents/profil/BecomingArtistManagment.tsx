import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { RootState, useAppDispatch } from "../../state/store";
import { useSelector } from "react-redux";
import { approveArtistRequest, getArtistRequests, rejectArtistRequest } from "../../state/artistRequests/artistActions";
import BecomingArtistConfirmation from "./BecomingArtistConfirmation";

export default function BecomingArtistManagment() {
    const { artistRequests } = useSelector((state: RootState) => state.artistRequests);
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();
    const [func, setFunc] = React.useState<any>();
    useEffect(() => {
        dispatch(getArtistRequests());
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'fan', headerName: 'Fan', width: 200, valueGetter: (params: any) => params.row.fan.username},
        { field: 'admin', headerName: 'Admin', width: 200, valueGetter: (params: any) => params?.row?.admin?.username},
        { field: 'status', headerName: 'status', width: 150 },
        { field: 'requestDate', headerName: 'requestDate', width: 150 },
        { field: 'artistName', headerName: 'artistName', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 800,
            renderCell: (params: any) => (
                <div>
                    <button className="bg-blue-500 text-white px-4 py-2 m-3 rounded-md" onClick={() => {
                        // dispatch(approveArtistRequest(params.row.id));
                        setOpen(true);
                        setFunc(() => () => approveArtistRequest(params.row.id));
                    }}>Accept</button>
                    <button className="bg-yellow-500 text-white px-4 py-2 m-3 rounded-md" onClick={() => {
                        // dispatch(rejectArtistRequest(params.row.id));
                        setOpen(true);
                        setFunc(() => () => rejectArtistRequest(params.row.id));
                    }}>Reject</button>
                </div>
            ),
        },
    ];

    return (
        <div style={{ height: '100%', minHeight: 30, width: '100%' }}>
            {/* <div className="text-2xl font-semibold mb-6">Packs</div> */}
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
            <BecomingArtistConfirmation func={func} open={open} setOpen={setOpen} />
        </div>
    );
}

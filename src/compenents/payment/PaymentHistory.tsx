import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../state/store";
import { useEffect } from "react";
import { getPayments } from "../../state/payment/paymentActions";
import { DataGrid } from "@mui/x-data-grid";

export default function PaymentHistory() {

    const { user } = useSelector((state: RootState) => state.auth);
    const { payments } = useSelector((state: RootState) => state.payment);
    const dispatch = useAppDispatch();

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'date', headerName: 'Date', width: 260 },
        { field: 'tier', headerName: 'Tier', width: 260, valueGetter: (params: any) => params.row.tier.name },
        { field: 'fan', headerName: 'Fan', width: 260, valueGetter: (params: any) => params.row.fan.username },
    ]

    useEffect(() => {
        dispatch(getPayments());
    }, []);
    return (
        <div style={{ height: '100%', minHeight: 30, width: '100%' }}>
            <h1 className="text-2xl font-semibold mb-6">Payment History</h1>
            <DataGrid
                rowSelection={false}
                hideFooter={false}
                hideFooterPagination={false}
                hideFooterSelectedRowCount={false}
                rows={payments}
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
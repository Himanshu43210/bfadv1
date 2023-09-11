import { TablePagination } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function BasicTablePagination({
  dataLength,
  currentPage,
  handlePageChange,
  rowPerPage,
  handleRowPerPagChange,
}) {
  return (
    <Stack spacing={2}>
      <TablePagination
        component="div"
        count={dataLength}
        page={currentPage}
        onPageChange={handlePageChange}
        rowsPerPage={rowPerPage}
        onRowsPerPageChange={handleRowPerPagChange}
      />
    </Stack>
  );
}

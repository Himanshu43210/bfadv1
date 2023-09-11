import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination({
  totalPages,
  currentPage,
  handlePageChange,
}) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        defaultPage={1}
      />
    </Stack>
  );
}

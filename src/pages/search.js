import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSearchParams } from "next/navigation";
import { API_DOMAIN } from "@/redux/utils/api";
import Chatbot from "@/components/customComponents/Chatbot";
import Footer from "@/components/customComponents/Footer";
import ScrollToTop from "@/components/customComponents/ScrollToTop";
import SearchCard from "@/components/customComponents/SearchCard";
import HeaderComp from "@/components/newComponents/HeaderComp";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Search = () => {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        try {
          const response = await fetch(
            `${API_DOMAIN}properties/v2/globalSearchProperties?search=${encodeURIComponent(
              query
            )}&page=${currentPage - 1}&limit=10000`
          );
          const result = await response.json();
          setData(result.result);
          setTotalItems(result.totalItems);
          setTotalPages(result.totalPages);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    };

    fetchSearchResults();
  }, [query, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Card className="search-result-screen">
        <HeaderComp />
        <div>
          {data?.map((item) => (
            <SearchCard element={item} />
          ))}
        </div>
        <Stack spacing={2} alignItems="center" marginTop={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
        <div className={`component_wrapper`}>
          <Footer />
        </div>
        <div className={`component_wrapper`}>
          <ScrollToTop />
        </div>
        <div className={`component_wrapper`}>
          <Chatbot />
        </div>
      </Card>
    </>
  );
};

export default Search;

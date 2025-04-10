"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Pagination,
  Divider,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { CalendarMonth } from "@mui/icons-material";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AvTimerOutlinedIcon from "@mui/icons-material/AvTimerOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

function BlogCard({ blog, stylings }) {
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(9); // Number of blogs per page
  const [paginatedBlogs, setPaginatedBlogs] = useState([]);
  const router = useRouter();
  const [totalPages, setTotalPages] = useState(1);
  // const { setBlog, blog } = blogData();
  const [copySuccess, setCopySuccess] = useState(false);
  const isLg = useMediaQuery("(min-width:900px)");

  useEffect(() => {
    if (blog?.length > 0) {
      // Paginate the blogs
      const indexOfLastBlog = currentPage * blogsPerPage;
      const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
      const currentBlogs = blog.slice(indexOfFirstBlog, indexOfLastBlog);
      setPaginatedBlogs(currentBlogs);

      const totalPagescal = Math.ceil(blog.length / blogsPerPage);
      setTotalPages(totalPagescal);
    }
  }, [blog, currentPage, blogsPerPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const truncateText = (text, limit = 100) => {
    if (text && text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        sx={{
          width: "100%",
          mt: 2,
          padding: "0px 10px",
          flexWrap: "wrap",
          display: "flex",
          gap: "35px",
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          paginatedBlogs?.map((item, index) => {
            const dateStr = item?.fields?.blogcreatedat;
            const date = new Date(dateStr);
            const formattedDate = date
              ?.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
              .replace(",", "");

            return (
              <Grid
                item
                key={item?.fields?.bloguid || index}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 20px)",
                    md:
                      index === 0
                        ? "100%"
                        : index === 1 || index === 2
                        ? "calc(50% - 20px)"
                        : "calc(33.33% - 20px)",
                  },
                  cursor: "pointer",
                  // position: "relative",
                  overflow: "hidden",
                  borderRadius: "9px",
                  boxShadow: { md: "0px 4px 6px rgba(0, 0, 0, 0.1)" },
                  // margin: "10px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: "180px", md: index > 0 ? "173px" : "245px" },
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    backgroundImage: `url(${
                      item?.fields?.blogimage?.fields?.file?.url
                        ? item?.fields?.blogimage?.fields?.file?.url
                        : ""
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    backgroundRepeat: "no-repeat",
                    borderRadius: { xs: "9px", md: "0px" },
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundColor:
                        index === 0 ? "rgb(0,0,0,0.5)" : "transparent",
                      padding: "20px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        justifyContent: {
                          xs: "flex-end",
                          md: index === 0 ? "space-between" : "flex-end",
                        },
                      }}
                    >
                      <Grid
                        item
                        sx={{
                          display: {
                            xs: "none",
                            md: index !== 0 ? "none" : "initial",
                          },
                          width: "85%",
                        }}
                      >
                        <Typography sx={{ ...stylings?.title, color: "#fff" }}>
                          {item?.fields?.blogtitle}
                        </Typography>
                        <Typography
                          sx={{
                            ...stylings?.description,
                            color: "#fff",
                            mt: "10px",
                            width: "80%",
                          }}
                        >
                          {item?.fields?.Seo?.metaDescription}
                        </Typography>
                      </Grid>
                      
                    </Grid>
                    <Box
                      sx={{
                        display: {
                          xs: "none",
                          md: index !== 0 ? "none" : "flex",
                        },
                        color: "white",
                        gap: "10px",
                      }}
                    >
                      {item?.fields?.categoryId && (
                        <>
                          <Typography
                            sx={{
                              ...stylings?.smallText,
                              display: "flex",
                              gap: "5px",
                              alignItems: "center",
                            }}
                          >
                            <LocalOfferOutlinedIcon sx={stylings?.iconFont} />
                            Category - {item?.fields?.categoryId}
                          </Typography>
                          <Divider
                            sx={{ borderColor: "white", borderWidth: "0.5px" }}
                          />
                        </>
                      )}

                      {formattedDate && (
                        <>
                          <Typography
                            sx={{
                              ...stylings?.smallText,
                              display: "flex",
                              gap: "5px",
                              alignItems: "center",
                            }}
                          >
                            <CalendarMonth sx={stylings?.iconFont} />
                            {formattedDate ? formattedDate : "dd/mm/yyyy"}
                          </Typography>
                          <Divider
                            sx={{ borderColor: "white", borderWidth: "0.5px" }}
                          />
                        </>
                      )}

                      {item?.fields?.readingTime && (
                        <>
                          <Typography
                            sx={{
                              ...stylings?.smallText,
                              display: "flex",
                              gap: "5px",
                              alignItems: "center",
                            }}
                          >
                            <AvTimerOutlinedIcon sx={stylings?.iconFont} />
                            {item?.fields?.readingTime}
                          </Typography>
                          <Divider
                            sx={{ borderColor: "white", borderWidth: "0.5px" }}
                          />
                        </>
                      )}

                      {item?.fields?.createdBy && (
                        <Typography
                          sx={{
                            ...stylings?.smallText,
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                          }}
                        >
                          <PersonOutlinedIcon sx={stylings?.iconFont} />
                          Created By -{" "}
                          {item?.fields?.createdBy
                            ? item?.fields?.createdBy
                            : "Shruti Sharma"}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: { xs: "flex", md: index === 0 ? "none" : "flex" },
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    padding: { xs: "15px 0px", md: "10px 10px" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "12px", md: "14px" },
                      fontWeight: 500,
                      lineHeight: 1.2,
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: "2px", md: "5px" },
                      color: "#6B6969",
                    }}
                  >
                    <LocalOfferOutlinedIcon
                      sx={{
                        fontSize: { xs: "17px", md: "16px" },
                        fontWeight: 500,
                      }}
                    />{" "}
                    {item?.fields?.categoryId}
                  </Typography>
                  <Typography
                    sx={{
                      ...stylings?.title,
                      lineHeight: 1.2,
                      mt: "10px",
                    }}
                  >
                    {item?.fields?.blogtitle}
                  </Typography>
                  <Typography
                    sx={{
                      ...stylings?.description,
                      lineHeight: 1.3,
                    }}
                  >
                    {isLg
                      ? index > 2
                        ? truncateText(item?.fields?.Seo?.metaDescription, 100)
                        : item?.fields?.Seo?.metaDescription
                      : item?.fields?.Seo?.metaDescription}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: { xs: "14px", md: index > 2 ? "0px" : "14px" },
                      mt: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {formattedDate && (
                      <Typography
                        sx={{
                          ...stylings?.smallText,
                          color: "#6B6969",
                          display: "flex",
                          gap: "2px",
                          alignItems: "center",
                        }}
                      >
                        <CalendarMonth sx={{ fontSize: "16px" }} />
                        {formattedDate ? formattedDate : "dd/mm/yyyy"}
                      </Typography>
                    )}

                    {item?.fields?.readingTime && (
                      <Typography
                        sx={{
                          ...stylings?.smallText,
                          color: "#6B6969",
                          display: "flex",
                          gap: "2px",
                          alignItems: "center",
                          ml: { xs: "0px", lg: index > 2 ? "10px" : "0px" },
                        }}
                      >
                        <AvTimerOutlinedIcon sx={{ fontSize: "16px" }} />
                        {item?.fields?.readingTime}
                      </Typography>
                    )}

                    {item?.fields?.createdBy && (
                      <Typography
                        sx={{
                          ...stylings?.smallText,
                          color: "#6B6969",
                          display: "flex",
                          gap: "2px",
                          alignItems: "center",
                        }}
                      >
                        <PersonOutlinedIcon sx={{ fontSize: "16px" }} />
                        {item?.fields?.createdBy ? item?.fields?.createdBy : ""}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            );
          })
        )}
      </Grid>

      {/* Pagination */}
      {paginatedBlogs?.length > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            size="small"
          />
        </Box>
      )}

    </Box>
  );
}

export default BlogCard;

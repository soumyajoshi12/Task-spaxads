import { Box, Typography, Breadcrumbs, Link, Divider } from "@mui/material";
import React from "react";
import LinkNext from "next/link";

const BlogBanner = () => {


    return (
        <Box
            sx={{
                width: "100%",
                height: { xs: "50vh", md: "65vh" },
                backgroundImage: `url('/banner.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    // padding: { xs: "12px", sm: "20px", md: "26px 40px" },
                    display: "flex",
                    alignItems:"center",
                    justifyContent: {xs:"center",md:"flex-end"},
                }}
            >
                <Box sx={{width:{xs:"100%",md:"40%"}}}>
                    <Typography
                        // variant="h1"
                        sx={{
                            fontSize: { xs: "25px", sm: "45px" },
                            color: "#000",
                            fontWeight: 700,
                            mb: "5px",
                            lineHeight: 1.1,
                        }}
                    >
                        Discover the Top Hotels to Stay in 2025
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: "12px", md: "18px" },
                            color: "#000",
                            fontWeight: 500,
                            width: "100%",
                            display: "flex",
                        }}
                    >
                        From luxury resorts to hidden gems, explore the best hotels around the world that promise unforgettable experiences in 2025.
                    </Typography>
                </Box>
            </Box> */}
        </Box>
    );
};

export default BlogBanner;

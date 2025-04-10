"use client";
import React from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import BlogCard from "../BlogCard";
import BlogBanner from "../BlogBanner";

const Blogs = () => {
    const isXs = useMediaQuery('(max-width:600px)');

    const blog = [
        {
            "fields": {
                "bloguid": "luxury-hotels-2025",
                "blogtitle": "Top Luxury Hotels to Stay in 2025",
                "blogcreatedat": "2025-04-01T10:30:00Z",
                "Seo": {
                    "metaDescription": "Discover the most luxurious hotels to experience in 2025 for a perfect getaway."
                },
                "blogimage": {
                    "fields": {
                        "file": {
                            "url": "/blog2.jpg"
                        }
                    }
                },
                "categoryId": "Luxury",
                "readingTime": "6 min read",
                "createdBy": "John Doe"
            }
        },
        {
            "fields": {
                "bloguid": "budget-hotels-best-picks",
                "blogtitle": "Best Budget Hotels That Don’t Feel Cheap",
                "blogcreatedat": "2025-03-20T08:15:00Z",
                "Seo": {
                    "metaDescription": "Explore budget-friendly hotels that provide top-notch comfort and value."
                },
                "blogimage": {
                    "fields": {
                        "file": {
                            "url": "/banner.jpg"
                        }
                    }
                },
                "categoryId": "Budget",
                "readingTime": "5 min read",
                "createdBy": "Emily Carter"
            }
        },
        {
            "fields": {
                "bloguid": "unique-hotel-stays",
                "blogtitle": "Most Unique Hotel Stays Around the World",
                "blogcreatedat": "2025-02-10T12:00:00Z",
                "Seo": {
                    "metaDescription": "From treehouses to underwater suites—check out these unforgettable hotel experiences."
                },
                "blogimage": {
                    "fields": {
                        "file": {
                             "url": "/blogss.jpg"
                        }
                    }
                },
                "categoryId": "Unique Stays",
                "readingTime": "7 min read",
                "createdBy": "Alex Morgan"
            }
        }
    ]


    const stylings = {
        description: {
            fontSize: { xs: "16px", sm: "16px", md: "16px" },
            fontWeight: 400,
            mt: "8px",
        },
        title: {
            fontSize: { xs: "16px", sm: "18px", md: "23px" },
            fontWeight: 600,
        },
        smallText: {
            fontSize: isXs ? "12px" : "14px",
            whiteSpace: "nowrap",
        },
        iconFont: {
            fontSize: "16px",
        },
    };

    return (
        <>
            <Grid container sx={{ backgroundColor: "#f9f9f9",mb:2 }}>
                <Box sx={{ width: "100%" }}>
                  <BlogBanner/>
                </Box>

                <Grid
                    container
                    sx={{ display: "flex", justifyContent: "space-between",mt:5 }}
                >
                    <Grid item xs={12}>
                        <BlogCard blog={blog} stylings={stylings} />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Blogs;

export async function getStaticProps() {
    try {
        const bannerResponse = await getBlogBannerService();
        const bannerDetails = bannerResponse?.data?.data[0]?.fields || null;

        const blogResponse = await getBlogService();
        const blog = blogResponse?.data?.data?.reverse() || [];

        if (!bannerResponse && !blogResponse && !categoryResponse) {
            return { notFound: true };
        }

        return {
            props: {
                bannerDetails,
                blog,

            },
            revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) || 3600,
        };
    } catch (error) {
        console.error("Error fetching data:", error);

        return {
            props: {
                bannerDetails: null,
                blog: [],

            },
            revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) || 3600,
        };
    }
}

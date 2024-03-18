/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "~/components/MKBox";
import MKBadge from "~/components/MKBadge";
import MKTypography from "~/components/MKTypography";

// Presentation page components
import ExampleCard from "~/pages/Presentation/components/ExampleCard";

// Data
import data from "~/pages/Presentation/sections/data/designBlocksData";

import axios from "axios";

function DesignBlocks() {
  // console.log("data", data);
  const [labData, setLabData] = useState(data[0]);
  const [categoryData, setCategoryData] = useState(data[1]);

  const provideImages = [
    {
      provider: "AZURE",
      image_url:
        "https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2022/05/Azure.png",
    },
    {
      provider: "AWS",
      image_url: "https://logohistory.net/wp-content/uploads/2023/06/AWS-Logo.jpg",
    },
    {
      provider: "GCP",
      image_url: "https://www.freecodecamp.org/news/content/images/2020/10/gcp.png",
    },
  ];

  const categoryImages = [
    {
      image: `https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/1282569/0712-Bad_Practices_in_Database_Design_-_Are_You_Making_These_Mistakes_Dan_Social-754bc73011e057dc76e55a44a954e0c3.png`,
      name: "Database",
    },
    {
      image: `https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shiksha.com%2Fonline-courses%2Farticles%2Fhow-to-learn-networking-from-scratch-beginners-guide%2F&psig=AOvVaw1DYPXKKp12B8eqdWcZC85_&ust=1710873311642000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKjv4PG5_oQDFQAAAAAdAAAAABAE`,
      name: "Networking",
    },
    {
      image: `https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.makeblock.com%2Fblogs%2Fideas%2Fis-programming-background-important-3-questions-you-should-think-clearly&psig=AOvVaw0cQR0SNIYxRCsgNAy0iT6y&ust=1710873360633000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCPD4jYm6_oQDFQAAAAAdAAAAABAE`,
      name: "Programming",
    },
    {
      image: `https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.spiceworks.com%2Ftech%2Fdevops%2Farticles%2Fwhat-is-virtual-machine%2F&psig=AOvVaw2RiEdVgte_k9u_lrIutoTf&ust=1710873402091000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNiv7Jy6_oQDFQAAAAAdAAAAABAE`,
      name: "Virtual Machine",
    },
  ];

  useEffect(() => {
    fetchLabsData();
    fetchCategoryData();
  }, []);

  const fetchLabsData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/labs`);
      const resData = await response.data;

      if (resData && resData.length > 0) {
        resData.forEach((labObject) => {
          const cloudService = labObject.cloudServices[0]; // Assuming only one cloud service per object
          let matchingImageURL;

          for (const imageLink of provideImages) {
            if (imageLink.provider === cloudService) {
              matchingImageURL = imageLink.image_url;
              break; // Exit the loop if the matching URL is found
            }
          }

          if (matchingImageURL) {
            labObject.image = matchingImageURL; // Add the link as a new property
          }
        });
        let labDataTemp = JSON.parse(JSON.stringify(labData));
        labDataTemp.items = resData;
        setLabData(labDataTemp);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories`);
      const resData = await response.data;
      if (resData && resData.length > 0) {
        resData.forEach((obj) => {
          const cloudService = obj.title.toLowerCase(); // Assuming only one cloud service per object
          let matchingImageURL;

          for (const imageLink of categoryImages) {
            if (imageLink.name.toLowerCase() === cloudService.toLowerCase()) {
              matchingImageURL = imageLink.image;
              break; // Exit the loop if the matching URL is found
            }
          }

          if (matchingImageURL) {
            obj.image = matchingImageURL; // Add the link as a new property
          }
        });
        let dataTemp = JSON.parse(JSON.stringify(categoryData));
        dataTemp.items = resData;
        setCategoryData(dataTemp);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderData = ({ title, description, items }) => (
    <Grid container spacing={3} sx={{ mb: 10 }} key={title}>
      <Grid item xs={12} lg={3}>
        <MKBox position="sticky" top="100px" pb={{ xs: 2, lg: 6 }}>
          <MKTypography variant="h3" fontWeight="bold" mb={1}>
            {title}
          </MKTypography>
          <MKTypography variant="body2" fontWeight="regular" color="secondary" mb={1} pr={2}>
            {description}
          </MKTypography>
        </MKBox>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Grid container spacing={3}>
          {items.map(
            ({ image, labTitle, title, count = 1, _id, pro, authorName, createdByName }) => (
              <Grid item xs={12} md={4} sx={{ mb: 2 }} key={name}>
                <Link to={`/view/${_id}`}>
                  <ExampleCard
                    image={image}
                    name={labTitle || title}
                    authorName={authorName || createdByName}
                    count={count}
                    pro={pro}
                  />
                </Link>
              </Grid>
            )
          )}
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <MKBox component="section" my={6} py={6}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 6, mx: "auto", px: 0.75 }}
        >
          <MKBadge
            variant="contained"
            color="info"
            badgeContent="Top Picked"
            container
            sx={{ mb: 2 }}
          />
          <MKTypography variant="h2" fontWeight="bold">
            Labs
          </MKTypography>
          {/* <MKTypography variant="body1" color="text">
            We have created multiple options for you to put together and customise into pixel
            perfect pages.
          </MKTypography> */}
        </Grid>
      </Container>
      <Container sx={{ mt: 6 }}>{renderData(labData)}</Container>
      <Container sx={{ mt: 6 }}>{renderData(categoryData)}</Container>
    </MKBox>
  );
}

export default DesignBlocks;

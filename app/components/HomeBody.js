import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import home from "../../public/home.jpg";
import Image from "next/image";

export default function HomeBody() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#E5E4E2",
          width: "100%",
          height: "900px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            top: "300px",
            width: "50%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              position: "relative",
              top: "-130px",
              fontSize: "20px",
              color: "black",
            }}
          >
            About US
          </Typography>
          <Typography
            sx={{
              position: "relative",
              top: "-120px",
              fontSize: "60px",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Best Education
          </Typography>
          <Typography
            sx={{
              position: "relative",
              top: "-110px",
              fontSize: "80px",
              color: "#2b5bc7",
              fontWeight: "bold",
            }}
          >
            Learning Center
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#2b5bc7",
                position: "relative",
                left: "50px",
                top: "-50px",
              }}
            >
              Education is the transmission of knowledge, skills, and character
              traits and manifests in various forms. Formal education occurs
              within a structured institutional framework, such as public
              schools, following a curriculum.
            </Typography>
          </Box>
          <Button
            href="/signup"
            sx={{
              color: "#ffffff",
              backgroundColor: "#2b5bc7",
              width: "250px",
              height: "40px",
            }}
          >
            Enroll Now
          </Button>
          <Box
            sx={{
              width: 150,
              height: 150,
              padding: -40,
              bgcolor: "#2b5bc7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "150px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              position: "relative",
              left: "-350px",
              top: "50px",
            }}
          ></Box>
        </Box>

        <Box
          sx={{
            width: 1000,
            height: 1200,
            position: "relative",
            left: "100px",
          }}
        >
          <Image src={home} alt="img" width={800} height={700} />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#E5E4E2",
          width: "100%",
          height: "500px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "30px",
            boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#ffffff",
            width: "500px",
            height: "300px",
          }}
        >
          <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
            Quality Teachers
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              color: "#2b5bc7",
            }}
          >
            Education is the transmission of knowledge, skills, and character
            traits and manifests in various forms.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "30px",
            boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#2b5bc7",
            width: "500px",
            height: "300px",
          }}
        >
          <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
            Quality Teachers
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              color: "#ffffff",
            }}
          >
            Education is the transmission of knowledge, skills, and character
            traits and manifests in various forms.
          </Typography>
        </Box>
      
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "30px",
            boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#E5E4E2",
            width: "500px",
            height: "300px",
          }}
        >
          <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
            Quality Teachers
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              color: "#2b5bc7",
            }}
          >
            Education is the transmission of knowledge, skills, and character
            traits.
          </Typography>
        </Box>
       
      </Box>
    </Box>
  );
}

"use client";
import {
  Link,
  Switch,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; 

export default function Consumers() {
  const [data, setData] = useState([]);
  const router = useRouter(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://api.staging.springprod.com/auth/v1/consumer/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => console.error("Error fetching consumers:", error));
  }, []);


  const handleConsumerDelete = async (consumerId) => {
    if (!window.confirm("Are you sure you want to delete this consumer?")) {
      return;
    }

 
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://api.staging.springprod.com/auth/v1/consumer/${consumerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Deleted response", response);
      alert("Consumer deleted successfully!");

  
      setData(data.filter((item) => item.consumerId !== consumerId));
 
     
    
  };

  const handleUpdate = (item) => {
    router.push(`/update-consumer?id=${item.consumerId}`);
  };

  return (
    <Box sx={{ width: "1450px" }}>
      <Box
        sx={{
          backgroundColor: "#2b5bc7",
          height: "100px",
          position: "relative",
          top: "40px",
          borderRadius: "25px",
          left: "10px",
          boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            fontWeight: "bold",
            width: "100%",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
            position: "relative",
            top: "30px",
            color: "#ffffff",
          }}
        >
          Consumers List
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          height: "1000px",
          position: "relative",
          top: "80px",
          borderRadius: "25px",
          left: "10px",
          boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#ffffff",
            width: "1330px",
            height: "900px",
            position: "relative",
            left: "50px",
            top: "35px",
          }}
        >
            <Link href="/add-consumer" sx={{display:"flex", justifyContent:"flex-end"}}>
            <Button variant="contained" color="success">
              Add Consumer
            </Button>
          </Link>
          <Container>
            <List>
              {data.map((item) => (
                <ListItem key={item.consumerId} divider>
                  <ListItemText
                    primary={` Name: ${item.consumerName}`}
                    secondary={
                      <>
                        <Typography variant="body2" component="span">
                          Consumer ID: {item.consumerId}
                        </Typography>
                        <br />
                        <Typography variant="body2" component="span">
                          Latest Android Version: {item.latestAndroidVersion}
                        </Typography>
                        <br />
                        <Typography variant="body2" component="span">
                          Web URL:{" "}
                          <Link
                            href={item.webSdkUrl}
                            target="_blank"
                            rel="noopener"
                          >
                            {item.webSdkUrl}
                          </Link>
                        </Typography>
                        <br />
                        <Typography variant="body2" component="span">
                          Account created at: {item.createdAt}
                        </Typography>
                        <br />
                        <Typography variant="body2" component="span">
                          Account updated at: {item.updatedAt}
                        </Typography>
                      </>
                    }
                  />
                  <Typography>{item.isActive ? "Online" : "Offline"}</Typography>
                  <Switch checked={item.isActive} disabled />
                  <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                  
                    <Button
                      onClick={() => handleUpdate(item)}
                      variant="contained"
                      color="primary"
                    >
                      Update
                    </Button>

               
                    <Button
                      onClick={() => handleConsumerDelete(item.consumerId)}
                      variant="contained"
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Container>

        
        
        </Box>
      </Box>
    </Box>
  );
}

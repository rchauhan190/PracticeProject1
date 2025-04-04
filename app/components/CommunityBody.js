import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import Image from "next/image";
import dp from "../../public/dp.png";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function CommunityBody() {
  return (
    <Box
      sx={{
        position: "relative",
        top: "40px",
        left: "10px",
        width: "133vh",
        height: "770px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography
        variant="h4"
        textAlign=""
        sx={{
          fontWeight: "bold",
          position: "relative",
          left: "30px",
          top: "20px",
          width: "100%",
          fontSize: "30px",
        }}
      >
        Community Forum
      </Typography>
      <Box
        sx={{
          position: "relative",
          left: "950px",
          width: "300px",
          top: "-10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <SearchIcon sx={{ color: "#2b5bc7" }} />
        <FilterAltIcon sx={{ color: "#2b5bc7" }} />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#2b5bc7",

            borderRadius: "8px",
            width: "150px",
            height: "36px",
          }}
        >
          Create Query
        </Button>
      </Box>
      <Divider></Divider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          left: "45px",
          top: "20px",
        }}
      >
        <Box
          sx={{
            width: "1200px",
            position: "relative",
            left: "-5px",
            top: "-5px",
            height: "149px",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "300px",
              height: "60px",
              margin: "20px",
            }}
          >
            <Image
              src={dp}
              alt="user"
              width={50}
              height={50}
              style={{
                borderRadius: "65px",
                border: "2px solid white",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                left: "-145",
              }}
            >
              <Typography
                variant="h4"
                textAlign=""
                sx={{
                  position: "relative",
                  top: "10px",
                  left: "15px",

                  width: "100%",
                  fontSize: "18px",
                }}
              >
                Sam Helman
              </Typography>
              <Typography
                variant="h4"
                textAlign=""
                sx={{
                  width: "100%",
                  fontSize: "12px",
                  position: "relative",
                  top: "10px",
                  left: "15px",
                  color: "gray",
                }}
              >
                Posted 14 Min ago
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#000000",
              position: "relative",
              left: "1070px",
              top: "-90px",
              borderRadius: "8px",
              width: "110px",
              height: "30px",
            }}
          >
            lorem
          </Button>
          <Typography
            variant="h4"
            textAlign=""
            sx={{
              width: "100%",
              fontSize: "15px",
              position: "relative",
              top: "-45px",
              left: "15px",
              color: "gray",
            }}
          >
            Lorem ipsum odor amet, consectetuer adipiscing elit. Parturient
            facilisis orci a, urna libero vel tellus.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",

              width: "350px",
              height: "15px",
              position: "relative",
              top: "-25px",
              left: "10px",
            }}
          >
            <ThumbUpIcon fontSize="small" sx={{ color: "#2b5bc7" }} />
            <ThumbDownAltIcon fontSize="small" sx={{ color: "gray" }} />
            <ModeCommentIcon fontSize="small" sx={{ color: "gray" }} />
          </Box>
        </Box>
        <Box
          sx={{
            width: "1200px",
            height: "149px",
            position: "relative",
            left: "-5px",
            top: "10px",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "300px",
              height: "60px",
              margin: "20px",
            }}
          >
            <Image
              src={dp}
              alt="user"
              width={50}
              height={50}
              style={{
                borderRadius: "65px",
                border: "2px solid white",
              }}
            />
             <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                left: "-145",
              }}
            >
              <Typography
                variant="h4"
                textAlign=""
                sx={{
                  position: "relative",
                  top: "10px",
                  left: "15px",

                  width: "100%",
                  fontSize: "18px",
                }}
              >
                Sam Helman
              </Typography>
              <Typography
                variant="h4"
                textAlign=""
                sx={{
                  width: "100%",
                  fontSize: "12px",
                  position: "relative",
                  top: "10px",
                  left: "15px",
                  color: "gray",
                }}
              >
                Posted 14 Min ago
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#000000",
              position: "relative",
              left: "1070px",
              top: "-90px",
              borderRadius: "8px",
              width: "110px",
              height: "30px",
            }}
          >
            lorem
          </Button>
          <Typography
            variant="h4"
            textAlign=""
            sx={{
              width: "100%",
              fontSize: "15px",
              position: "relative",
              top: "-45px",
              left: "15px",
              color: "gray",
            }}
          >
            Lorem ipsum odor amet, consectetuer adipiscing elit. Parturient
            facilisis orci a, urna libero vel tellus.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",

              width: "350px",
              height: "15px",
              position: "relative",
              top: "-25px",
              left: "10px",
            }}
          >
            <ThumbUpIcon fontSize="small" sx={{ color: "#2b5bc7" }} />
            <ThumbDownAltIcon fontSize="small" sx={{ color: "gray" }} />
            <ModeCommentIcon fontSize="small" sx={{ color: "gray" }} />
          </Box>
        </Box>
        <Box
          sx={{
            width: "1200px",
            height: "149px",
            position: "relative",
            left: "-5px",
            top: "25px",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "300px",
              height: "60px",
              margin: "20px",
            }}
          >
            <Image
              src={dp}
              alt="user"
              width={50}
              height={50}
              style={{
                borderRadius: "65px",
                border: "2px solid white",
              }}
            />
        <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                left: "-145px¸",
              }}
            >
              <Typography
                variant="h4"
                textAlign=""
                sx={{
                  position: "relative",
                  top: "10px",
                  left: "15px",

                  width: "100%",
                  fontSize: "18px",
                }}
              >
                Sam Helman
              </Typography>
              <Typography
                variant="h4"
                textAlign=""
                sx={{
                  width: "100%",
                  fontSize: "12px",
                  position: "relative",
                  top: "10px",
                  left: "15px",
                  color: "gray",
                }}
              >
                Posted 14 Min ago
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#000000",
              position: "relative",
              left: "1070px",
              top: "-90px",
              borderRadius: "8px",
              width: "110px",
              height: "30px",
            }}
          >
            lorem
          </Button>
          <Typography
            variant="h4"
            textAlign=""
            sx={{
              width: "100%",
              fontSize: "15px",
              position: "relative",
              top: "-45px",
              left: "15px",
              color: "gray",
            }}
          >
            Lorem ipsum odor amet, consectetuer adipiscing elit. Parturient
            facilisis orci a, urna libero vel tellus.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",

              width: "350px",
              height: "15px",
              position: "relative",
              top: "-25px",
              left: "10px",
            }}
          >
            <ThumbUpIcon fontSize="small" sx={{ color: "#2b5bc7" }} />
            <ThumbDownAltIcon fontSize="small" sx={{ color: "gray" }} />
            <ModeCommentIcon fontSize="small" sx={{ color: "gray" }} />
          </Box>
        </Box>
        <Box
          sx={{
            width: "1200px",
            height: "149px",
            position: "relative",
            left: "-5px",
            top: "40px",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "300px",
              height: "60px",
              margin: "20px",
            }}
          >
            <Image
              src={dp}
              alt="user"
              width={50}
              height={50}
              style={{
                borderRadius: "65px",
                border: "2px solid white",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                left: "-145",
              }}
            >
              <Typography
                variant="h4"
                textAlign=""
                sx={{
                  position: "relative",
                  top: "10px",
                  left: "15px",

                  width: "100%",
                  fontSize: "18px",
                }}
              >
                Sam Helman
              </Typography>
              <Typography
                variant="h4"
                textAlign=""
                sx={{
                  width: "100%",
                  fontSize: "12px",
                  position: "relative",
                  top: "10px",
                  left: "15px",
                  color: "gray",
                }}
              >
                Posted 14 Min ago
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#000000",
              position: "relative",
              left: "1070px",
              top: "-90px",
              borderRadius: "8px",
              width: "110px",
              height: "30px",
            }}
          >
            lorem
          </Button>
          <Typography
            variant="h4"
            textAlign=""
            sx={{
              width: "100%",
              fontSize: "15px",
              position: "relative",
              top: "-45px",
              left: "15px",
              color: "gray",
            }}
          >
            Lorem ipsum odor amet, consectetuer adipiscing elit. Parturient
            facilisis orci a, urna libero vel tellus.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",

              width: "350px",
              height: "15px",
              position: "relative",
              top: "-25px",
              left: "10px",
            }}
          >
            <ThumbUpIcon fontSize="small" sx={{ color: "#2b5bc7" }} />
            <ThumbDownAltIcon fontSize="small" sx={{ color: "gray" }} />
            <ModeCommentIcon fontSize="small" sx={{ color: "gray" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

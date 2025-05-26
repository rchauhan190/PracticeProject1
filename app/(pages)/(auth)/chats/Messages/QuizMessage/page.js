import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const QuizMessage = ({ quiz }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleOptionClick = (index) => {
    setSelectedIndex(index);
  };

  // Function to format text to lowercase with the first letter uppercase
  const formatText = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <Box sx={{ width: "100%", borderRadius: 2 }}>
      <Typography variant="body1" sx={{ mb: 2, fontSize: "1.1rem", fontWeight: "500" }}>
        {quiz.question.trim()}
      </Typography>

      {quiz.options.map((option, index) => {
        const isSelected = selectedIndex === index;

        return (
          <Button
            key={index}
            onClick={() => handleOptionClick(index)}
            variant="outlined"
            size="medium"
            fullWidth
            disableRipple
            sx={{
                width:"100%",
                
              justifyContent: "flex-start",
              textAlign: "left",
              mb: 1,
              py: 1.5,
              px: 2,
              borderRadius: 3,
              backgroundColor: isSelected ? "#FEE400" : "#04CFC0", 
              color: isSelected ? "#000" : "#fff", 
              border: "none",
              '&:focus': { outline: "none" },
              '&.Mui-focusVisible': { outline: "none", boxShadow: "none" },
            }}
          >
            {/* Circle icon on the left */}
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: `2px solid ${isSelected ? "#000" : "#fff"}`, 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // ml: 1,
              }}
            >
              {isSelected ? (
                <CheckCircleIcon sx={{ color: "#000", fontSize: "16px" }} />
              ) : (
                <RadioButtonUncheckedIcon sx={{ color: "#fff", fontSize: "16px" }} />
              )}
            </Box>

            {/* Text with first letter uppercase and the rest lowercase */}
            <Typography sx={{ ml: 1, textTransform: "capitalize", fontSize: "14px",fontWeight:400 }}>
              {formatText(option)}
            </Typography>
          </Button>
        );
      })}
    </Box>
  );
};

export default QuizMessage;

import React, { useMemo, useState } from "react";

import "../../../../assets/fonts/benzin-bold.ttf";
import "../../../../assets/fonts/benzin-semibold.ttf";

import Stories from "react-insta-stories";

import { Box } from "@mui/material";

const StoryComponent = ({ storyData }) => {
  const [isLastStory, setIsLastStory] = useState(false);

  const handleStoryEnd = () => {
    setIsLastStory(true);
  };

  const handleStoryChange = (currentIndex) => {
    setIsLastStory(currentIndex === storyData.length - 1);
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "var(--tg-theme-bg-color)",
        }}
      >
        <Stories
          stories={storyData}
          defaultInterval={1500}
          width={"100vw"}
          height={"100vh"}
          onStoryEnd={handleStoryEnd}
          onAllStoriesEnd={() => setIsLastStory(true)}
          onStoryChange={handleStoryChange}
          preventDefault={isLastStory}
        />
      </Box>
    </>
  );
};

export default StoryComponent;

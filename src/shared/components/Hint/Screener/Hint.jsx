import React, { useState, useEffect } from "react";
import { Backdrop, Box, Button, Modal, Typography } from "@mui/material";

const SharedBackdrop = ({ open, onClose }) => {
  return (
    <Backdrop
      open={open}
      onClick={onClose}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: "opacity 0.5s",
        backgroundColor: "rgba(0, 0, 0, 0.65)",
      }}
    ></Backdrop>
  );
};

const ModalScreenerBtn = ({ open, handleClose, iconButtonRect }) => {
  if (!iconButtonRect) {
    // Если iconButtonRect не определен, вернуть null или что-то другое, что подходит для вашего случая
    return null;
  }
  const { top, left } = iconButtonRect;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      disableAutoFocus
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          style: { backgroundColor: "rgba(0, 0, 0, 0)" }, // Делает подложку прозрачной
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          top: `calc(${top}px + 30px)`,
          left: `${left}px`,
          color: "var(--tg-theme-text-color)",
        }}
      >
        <Box
          sx={{
            width: "35px",
            height: "30px",
            border: "2px dashed var(--tg-theme-link-color)",
            marginRight: "20px",
          }}
        ></Box>
        <Box
          sx={{
            height: "100px",
            width: "150px",
            bgcolor: "var(--tg-theme-bg-color)",
          }}
        >
          <Typography
            sx={{
              margin: "5px",
              fontSize: "12px",
            }}
          >
            Тут находится кнопка открытия скринера монеты
          </Typography>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              position: "absolute",
              right: "0",
              padding: "0",
              margin: "5px",
              minWidth: "0",
              width: "50px",
              height: "25px",
              bgcolor: "var(--tg-theme-button-color)",
              color: "var(--tg-theme-text-color)",
              fontSize: "12px",
            }}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
const ModalSortBtn = ({ open, handleClose, iconButtonRect }) => {
  if (!iconButtonRect) {
    // Если iconButtonRect не определен, вернуть null или что-то другое, что подходит для вашего случая
    return null;
  }
  const { top, left } = iconButtonRect;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      disableAutoFocus
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          style: { backgroundColor: "rgba(0, 0, 0, 0)" }, // Делает подложку прозрачной
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          top: `calc(${top}px + 3px)`,
          left: `calc(${left}px + 35px)`,
          color: "var(--tg-theme-text-color)",
        }}
      >
        <Box
          sx={{
            width: "65px",
            height: "25px",
            border: "2px dashed var(--tg-theme-link-color)",
            marginRight: "20px",
          }}
        ></Box>
        <Box
          sx={{
            height: "80px",
            width: "150px",
            bgcolor: "var(--tg-theme-bg-color)",
          }}
        >
          <Typography
            sx={{
              margin: "5px",
              fontSize: "12px",
            }}
          >
            При нажатии на Имя происходит сортировка
          </Typography>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: "0",
              padding: "0",
              margin: "5px",
              minWidth: "0",
              width: "50px",
              height: "25px",
              bgcolor: "var(--tg-theme-button-color)",
              color: "var(--tg-theme-text-color)",
              fontSize: "12px",
            }}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
const ModalFiltersBtn = ({ open, handleClose, iconButtonRect }) => {
  if (!iconButtonRect) {
    // Если iconButtonRect не определен, вернуть null или что-то другое, что подходит для вашего случая
    return null;
  }
  const { top, left } = iconButtonRect;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      disableAutoFocus
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          style: { backgroundColor: "rgba(0, 0, 0, 0)" }, // Делает подложку прозрачной
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          top: `calc(${top}px - 35px)`,
          left: `calc(${left}px + 30px)`,
          color: "var(--tg-theme-text-color)",
        }}
      >
        <Box
          sx={{
            width: "135px",
            height: "40px",
            border: "2px dashed var(--tg-theme-link-color)",
            marginRight: "20px",
          }}
        ></Box>
        <Box
          sx={{
            height: "80px",
            width: "150px",
            bgcolor: "var(--tg-theme-bg-color)",
          }}
        >
          <Typography
            sx={{
              margin: "5px",
              fontSize: "12px",
            }}
          >
            Возможность фильтрации таблицы
          </Typography>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: "0",
              padding: "0",
              margin: "5px",
              minWidth: "0",
              width: "50px",
              height: "25px",
              bgcolor: "var(--tg-theme-button-color)",
              color: "var(--tg-theme-text-color)",
              fontSize: "12px",
            }}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
const ModalResetBtn = ({ open, handleClose, iconButtonRect }) => {
  if (!iconButtonRect) {
    // Если iconButtonRect не определен, вернуть null или что-то другое, что подходит для вашего случая
    return null;
  }
  const { top, left } = iconButtonRect;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      disableAutoFocus
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          style: { backgroundColor: "rgba(0, 0, 0, 0)" }, // Делает подложку прозрачной
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          top: `calc(${top}px - 28px)`,
          left: `calc(${left}px + 3px)`,
          color: "var(--tg-theme-text-color)",
        }}
      >
        <Box
          sx={{
            width: "30px",
            height: "58px",
            border: "2px dashed var(--tg-theme-link-color)",
            marginRight: "20px",
          }}
        ></Box>
        <Box
          sx={{
            height: "80px",
            width: "150px",
            bgcolor: "var(--tg-theme-bg-color)",
          }}
        >
          <Typography
            sx={{
              margin: "5px",
              fontSize: "12px",
            }}
          >
            Кнопки сброса фильтров и сортировки
          </Typography>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: "0",
              padding: "0",
              margin: "5px",
              minWidth: "0",
              width: "50px",
              height: "25px",
              bgcolor: "var(--tg-theme-button-color)",
              color: "var(--tg-theme-text-color)",
              fontSize: "12px",
            }}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const DelayedModal = ({ iconButtonRect }) => {
  const [openScreenerBtn, setOpenScreenerBtn] = useState(false);
  const [openSortBtn, setOpenSortBtn] = useState(false);
  const [openFiltersBtn, setOpenFiltersBtn] = useState(false);
  const [openResetBtn, setOpenResetBtn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenScreenerBtn(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseScreenerHint = () => {
    setOpenScreenerBtn(false);
    setOpenSortBtn(true);
  };
  const handleCloseSortHint = () => {
    setOpenSortBtn(false);
    setOpenFiltersBtn(true);
  };
  const handleCloseFiltersHint = () => {
    setOpenFiltersBtn(false);
    setOpenResetBtn(true);
  };
  const handleCloseResetHint = () => {
    setOpenResetBtn(false);
  };

  return (
    <>
      <SharedBackdrop
        open={openScreenerBtn || openSortBtn || openFiltersBtn || openResetBtn}
        onClose={() => {}}
      />
      <ModalScreenerBtn
        open={openScreenerBtn}
        handleClose={handleCloseScreenerHint}
        iconButtonRect={iconButtonRect}
      />
      <ModalSortBtn
        open={openSortBtn}
        handleClose={handleCloseSortHint}
        iconButtonRect={iconButtonRect}
      />
      <ModalFiltersBtn
        open={openFiltersBtn}
        handleClose={handleCloseFiltersHint}
        iconButtonRect={iconButtonRect}
      />
      <ModalResetBtn
        open={openResetBtn}
        handleClose={handleCloseResetHint}
        iconButtonRect={iconButtonRect}
      />
    </>
  );
};

export default DelayedModal;

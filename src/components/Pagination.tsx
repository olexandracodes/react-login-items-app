import React from "react";
import { Pagination, Box } from "@mui/material";

interface PaginationComponentProps {
	totalPages: number;
	currentPage: number;
	onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
	totalPages,
	currentPage,
	onPageChange,
}) => {
	if (totalPages < 1) return null;

	return (
		<Box
			sx={{
				position: "fixed",
				bottom: "20px",
				left: "50%",
				transform: "translateX(-50%)",
				display: "flex",
				justifyContent: "center",
				width: "100%",
				zIndex: 10,
			}}
		>
			<Pagination
				count={totalPages}
				page={currentPage}
				onChange={onPageChange}
				color="primary"
			/>
		</Box>
	);
};

export default PaginationComponent;

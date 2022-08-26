import React from 'react';

import {
  Image,
  Text,
  View,
} from 'react-native';

const ContributionCard = ({ data }) => (
	<View
		style={{
			display: "flex",
			justifyContent: "flex-start",
			alignItems: "center",
			flexDirection: "row",
		}}
	>
		<View
			style={{
				height: 80,
				width: 80,
				backgroundColor: "gray",
				borderRadius: 6,
				margin: 8,
				overflow: "hidden",
			}}
		>
			<Image
				style={{ height: 80, width: 80 }}
				source={{
					uri: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80",
				}}
			/>
		</View>
		<View
			style={{
				flexDirection: "column",
				justifyContent: "space-between",
				flex: 1,
				paddingVertical: 10,
			}}
		>
			<View>
				<Text>{data.title}</Text>
				<Text style={{ color: "gray" }}>{data.description}</Text>
			</View>
			<Text>{parseInt(data.dist.calculated / 1000)} KM away</Text>
		</View>
	</View>
);

export default ContributionCard;

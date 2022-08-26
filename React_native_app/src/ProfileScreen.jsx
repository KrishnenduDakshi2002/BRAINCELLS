import React from 'react';

import {
  ScrollView,
  Text,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import {
  AntDesign,
  SimpleLineIcons,
} from '@expo/vector-icons';

import Achievement from './components/Achievement';
import Header from './components/Header';

const contributions = [
	{
		description: "donated a book",
		relativeTime: "3 days",
	},
];
const eventLocations = [
	{
		name: "Book distribution camp",
		description: "This is the description for book distribution",
		location: {
			latitude: 22.9999,
			longitude: 88.455,
		},
		date: new Date("2022-08-26T10:30:00Z"),
	},
	{
		name: "Counseling camp",
		description: "This is the description for counseling camp",
		location: {
			latitude: 22.998,
			longitude: 88.42,
		},
		date: new Date("2022-08-30T11:30:00Z"),
	},
	{
		name: "Offline classes",
		description: "This is the description for offline classes",
		location: {
			latitude: 22.93,
			longitude: 88.4,
		},
		date: new Date("2022-09-02T10:30:00Z"),
	},
];

const ProfileScreen = ({ route, navigation }) => {
	console.log("user", route.params);
	return (
		<ScrollView style={{ marginTop: 30 }}>
			<Header title="Profile" />
			<View
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "row",
				}}
			>
				<View
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<View
						style={{
							backgroundColor: "gray",
							borderRadius: 50,
							height: 100,
							width: 100,
							display: "flex",
							alignItems: "center",
							flexDirection: "column",
							justifyContent: "center",
						}}
					>
						<AntDesign size={70} name="user" />
					</View>
					<Text style={{ textAlign: "center", fontSize: 18, marginTop: 15 }}>
						{route.params.name}
					</Text>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							marginVertical: 10,
						}}
					>
						{new Array(route.params.badges).fill(0).map((item) => (
							<SimpleLineIcons style={{ margin: 4 }} name="badge" />
						))}
					</View>
				</View>
			</View>
			{/* Achievements section */}
			<View
				style={{
					display: "flex",
					justifyContent: "space-evenly",
					alignItems: "center",
					flexDirection: "row",
					marginTop: 25,
				}}
			>
				<Achievement
					value={route.params.contributions}
					subheading={"contributions"}
				/>
				<Achievement value={route.params.badges} subheading={"badges"} />
				<Achievement value={route.params.points} subheading={"points"} />
			</View>
			{/* Impact map */}
			<View>
				<Text
					style={{
						marginTop: 30,
						marginBottom: 20,
						fontSize: 20,
						marginHorizontal: 10,
					}}
				>
					My Impact Map
				</Text>
				<MapView
					initialRegion={{
						latitude: 22.9747,
						longitude: 88.4337,
						latitudeDelta: 0.2022,
						longitudeDelta: 0.1021,
					}}
					style={{ height: 300 }}
				>
					{eventLocations.map((location) => (
						<Marker coordinate={location.location} />
					))}
				</MapView>
			</View>
			{/* Recent activities */}
			<View>
				<Text
					style={{
						marginTop: 30,
						marginBottom: 20,
						fontSize: 20,
						marginHorizontal: 10,
					}}
				>
					My Recent Contributions
				</Text>
				{contributions.map((item) => (
					<View style={{ marginHorizontal: 10 }}>
						<Text>
							<Text style={{ fontWeight: "bold" }}>{route.params.name}</Text>{" "}
							{item.description}
						</Text>
						<Text style={{ color: "gray" }}>{item.relativeTime} ago</Text>
					</View>
				))}
			</View>
		</ScrollView>
	);
};

export default ProfileScreen;

import React, { useState } from 'react';

import {
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import MapView, {
  Callout,
  Marker,
} from 'react-native-maps';

import { Entypo } from '@expo/vector-icons';

import Header from './components/Header';

// const eventLocations = [
// 	{
// 		name: "Book Distribution camp",
// 		description: "This event will donate 500 books for children in the area",
// 		location: {
// 			latitude: 22.9347,
// 			longitude: 88.2337,
// 		},
// 	},
// ];
const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
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
const EventScreen = ({ navigation }) => {
	const [selectedEvent, setSelectedEvent] = useState(undefined);
	return (
		<View style={{ marginTop: 30 }}>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Header title="Events" />
				<Pressable
					onPress={() => {
						navigation.navigate("AddEvent");
					}}
					style={{
						margin: 10,
						paddingHorizontal: 10,
						paddingVertical: 7,
						backgroundColor: "green",
						borderRadius: 6,
					}}
				>
					<Text style={{ color: "white" }}>Add event</Text>
				</Pressable>
			</View>
			<MapView
				style={{ height: 300 }}
				initialRegion={{
					latitude: 22.9747,
					longitude: 88.4337,
					latitudeDelta: 0.2022,
					longitudeDelta: 0.1021,
				}}
			>
				{(selectedEvent ? [selectedEvent] : eventLocations).map(
					(location, index) => (
						<Marker key={index} coordinate={location.location}>
							<Callout>
								<View>
									<Text>{location.name}</Text>
									<Text style={{ color: "gray" }}>{location.description}</Text>
								</View>
							</Callout>
						</Marker>
					)
				)}
			</MapView>
			<View>
				<FlatList
					data={eventLocations}
					ListHeaderComponent={
						<View>
							<Text style={{ fontSize: 16, margin: 10 }}>
								Active/Upcoming events in the area
							</Text>
						</View>
					}
					renderItem={({ item }) => (
						<Pressable
							onPress={() => {
								if (selectedEvent?.name === item.name)
									setSelectedEvent(undefined);
								else setSelectedEvent(item);
							}}
							style={{
								borderColor:
									selectedEvent?.name === item.name ? "black" : "transparent",
								borderWidth: 1,
								backgroundColor: "#dadada",
								margin: 10,
								padding: 10,
								borderRadius: 6,
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "flex-start",
									alignItems: "center",
								}}
							>
								<View
									style={{
										backgroundColor: "gray",
										marginVertical: 4,
										marginLeft: 4,
										marginRight: 8,
										padding: 4,
										paddingHorizontal: 8,
										borderRadius: 4,
									}}
								>
									<Text style={{ color: "white" }}>{item.date.getDate()}</Text>
									<Text style={{ color: "white" }}>
										{months[item.date.getMonth()]}
									</Text>
								</View>
								<View>
									<Text style={{ fontWeight: "500" }}>{item.name}</Text>
									<Text style={{ color: "gray", flex: 1 }}>
										{item.description}
									</Text>
								</View>
							</View>
							<Pressable
								onPress={() => {
									navigation.navigate("EventDetails", JSON.stringify(item));
								}}
							>
								<Entypo style={{ padding: 6 }} name="chevron-right" size={20} />
							</Pressable>
						</Pressable>
					)}
				/>
			</View>
		</View>
	);
};
export default EventScreen;

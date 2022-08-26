import React, { useState } from 'react';

import {
  Pressable,
  Text,
  View,
} from 'react-native';
import MapView, {
  Callout,
  Marker,
} from 'react-native-maps';

import Header from './components/Header';

const EventDetails = ({ navigation, route }) => {
	const [event, setEvent] = useState(JSON.parse(route.params));
	console.log("event details", JSON.parse(route.params));
	console.log("event", event);
	return (
		<View style={{ marginTop: 30 }}>
			<Header title="Event Details" />

			{event.location && (
				<MapView
					initialRegion={{
						latitude: event.location.latitude,
						longitude: event.location.longitude,
						latitudeDelta: 0.2022,
						longitudeDelta: 0.1021,
					}}
					style={{ height: 300 }}
				>
					<Marker coordinate={event.location} />
					{/* <Callout title="aisbd" /> */}
					<Marker coordinate={event.location}>
						<Callout>
							<View>
								<Text>{event.name}</Text>
								<Text style={{ color: "gray" }}>{event.description}</Text>
							</View>
						</Callout>
					</Marker>
				</MapView>
			)}

			<View>
				<Text style={{ margin: 30, fontSize: 19 }}>{event.name}</Text>
				<Text style={{ marginHorizontal: 30, color: "gray" }}>
					{event.description}
				</Text>
			</View>
			<Pressable
				onPress={() => {}}
				style={{
					marginVertical: 30,
					marginHorizontal: 8,
					backgroundColor: "#28800b",
					paddingHorizontal: 20,
					paddingVertical: 15,
					borderRadius: 6,
				}}
			>
				<Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
					Contact organizers
				</Text>
			</Pressable>
		</View>
	);
};

export default EventDetails;

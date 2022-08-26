import React, {
  useCallback,
  useState,
} from 'react';

import axios from 'axios';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  ToastAndroid,
  View,
} from 'react-native';

import Header from './components/Header';
import Credentials from './credentials';

const AllCategoriesScreen = ({ navigation }) => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const getAllCategories = useCallback(async () => {
		try {
			const res = await axios.get(Credentials.baseUrl + "/api/data/categories");
			console.log("res", res.data.Categories);
			setCategories([
				...res.data.Categories,
				...res.data.Categories,
				...res.data.Categories,
			]);
		} catch (err) {
			ToastAndroid.show("Failed to load data from API", ToastAndroid.SHORT);
		}
	}, []);
	React.useEffect(() => {
		getAllCategories();
	}, []);
	return (
		<View style={{ marginTop: 30, flex: 1 }}>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Header title="All Categories" />
				<Pressable
					onPress={() => {
						navigation.navigate("Donate");
					}}
				>
					<View
						style={{
							margin: 10,
							paddingHorizontal: 10,
							paddingVertical: 7,
							backgroundColor: "green",
							borderRadius: 6,
						}}
					>
						<Text style={{ color: "white" }}>Donate</Text>
					</View>
				</Pressable>
			</View>
			<FlatList
				style={{ flex: 1 }}
				data={categories}
				contentContainerStyle={{
					marginHorizontal: 12,
				}}
				ListEmptyComponent={
					<View style={{ alignItems: "center", marginTop: 20 }}>
						<Text style={{ color: "gray" }}>Loading, please wait...</Text>
						<ActivityIndicator size={20} color={"gray"} />
					</View>
				}
				renderItem={({ item }) => (
					<Pressable
						onPress={() => {
							navigation.navigate("Search", { category: item });
						}}
						style={{
							marginHorizontal: 6,
							marginVertical: 8,
							backgroundColor: "#dddddd",
							padding: 10,
							borderRadius: 6,
						}}
					>
						<Text style={{ fontSize: 14 }}>{item.name}</Text>
						<Text numberOfLines={2} style={{ color: "gray" }}>
							{item.description}
						</Text>
					</Pressable>
				)}
			/>
		</View>
	);
};

export default AllCategoriesScreen;

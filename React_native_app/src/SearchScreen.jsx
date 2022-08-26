import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  ActivityIndicator,
  FlatList,
  Switch,
  Text,
  View,
} from 'react-native';

import ContributionCard from './components/ContributionCard';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Credentials from './credentials';
import useDebounce from './utils/useDebounce';

const SearchScreen = ({ navigation, route }) => {
	const [searchText, setSearchText] = useState("");
	const debouncedText = useDebounce(searchText, 500);
	const [free, setFree] = useState(false);
	const [loading, setLoading] = useState(true);
	const [contributions, setContributions] = useState([]);
	const search = useCallback(async () => {
		try {
			setLoading(true);
			setContributions([]);
			console.log("searching", searchText);
			let url =
				Credentials.baseUrl +
				"/contribution/search?category_id=630653d6675153a6fc53b912&lat=22&lng=88";
			if (searchText !== "") {
				url += "&search=" + searchText;
			}
			if (free) {
				url += "&isFree=True";
			}
			const res = await axios.get(url);
			console.log("res", res.data);
			setContributions(res.data.Contributions);
		} catch (err) {
			console.log("err", err);
		} finally {
			setLoading(false);
		}
	}, [debouncedText, free]);
	useEffect(() => {
		search();
		console.log("trying to search");
	}, [free, debouncedText]);
	return (
		<View style={{ marginTop: 20, flex: 1 }}>
			<Header title={route.params.category.name} />
			<View>
				<SearchBar
					value={searchText}
					onChangeText={(text) => {
						setSearchText(text);
					}}
				/>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginHorizontal: 12,
						backgroundColor: "#eaeaea",
						borderRadius: 6,
						paddingHorizontal: 10,
					}}
				>
					<Text>Search for free options only</Text>
					<Switch value={free} onChange={() => setFree(!free)} />
				</View>
			</View>
			<FlatList
				contentContainerStyle={{ flex: 1 }}
				style={{ flex: 1 }}
				// stickyHeaderIndices={[0]}
				renderItem={({ item }) => <ContributionCard data={item} />}
				data={contributions}
				// ListHeaderComponent={() => (

				// )}
				ListEmptyComponent={
					<View style={{ alignItems: "center" }}>
						<Text>searching...</Text>
						<ActivityIndicator color={"gray"} />
					</View>
				}
			/>
		</View>
	);
};

export default SearchScreen;

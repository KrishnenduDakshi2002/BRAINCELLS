import React from 'react';

import {
  TextInput,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({
	value,
	onChangeText,
	placeholder = "type something...",
}) => (
	<View
		style={{
			borderColor: "#cacaca",
			borderRadius: 6,
			borderWidth: 1,
			paddingHorizontal: 8,
			margin: 10,
			display: "flex",
			justifyContent: "flex-start",
			flexDirection: "row",
			alignItems: "center",
		}}
	>
		<Ionicons
			size={16}
			style={{ marginRight: 6, marginVertical: 10 }}
			name="search"
			color={"#cacaca"}
		/>
		<TextInput
			value={value}
			onChangeText={onChangeText}
			placeholder={placeholder}
		/>
	</View>
);

export default SearchBar;

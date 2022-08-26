import React from 'react';

import { View } from 'react-native';

import Header from './components/Header';

const AddEventScreen = ({ navigation }) => (
	<View style={{ marginTop: 30 }}>
		<Header title="Create a new event" />
	</View>
);

export default AddEventScreen;

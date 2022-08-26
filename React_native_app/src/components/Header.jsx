import React from 'react';

import {
  Text,
  View,
} from 'react-native';

const Header = ({ title = "header" }) => (
	<View style={{ marginHorizontal: 16, marginVertical: 10 }}>
		<Text style={{ fontSize: 16 }}>{title}</Text>
	</View>
);

export default Header;

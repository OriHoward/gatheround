import { StyleSheet, View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { Searchbar } from 'react-native-paper'
import CustomButton from '../../components/CustomButton'
import { AxiosContext } from '../../../context/AxiosContext'

const SearchScreen = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [dataToDisplay, setDataDataToDisplay] = useState([])
	const { authAxios } = useContext(AxiosContext)

	const onChangeSearch = (query) => setSearchQuery(query)

	const onSearchClick = async () => {
		try {
			const resp = await authAxios.get(`/business-search?profession=${searchQuery}`)
			const { data } = resp
			const { results = [] } = data
			setDataDataToDisplay(results)
		} catch (error) {
			console.error(error)
			setDataDataToDisplay([])
		}
	}
	return (
		<View>
			<View style={styles.root}>
				<Searchbar placeholder="Search profession" onChangeText={onChangeSearch} value={searchQuery} />
				<CustomButton onPress={onSearchClick} text="Search"></CustomButton>
			</View>
			<View>
				{dataToDisplay.map((entry) => {
					const { id, profession, country, city, phone_number } = entry
					return (
						<View key={id}>
							<Text>{profession}</Text>
							<Text>{country}</Text>
							<Text>{city}</Text>
							<Text>{phone_number}</Text>
						</View>
					)
				})}
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	root: {
		alignItems: 'center',
		padding: 10,
		maxWidth: 350,
	},
})

export default SearchScreen
